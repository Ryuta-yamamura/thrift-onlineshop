import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getItemCategories } from "../services";

const ItemCategories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getItemCategories().then((newCategories) => {
			setCategories(newCategories);
		});
	}, []);

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				商品カテゴリー
			</h3>
			{categories.map((category, index) => (
				<Link key={index} href={`/item-category/${category.slug}`}>
					<span
						className={`cursor-pointer block ${
							index === categories.length - 1 ? "border-b-0" : "border-b"
						} pb-3 mb-3 link`}
					>
						{category.name}
					</span>
				</Link>
			))}
		</div>
	);
};

export default ItemCategories;
