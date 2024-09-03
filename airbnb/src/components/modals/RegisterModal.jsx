'use client'
{/* 
	The modal we will use to register new users to our Application
	we will use react-hook-form to handle the registration form to
	see the documentation on react-hook-form use this link
	https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/
*/}

import { useCallback, useState } from "react";
import BaseModal from "./BaseModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import InputElement from "../common/InputElement";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {register, handleSubmit, formState: {errors,}} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		}
	})

	const onSubmit = (data) => {
		setIsLoading(true);
		axios.post('/api/register', data)
		.then(() => {
			registerModal.onClose();
		})
		.catch((error) => {
			console.log(error);
			toast.error("Something went wrong!")
		})
		.finally(() => {
			setIsLoading(false);
		})
	}

	const toggelModal = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [loginModal, registerModal])

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
				register={register}
				errors={errors}
				required={true}
			/>
			<InputElement 
				id="name"
				label="Name"
				disabled={isLoading}
				register={register}
				errors={errors}
				required={true}
			/>
			<InputElement 
				id="password"
				label="Password"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required={true}
			/>
		</div>
	)
	const socialSigninContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button 
				outline={true}
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button 
				outline={true}
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className="text-neutral-600 text-center mt-4 font-medium text-sm">
				<div className="flex flex-row items-center justify-center gap-2">
					<div>Already have an account?</div>
					<div 
						onClick={toggelModal}
						className="text-neutral-800 cursor-pointer hover:underline">
						Login
					</div>
				</div>
			</div>
		</div>
	)
	return (
		<BaseModal 
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			modalTitle="Register"
			modalBody={bodyContent}
			primaryLabel="Continue"
			socialSigninSection={socialSigninContent}
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
		/>
	)
}

export default RegisterModal;