import React from "react";
import './globals.css';

const RootLayout = ({children}) => {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout;
