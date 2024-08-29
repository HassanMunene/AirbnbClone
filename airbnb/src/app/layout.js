import React from "react";
import './globals.css';
import {Inter} from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";

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
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
