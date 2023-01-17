import Head from "next/head";
import { FeaturedPosts } from "../sections/index";
import {
	Categories,
	PostCard,
	PostWidget,
	Header,
	ProductFeed,
} from "../components";
import { getPosts, getProducts } from "../services";
import { getSession } from "next-auth/react";

const Home = ({ posts, products }) => {
	return (
		<div className="mb-8 ">
			<Head>
				<title>thrift onlineshop</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<FeaturedPosts />
			<div className="grid grid-cols-2 lg:grid-cols-12 gap-8">
				<div className="lg:col-span-8 col-span-2">
					{posts.map((post, index) => (
						<PostCard post={post.node} key={index} />
					))}
					{/* ProductFeed */}
					<div>
						<ProductFeed products={products} />
					</div>
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
