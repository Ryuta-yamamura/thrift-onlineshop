import React from "react";
import { useRouter } from "next/router";
import { getPosts, getPostDetails } from "../../services";
import {
	PostDetail,
	Categories,
	PostWidget,
	Author,
	Comments,
	CommentsForm,
	Header,
	Loader,
	Product,
} from "../../components";

const PostDetails = ({ post }) => {
	const router = useRouter();
	console.log(post);

	if (router.isFallback) {
		return <Loader />;
	}
	return (
		<>
			<div className=" mb-8">
				<Header />

				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					<div className="col-span-1 lg:col-span-8">
						<PostDetail post={post} />
						<div className="grid grid-cols-2 gap-0 ">
							{post.products.map((product, i) => (
								<Product
									key={i}
									id={product.id}
									title={product.title}
									price={product.price}
									description={product.description}
									category={product.itemCategory.name}
									image={product.featuredImage[0].url}
								/>
							))}
						</div>
						<Author author={post.author} />
						<CommentsForm slug={post.slug} />
						<Comments slug={post.slug} />
					</div>
					<div className="col-span-1 lg:col-span-4">
						<PostWidget
							slug={post.slug}
							categories={post.categories.map((category) => category.slug)}
						/>
						<Categories />
					</div>
				</div>
			</div>
		</>
	);
};

export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
	const data = (await getPostDetails(params.slug)) || [];
	return {
		props: { post: data },
	};
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
	const posts = await getPosts();
	return {
		paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
		fallback: true,
	};
}
