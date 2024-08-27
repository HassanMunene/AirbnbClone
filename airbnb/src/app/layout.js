import React from "react";
import './globals.css';
import {Inter} from "next/font/google";

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
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
