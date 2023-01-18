import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const TopPostCard = ({ post }) => (
	<div className="relative h-screen">
		<div
			className="absolute bg-center  bg-no-repeat bg-cover shadow-md inline-block w-full h-screen"
			style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
		/>
		<div className="absolute bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-screen" />
		<div className="flex flex-col rounded-lg p-4 items-center justify-end absolute w-full h-full">
			<p className="text-white mr-0 mb-4 text-shadow  text-xs">
				{moment(post.createdAt).format("YYYY/MM/DD")}
			</p>
			<p className="text-white mb-4 text-shadow  text-xs text-center">
				{post.title}
			</p>
			<div className="flex absolute w-full">
				<Image
					unoptimized
					alt={post.author.name}
					height="30"
					width="30"
					className="align-middle drop-shadow-lg rounded-full"
					src={post.author.photo.url}
				/>
				<p className="inline align-middle text-white text-shadow ml-2 ">
					{post.author.name}
				</p>
			</div>
		</div>
		<Link href={`/post/${post.slug}`}>
			<span className="cursor-pointer absolute w-full h-full" />
		</Link>
	</div>
);

export default TopPostCard;
