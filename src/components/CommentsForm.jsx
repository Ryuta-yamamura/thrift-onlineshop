import React, { useEffect, useRef, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
	const [error, setError] = useState(false);
	const [localStorage, setLocalStorage] = useState(null);
	const [showSuccessMessage, setshowSuccessMessage] = useState(false);
	const commentEl = useRef();
	const nameEl = useRef();
	const emailEl = useRef();
	const storeDataEl = useRef();

	useEffect(() => {
		nameEl.current.value = window.localStorage.getItem("name");
		emailEl.current.value = window.localStorage.getItem("email");
	}, []);

	const handleCommentSubmission = () => {
		setError(false);

		const { value: comment } = commentEl.current;
		const { value: name } = nameEl.current;
		const { value: email } = emailEl.current;
		const { value: storeData } = storeDataEl.current;

		if (!comment || !name || !email) {
			setError(true);
			return;
		}

		const commentObj = { name, email, comment, slug };
		if (storeData) {
			window.localStorage.setItem("name", name);
			window.localStorage.setItem("email", email);
		} else {
			window.localStorage.removeItem("name", name);
			window.localStorage.removeItem("email", email);
		}

		submitComment(commentObj).then((res) => {
			setshowSuccessMessage(true);
			setTimeout(() => {
				setshowSuccessMessage(false);
			}, 3000);
		});
	};

	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pd-12 mb-8">
			<h3 className="flex flex-row items-center text-xl mb-8 font-semibold border-b pb-4">
				<PencilSquareIcon className="h-12 p-2 " />
				コメントを書く
				{/* ENGLISH */}
				{/* CommentsForm */}
			</h3>

			<div className="grid grid-cols-1 gap-4 mb-4">
				<textarea
					ref={commentEl}
					className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Comment"
					name="コメント"
					// english
					// name="comment"
					// cols="30"
					rows="10"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<input
					type="text"
					ref={nameEl}
					className="py-2 px-4 outkine-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="名前"
					// english
					// placeholder="Name"
					name="name"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<input
					type="text"
					ref={emailEl}
					className="py-2 px-4 outkine-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
					placeholder="Email"
					name="email"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<div>
					<input
						type="checkbox"
						ref={storeDataEl}
						id="storeData"
						name="storeData"
						value="true"
					/>
					<label htmlFor="storeData" className="text-gray-500 link ml-2">
						次回以降メールアドレスと名前を省略する場合はチェックをしてください。
						{/* ENGLISH */}
						{/* Save my e-mail and name for the next time i comment */}
					</label>
				</div>
			</div>
			{error && <p className="text-xs text-red-500">All fields are required</p>}
			<div className="mt-8">
				<button
					type="button"
					onClick={handleCommentSubmission}
					className="button  rounded-full text-lg font-medium px-8 py-3"
				>
					送信
					{/* ENGLISH */}
					{/* Post Comment */}
				</button>
				{showSuccessMessage && (
					<span className="text-xl float-right font-semibold mt-3 text-green-500">
						コメントが送信されました。　承認されるまでしばらくお待ちください。
						{/* ENGLISH */}
						{/* Comment Submitted forreview */}
					</span>
				)}
			</div>
		</div>
	);
};

export default CommentsForm;
