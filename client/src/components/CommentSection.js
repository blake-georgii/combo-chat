import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';


import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";

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
  