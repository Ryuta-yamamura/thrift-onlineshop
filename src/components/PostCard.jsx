import React from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

// import { grpahCMSImageLoader } from "../util";

const PostCard = ({ post }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
			<div className="relative overflow-hidden shadow-md pb-80 mb-6">
				<img
					src={post.featuredImage.url}
					alt=""
					className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
				/>
			</div>

			<h1 className="transition duration-700 text-center mb-8 cursor-pointer hover:text-pink-600 text-3xl font-semibold">
				<Link href={`/post/${post.slug}`}>{post.title}</Link>
			</h1>
			<div className="block lg:flex text-center items-center justify-center mb-8 w-full">
				<div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
					<Image
						unoptimized
						// loader={grpahCMSImageLoader}
						alt={post.author.name}
						height="30"
						width="30"
						className="align-middle rounded-full"
						src={post.author.photo.url}
					/>
					<p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
						{post.author.name}
					</p>
				</div>
				<div className="font-medium text-gray-700">
					<CalendarDaysIcon className="h-6 w-6 inline mr-2 text-pink-500" />

					<span className="align-middle">
						{moment(post.createdAt).format("YYYY/MM/DD")}
					</span>
				</div>
			</div>
			<p className="text-center text-lg text-gray-500 font-normal px-4 lg:px-20 mb-8">
				{post.excerpt}
			</p>
			<div className="text-center">
				<Link href={`/post/${post.slug}`}>
					<span className="transition duration-500 transform hover:-translate-y-1 inline-block rounded-full text-lg font-medium px-8 py-3 button ">
						記事を読む
					</span>
				</Link>
			</div>
		</div>
	);
};

export default PostCard;
