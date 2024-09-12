'use client'; // Indicates that this component will be rendered on the client-side

{/*
	Modal component used for registering new users to the application.
	We're using react-hook-form to manage the form state and validation.
	For more details on react-hook-form, refer to:
	https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/
*/}

import { useCallback, useState } from "react";
import BaseModal from "./BaseModal"; // Base modal component that provides structure and layout for modals
import useRegisterModal from "@/app/hooks/useRegisterModal"; // Hook to control the state of the register modal (open/close)
import InputElement from "../common/InputElement"; // Custom input component
import { useForm } from "react-hook-form"; // react-hook-form library for handling form submission and validation
import axios from "axios"; // Used for sending HTTP requests
import toast from "react-hot-toast"; // Toast notifications for success and error messages
import Button from "../common/Button"; // Custom button component
import { FcGoogle } from "react-icons/fc"; // Google icon for social sign-in button
import { AiFillGithub } from "react-icons/ai"; // GitHub icon for social sign-in button
import { signIn } from "next-auth/react"; // next-auth's signIn method for handling OAuth sign-ins
import useLoginModal from "@/app/hooks/useLoginModal"; // Hook to control the state of the login modal

const RegisterModal = () => {
	const registerModal = useRegisterModal(); // State management for the register modal
	const loginModal = useLoginModal(); // State management for the login modal
	const [isLoading, setIsLoading] = useState(false); // Loading state for form submission

	// Set up react-hook-form with default values for name, email, and password fields
	const { register, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		}
	});

	// Handle form submission
	const onSubmit = (data) => {
		setIsLoading(true); // Set loading state to true while the form is being submitted
		axios.post('/api/register', data) // Send POST request to the backend to register the user
			.then(() => {
				toast.success('Success!'); // Display success toast
				registerModal.onClose(); // Close the register modal on successful registration
				loginModal.onOpen(); // Automatically open the login modal after successful registration
			})
			.catch((error) => {
				console.log(error); // Log any errors
				toast.error("Something went wrong!"); // Display error toast if registration fails
			})
			.finally(() => {
				setIsLoading(false); // Reset loading state after the request completes
			});
	};

	// Toggle between the Register and Login modals
	const toggelModal = useCallback(() => {
		registerModal.onClose(); // Close the register modal
		loginModal.onOpen(); // Open the login modal
	}, [loginModal, registerModal]);

	// Body content for the registration form
	const bodyContent = (
		<div className="flex flex-col gap-4">
			{/* Title and subtitle for the registration form */}
			<div className="text-start">
				<div className="font-bold text-2xl">Welcome to Airbnb Clone</div>
				<div className="font-light text-neutral-500 mt-2">Create an Account</div>
			</div>
			
			{/* Input fields for email, name, and password */}
			<InputElement 
				id="email"
				label="Email"
				disabled={isLoading} // Disable input when form is loading
				register={register} // Register the input with react-hook-form
				errors={errors} // Show validation errors
				required={true} // Mark the input as required
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
				type="password" // Input type set to password for secure input
				disabled={isLoading}
				register={register}
				errors={errors}
				required={true}
			/>
		</div>
	);

	// Social sign-in options
	const socialSigninContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr /> {/* Horizontal line separator */}
			{/* Button to sign in with Google */}
			<Button 
				outline={true}
				label="Continue with Google"
				icon={FcGoogle} // Google icon
				onClick={() => signIn('google')} // Trigger Google sign-in with next-auth
			/>
			{/* Button to sign in with GitHub */}
			<Button 
				outline={true}
				label="Continue with Github"
				icon={AiFillGithub} // GitHub icon
				onClick={() => signIn('github')} // Trigger GitHub sign-in with next-auth
			/>
			
			{/* Prompt to switch to login if user already has an account */}
			<div className="text-neutral-600 text-center mt-4 font-medium text-sm">
				<div className="flex flex-row items-center justify-center gap-2">
					<div>Already have an account?</div>
					<div 
						onClick={toggelModal} // Switch to login modal
						className="text-neutral-800 cursor-pointer hover:underline">
						Login
					</div>
				</div>
			</div>
		</div>
	);

	// Return the modal component
	return (
		<BaseModal 
			disabled={isLoading} // Disable the modal while form is loading
			isOpen={registerModal.isOpen} // Control modal visibility with registerModal state
			modalTitle="Register" // Title of the modal
			modalBody={bodyContent} // The form fields for user registration
			primaryLabel="Continue" // Label for the primary submit button
			socialSigninSection={socialSigninContent} // The social sign-in buttons
			onClose={registerModal.onClose} // Close the modal on request
			onSubmit={handleSubmit(onSubmit)} // Submit the form using react-hook-form's handleSubmit method
		/>
	);
};

export default RegisterModal; // Export the component for use in the application