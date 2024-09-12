// Toaster is a component provided by react-host-toast to provides popup notifications
// By adding it here im availing the Toaster to my entire application.

import React from "react";
import './globals.css';
import {Inter, Nunito} from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import CreateListingModal from "@/components/modals/CreateListingModal";
import SearchModal from "@/components/modals/searchModal";

const nunito = Nunito(
  {subsets:["latin"]}
)

export const metadata = {
  title: "Airbnb clone",
}

const RootLayout = async ({children}) => {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <CreateListingModal />
        <Navbar currentUser={currentUser}/>
        <SearchModal />
        <div className="pt-28 pb-20">
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout;
