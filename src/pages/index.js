import Head from "next/head";
import { FeaturedPosts } from "../sections/index";
import {
	Categories,
	PostCard,
	PostWidget,
	Header,
	ProductFeed,
	TopPostCard,
} from "../components";
import { getPosts, getProducts } from "../services";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Home = ({ posts, products }) => {
	const [randomNum, setRandomNum] = useState();

	useEffect(() => {
		setRandomNum(Math.floor(Math.random() * (products.length - 1)));
	}, []);

	return (
		<div className="mb-8 ">
			<Head>
				<title>thrift onlineshop</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<div className="mb-8 ">
				{posts.slice(randomNum, randomNum + 1).map((post, index) => (
					<TopPostCard key={index} post={post.node} />
				))}
			</div>
			{/* <div>
				<FeaturedPosts />
			</div> */}
			<div className="grid grid-cols-2 lg:grid-cols-12 gap-8">
				<div className="lg:col-span-8 col-span-2">
					{posts.map((post, index) => (
						<PostCard post={post.node} key={index} />
					))}
					{/* ProductFeed */}
					<ProductFeed products={products} />
				</div>

				<div className="lg:col-span-4 col-span-2">
					<div className="lg:sticky relative top-8">
						<PostWidget />
						<Categories />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

// Fetch data at build time
export async function getStaticProps(context) {
	const posts = (await getPosts()) || [];
	const session = await getSession(context);
	const products = (await getProducts()) || [];

	return {
		props: {
			posts,
			session,
			products,
		},
	};
}
