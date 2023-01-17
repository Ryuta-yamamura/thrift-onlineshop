const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { items, email } = req.body;

	const transformedItems = items.map((item) => ({
		// 複数の場合は1を変更
		quantity: 1,
		price_data: {
			currency: "jpy",
			// USドルの場合はセントに変換するため*100が必要
			// unit_amount: item.price *100 ,
			unit_amount: item.price,
			product_data: {
				name: item.title,
				description: item.description,
				images: [item.image],
			},
		},
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		shipping_options: [
			{
				shipping_rate: `${process.env.SHIPPING_RATES}`,
			},
		],
		shipping_address_collection: {
			allowed_countries: ["JP"],
		},
		line_items: transformedItems,
		mode: "payment",
		success_url: `${process.env.HOST}/success`,
		cancel_url: `${process.env.HOST}/checkout`,
		metadata: {
			email,
			images: JSON.stringify(items.map((item) => item.image)),
		},
	});

	res.status(200).json({ id: session.id });
};
