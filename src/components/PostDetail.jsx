import React from "react";
import Image from "next/image";
import moment from "moment";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const PostDetail = ({ post }) => {
	const getContentFragment = (index, text, obj, type) => {
		let modifiedText = text;

		if (obj) {
			if (obj.bold) {
				modifiedText = <b key={index}>{text}</b>;
			}

			if (obj.italic) {
				modifiedText = <em key={index}>{text}</em>;
			}

			if (obj.underline) {
				modifiedText = <u key={index}>{text}</u>;
			}
		}

		switch (type) {
			case "heading-three":
				return (
					<h3
						key={index}
						className="text-lg md:text-xl font-semibold mb-4 px-2"
					>
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h3>
				);
			case "paragraph":
				return (
					<p key={index} className="text-xs md:text-base mb-5 px-2">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</p>
				);
			case "heading-four":
				return (
					<h4 key={index} className="text-md font-semibold mb-4 px-2">
						{modifiedText.map((item, i) => (
							<React.Fragment key={i}>{item}</React.Fragment>
						))}
					</h4>
				);
			case "image":
				return (
					<img
						key={index}
						alt={obj.title}
						height={obj.height}
						width={obj.width}
						src={obj.src}
					/>
				);
			default:
				return modifiedText;
		}
	};
	return (
		<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
			<div className="relative overflow-hidden shadow-md mb-6">
				<img
					src={post.featuredImage.url}
					alt={post.title}
					className="object-top h-hull w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
				/>
				{/* <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
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
				</div> */}
				<div className="font-medium text-gray-700">
					<CalendarDaysIcon className="h-6 w-6 inline mr-2 text-pink-500" />

					<span className="align-middle">
						{moment(post.createdAt).format("YYYY/MM/DD")}
					</span>
				</div>
			</div>
			<h1 className="mb-8 text-3xl font-semibold border-b">{post.title}</h1>
			{post.content.raw.children.map((typeObj, index) => {
				const children = typeObj.children.map((item, itemIndex) =>
					getContentFragment(itemIndex, item.text, item)
				);

				return getContentFragment(index, children, typeObj, typeObj.type);
			})}
		</div>
	);
};

export default PostDetail;
