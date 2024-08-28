"use client";

import Container from "../common/Container";
import { useState } from "react";
import ContextMenu from "@/components/common/ContextMenu";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Logo from "./Logo";

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
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <UserMenu />
                    </div>
                </Container>
            </div>
            {iscontextMenuVisible && (
               <ContextMenu
                    options={contextMenuOptions}
                    coordinates={{x:window.innerWidth - 250, y:70}}
                    contextMenu={iscontextMenuVisible}
                    setContextMenu={setIscontextMenuVisible}
                />
            )}
        </div>
    )
}

export default Navbar