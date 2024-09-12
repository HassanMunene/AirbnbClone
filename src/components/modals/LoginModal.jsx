'use client'
{/* 
	The modal we will use to Login users to our Application
	we will use react-hook-form to handle the login form to
	see the documentation on react-hook-form use this link
	https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/
*/}

import { useCallback, useState } from "react";
import BaseModal from "./BaseModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal";
import InputElement from "../common/InputElement";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

const LoginModal = () => {
	const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

	const {register, handleSubmit, formState: {errors,}} = useForm({
		defaultValues: {
			email: '',
			password: '',
		}
	})

    // use async/await instead of .then chain
	const onSubmit = async (data) => {
		setIsLoading(true);
        // login the user using the SignIn option from NextAuth

        const callback = await signIn('credentials', {
            ...data,
            redirect: false,
        })
        setIsLoading(false);

        if (callback?.ok) {
            toast.success('Logged in successfully');
            router.refresh(); //refresh the page to reflect new logged in state
            loginModal.onClose();
        }
        if (callback?.error) {
            toast.error(callback.error) //display error using a toaster
        }
	}
	const toggelModal = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal])

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<div className="text-start">
				<div className="font-bold text-2xl">Welcome back!</div>
				<div className="font-light text-neutral-500 mt-2">Login to your account</div>
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
					<div>First time using Airbnb clone?</div>
					<div 
						onClick={toggelModal}
						className="text-neutral-800 cursor-pointer hover:underline">
						Create an account
					</div>
				</div>
			</div>
		</div>
	)
	return (
		<BaseModal 
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			modalTitle="Login"
			modalBody={bodyContent}
			primaryLabel="Continue"
			socialSigninSection={socialSigninContent}
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
		/>
	)
}

export default LoginModal;