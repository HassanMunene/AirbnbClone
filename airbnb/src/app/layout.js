import React from "react";
import './globals.css';
import {Inter} from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
