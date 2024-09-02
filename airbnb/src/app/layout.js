// Toaster is a component provided by react-host-toast to provides popup notifications
// By adding it here im availing the Toaster to my entire application.

import React from "react";
import './globals.css';
import {Inter} from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import LoginModal from "@/components/modals/LoginModal";

const inter = Inter(
  {subsets:["latin"]}
)

export const metadata = {
  title: "Airbnb clone",
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
