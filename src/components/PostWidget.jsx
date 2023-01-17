import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";

// interface Post {
// 	title: string;
// 	featuredImage: { url: string };
// 	createdAt: Date;
// 	slug: string;
// }

const PostWidget = ({ categories, slug }) => {
	const [relatedPosts, setRelatedPosts] = useState([]);

	useEffect(() => {
		if (slug) {
			getSimilarPosts(categories, slug).then((result) =>
				setRelatedPosts(result)
			);
		} else {
			getRecentPosts().then((result) => setRelatedPosts(result));
		}
	}, [slug]);

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				{slug ? "関連記事" : "最新の記事"}
				{/* English */}
				{/* {slug ? "RelatedPosts" : "RecentPosts"} */}
			</h3>
			{/* {relatedPosts.map((post: Post, index: number) => ( */}
			{relatedPosts.map((post, index) => (
				<div key={index} className="flex items-center w-full mb-4">
					<div className="w-16 flex-none">
						<img
							alt={post.title}
							height="60px"
							width="60px"
							className="align-middle rounded-full"
							src={post.featuredImage.url}
						/>
					</div>
					<div className="flex-grow ml-4">
						<p className="text-gray-500 font-xs">
							{moment(post.createdAt).format("YYYY/MM/DD")}
						</p>
						<Link
							href={`/post/${post.slug}`}
							className="text-md link"
							key={index}
						>
							{post.title}
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default PostWidget;
