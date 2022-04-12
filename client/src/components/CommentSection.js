import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';


import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";

import { useState, useEffect } from "react";
import Comment from "./SingleComment"
import { writeClient } from "../../lib/sanityClient";

const query = `*[_type == "comment" && approved==true]{_id, comment, name, _createdAt, childComments} | order (_createdAt)`;

// Create a new globally scoped variable
let querySub = undefined;

export default function AllComments() {
	const [comments, setComments] = useState();

	useEffect(async () => {
		setComments(await writeClient.fetch(query));

		// Subscribe to the query, listening to new updates
		// If there's an update, add it to the comments state and sort it again
		// The update might occur on a comment we already have in the state,
		// so we should filter out that comment from the previous state
		querySub = writeClient.listen(query).subscribe(update => {
			if (update) {
				setComments(comments =>
					[
						...comments.filter(
							comment => comment._id !== update.result._id
						),
						update.result,
					].sort((a, b) => (a._createdAt > b._createdAt ? 1 : -1))
				);
			}
		});

		// Unsubscribe on Component unmount
		return () => {
			querySub.unsubscribe();
		};
	}
}

export default function AddCommentForm(){
	const [isSending, setIsSending] = useState(false);
	const { register, errors, handleSubmit, reset } = useForm();

	const onSubmit = data => {
		setIsSending(true);

		fetch("/api/addComment", {
			method: "POST", 
			body: JSON.stringify(data)
			}
		).then(r => {
			if (r.status === 200) {
				setIsSending(false);
			} else // handle errors;
		})
	}

	return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Name (Optional)"
					name="name"
					ref={register({ required: false, maxLength: 80 })}
				/>
				<input
					type="text"
					placeholder="Email (Optional)"
					name="email"
					ref={register({ required: false, pattern: /^\S+@\S+$/i })}
				/>
				{errors.email && <span>Invalid email</span>}
				<textarea
					name="comment"
					placeholder="Your Comment"
					rows="5"
					ref={register({ required: true, maxLength: 5000 })}
				/>
				{errors.comment && (
					<span>You need to write something</span>
				)}
				<input
					type="submit"
					disabled={isSending}
					value={isSending ? "Sending Comment..." : "Send Comment"}
				/>
			</form>
	);
}
  