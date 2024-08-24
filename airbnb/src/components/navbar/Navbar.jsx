"use client";

import AirBnbLogo from "@/svg/airbnb-logo"
import {FiGlobe} from "react-icons/fi";
import {RxHamburgerMenu} from "react-icons/rx";
import Image from "next/image";
import { useState } from "react";
import ContextMenu from "@/components/common/ContextMenu";

const Navbar = () => {
    const [iscontextMenuVisible, setIscontextMenuVisible] = useState(false);
    const contextMenuOptions = [
        {name: "Login", callback: () => setIscontextMenuVisible(false)},
        {name: "Sign up", callback: () => setIscontextMenuVisible(false)},
        {name: "Airbnb your home", callback: () => setIscontextMenuVisible(false)},
        {name: "Help Center", callback: () => setIscontextMenuVisible(false)},
    ]

    const handleContextMenuState = () => {
        setIscontextMenuVisible((prev) => !prev);
    }
    return (
        <header className="w-full flex flex-col justify-center transition-all duration-300 h-20 border-b border-b-gray-200">
            <div className="flex items-center justify-between px-20">
                <div className="flex-grow basis-0">
                    <div className="w-max cursor-pointer">
                        <AirBnbLogo />
                    </div>
                </div>
                <div className="flex-grow basis-0">
                    <ul className="flex items-center justify-end gap-6 font-medium">
                        <li className="cursor-pointer">
                            <span>Airbnb your home</span>
                        </li>
                        <li className="cursor-pointer">
                            <FiGlobe />
                        </li>
                        <li 
                            onClick={handleContextMenuState}
                            className="flex cursor-pointer items-center gap-2 border border-gray-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500"
                        >
                            <RxHamburgerMenu />
                            <span>
                                <Image 
                                    src="/empty-profile.png"
                                    alt="empty profile"
                                    height="30"
                                    width="30"
                                />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            {iscontextMenuVisible && (
               <ContextMenu
                    options={contextMenuOptions}
                    coordinates={{x:window.innerWidth - 250, y:70}}
                    contextMenu={iscontextMenuVisible}
                    setContextMenu={setIscontextMenuVisible}
                />
            )}
        </header>
    )
}

export default Navbar