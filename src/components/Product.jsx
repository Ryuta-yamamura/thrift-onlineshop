import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({
	id,
	title,
	rating,
	price,
	description,
	category,
	image,
	hasPrime,
}) {
	const dispatch = useDispatch();
	rating =
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;
	const addItemToBasket = () => {
		const product = {
			id,
			title,
			rating,
			price,
			description,
			category,
			image,
			hasPrime,
		};
		// 商品情報をreduxStoreに送る
		dispatch(addToBasket(product));
	};

	return (
		<div className="relative flex flex-col  bg-white z-30 p-10">
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">
				{category}
			</p>
			<Image
				src={image}
				alt=""
				width={200}
				height={200}
				style={{
					objectFit: "contain",
					margin: "auto",
				}}
			/>
			<h4 className="my-3">{title}</h4>

			<div className="flex">
				{/* {Array(rating)
					.fill()
					.map((_, i) => (
						<StarIcon key={i} className="h-3 text-yellow-500" />
					))} */}
			</div>
			<div className="mb-5">
				<p>¥{price}</p>
			</div>

			<button onClick={addItemToBasket} className="mt-2 button">
				カートに追加
			</button>
		</div>
	);
}

export default Product;
