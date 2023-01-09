import { buffer } from "micro";
import * as admin from "firebase-admin";

// 安全性のあるFIREBASEバックエンドの接続
const serviceAccount = {
	type: process.env.FIREBASE_ADMIN_TYPE,
	project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
	private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
	private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
	client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
	auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
	token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER,
	client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT,
};

const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
	  })
	: admin.app();

// STRIPEへの接続を確立
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
	// console.log('Fullfilling order', session)

	return app
		.firestore()
		.collection("users")
		.doc(session.metadata.email)
		.collection("orders")
		.doc(session.id)
		.set({
			// USドルの場合は割る100を追加すること
			// amount:session.amount_total / 100,
			amount: session.amount_total,
			amount_shipping: session.total_details.amount_shipping,
			images: JSON.parse(session.metadata.images),
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
		});
};

export default async (req, res) => {
	if (req.method === "POST") {
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers["stripe-signature"];

		let event;

		// Verify that the EVENT posted came from stripe
		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err) {
			return res.status(400).send(`Webhook error: ${err.message}`);
		}
		// Handle the checkout.session.completed event
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			// fullfill the order...
			return fulfillOrder(session)
				.then(() => res.status(200))
				.catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
		}
	}
};

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
