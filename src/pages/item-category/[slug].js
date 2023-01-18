import React from "react";
import { useRouter } from "next/router";

import { getCategories, getCategoryProduct } from "../../services";
import {
	Categories,
	ItemCategories,
	Loader,
	Header,
	ProductFeed,
} from "../../components";

const CategoryPost = ({ products }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <Loader />;
	}

	return (
		<div className="mb-8">
			<Header />

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="col-span-1 lg:col-span-8">
					{/* ProductFeed */}
					<ProductFeed products={products} />
				</div>
				<div className="col-span-1 lg:col-span-4">
					<div className="relative lg:sticky top-8">
						<ItemCategories />
						<Categories />
					</div>
				</div>
			</div>
		</div>
	);
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
	const products = await getCategoryProduct(params.slug);

	return {
		props: { products },
	};
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
	const categories = await getCategories();
	return {
		paths: categories.map(({ slug }) => ({ params: { slug } })),
		fallback: true,
	};
}
