import { useSession, getSession } from "next-auth/react";
import Header from "../components/Header";
import db from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import moment from "moment";
import Order from "../components/Order";

function orders({ orders }) {
	const { data: session, status } = useSession();

	return (
		<div>
			<Header />
			<main className="max-w-screen-lg mx-auto p-10">
				<h1 className="text-3xl border-b mb-2 pd-1 border-yellow-400">
					注文履歴
					{/* ENGLISH */}
					{/* Your Orders */}
				</h1>

				{session ? (
					<h2> {orders.length} orders</h2>
				) : (
					<h2>
						注文履歴を確認するには、サインインしてください。
						{/* ENGLISH */}
						{/* please sign in to see your orders */}
					</h2>
				)}

				<div className="mt-5 space-y-4">
					{orders?.map(
						({ id, amount, amountShipping, items, timestamp, images }) => (
							<Order
								key={id}
								id={id}
								amount={amount}
								amountShipping={amountShipping}
								items={items}
								timestamp={timestamp}
								images={images}
							/>
						)
					)}
				</div>
			</main>
		</div>
	);
}

export default orders;

export async function getServerSideProps(context) {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	// Get the users logged in credentials...
	const session = await getSession(context);

	if (!session) {
		return {
			props: {},
		};
	}

	// firebase db
	const q = query(
		collection(db, "users", session.user.email, "orders"),
		orderBy("timestamp", "desc")
	);

	const querySnapshot = await getDocs(q);
	let stripeOrders = [];
	querySnapshot.forEach((doc) => {
		stripeOrders.push({
			id: doc.id,
			data: doc.data(),
		});
	});

	// Stripe orders
	const orders = await Promise.all(
		stripeOrders.map(async (order) => ({
			id: order.id,
			amount: order.data.amount,
			amountShipping: order.data.amount_shipping,
			images: order.data.images,
			timestamp: moment(order.data.timestamp.toDate()).unix(),
			items: (
				await stripe.checkout.sessions.listLineItems(order.id, {
					limit: 100,
				})
			).data,
		}))
	);
	return {
		props: {
			orders,
		},
	};
}
