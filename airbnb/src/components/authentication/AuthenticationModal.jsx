'use client';
import React, { useState } from "react";
import {IoMdClose} from "react-icons/io";
import FormInput from "../common/FormInput";
import { useAirbnbStore } from "@/store/store";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const AuthenticationModal = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userFoundInDB, setUserFoundInDB] = useState(null);

	const closeAuthModel = useAirbnbStore((state) => state.closeAuthModal);

	const verifyEmail = () => {}
	const handleLogin = () => {}
	const handleSignup = () => {}

	return (
		<div className="relative z-50">
			<div className="fixed inset-0 bg-gray-500 opacity-75 transition-opacity">
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
							<div className="bg-white pb-4 pt-5">
								<div className="relative border-b border-b-gray-200 flex items-center justify-center pb-5">
									<span
										onClick={() => closeAuthModel()} 
										className="absolute left-5 cursor-pointer text-lg">
										<IoMdClose />
									</span>
									<span>Login or Sign up</span>
								</div>
								<div className="p-5">
									<h3 className="text-xl pb-5">Welcome to Airbnb</h3>
									{userFoundInDB == null && (
										<FormInput name="email" placeholder="Email" value={email} setValue={setEmail} />
									)}
									{userFoundInDB == true && (
										<FormInput name="password" type="password" placeholder="Password" value={password} setValue={setPassword}/>
									)}
									{userFoundInDB == false && (
										<div className="flex flex-col gap-3">
											<FormInput name="firstName" placeholder="First Name" value={firstName} setValue={setFirstName}/>
											<FormInput name="lastName" placeholder="Last Name" value={lastName} setValue={setLastName}/>
											<FormInput name="password" type="password" placeholder="Password" value={password} setValue={setPassword}/>
										</div>
									)}
									<button
										onClick={userFoundInDB == null ? verifyEmail : userFoundInDB ? handleLogin : handleSignup}
										className="bg-airbnb-theme-color py-3 mt-5 w-full text-white text-lg font-medium rounded-md"
									>
										Continue
									</button>
								</div>
								<div className="w-full p-5 font-medium text-xs">
									<div 
										className="flex items-center whitespace-nowrap before:content-[''] before:block before:w-full before:h-[1px] before:bg-gray-300 before:mr-4
											after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-300 after:ml-4"
									>
										or
									</div>
								</div>
								<div className="flex flex-wrap justify-between p-5">
									<div className="w-full mb-4">
										<button className="relative border border-[#222222] cursor-pointer text-center leading-[1.25rem] font-medium rounded-lg bg-white py-3.5 px-6 w-full">
											<div className="flex items-center font-medium text-[0.85rem]">
												<div className="flex-grow-0 flex-shrink basis-0">
													<FaGithub className="block h-5 w-5"/>
												</div>
												<div className="flex-grow flex-shrink basis-0">Continue with Github</div>
												<div className="flex-grow-0 flex-shrink basis-0"></div>
											</div>
										</button>
									</div>
									<div className="w-full mb-4">
										<button className="relative border border-[#222222] cursor-pointer text-center leading-[1.25rem] font-medium rounded-lg bg-white py-3.5 px-6 w-full">
											<div className="flex items-center font-medium text-[0.85rem]">
												<div className="flex-grow-0 flex-shrink basis-0">
													<FcGoogle className="block h-5 w-5"/>
												</div>
												<div className="flex-grow flex-shrink basis-0">Continue with Google</div>
												<div className="flex-grow-0 flex-shrink basis-0"></div>
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthenticationModal;
