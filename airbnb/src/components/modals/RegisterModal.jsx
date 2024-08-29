'use client'
{/* The modal we will use to register new users to our Application*/}

import { useState } from "react";
import BaseModal from "./BaseModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import InputElement from "../common/InputElement";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = () => {}

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<div className="text-start">
				<div className="font-bold text-2xl">Welcome to Airbnb Clone</div>
				<div className="font-light text-neutral-500 mt-2">Create an Account</div>
			</div>
			<InputElement 
				id="email"
				label="Email"
				disabled={isLoading}
				required={true}
			/>
			<InputElement 
				id="name"
				label="Name"
				disabled={isLoading}
				required={true}
			/>
			<InputElement 
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				required={true}
			/>
		</div>
	)
	return (
		<BaseModal 
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			modalTitle="Register"
			mainLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit}
			modalBody={bodyContent}
		/>
	)
}

export default RegisterModal;