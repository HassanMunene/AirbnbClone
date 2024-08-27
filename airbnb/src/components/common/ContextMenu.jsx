"use client";

import React, { useEffect, useRef } from "react";
import { useAirbnbStore } from "@/store/store";

const ContextMenu = ({options, coordinates, contextMenu, setContextMenu}) => {
    const contextMenuRef = useRef(null);

    const openAuthModal = useAirbnbStore((state) => state.openAuthModal);

    const handleClick = (event, callback) => {
        openAuthModal();
        event.stopPropagation();
        callback()
    }

    useEffect(() => {
        const handleClickOutsideContextMenu = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setContextMenu(false);
            }
        }
        document.addEventListener("click", handleClickOutsideContextMenu);
        return () => {
            document.removeEventListener("click", handleClickOutsideContextMenu);
        }
    }, [])
    return (
        <div
            ref={contextMenuRef}
            style={{
                boxShadow: "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(11,20,26;),.16",
                top: coordinates.y,
                left: coordinates.x,
            }}
            className="fixed bg-white shadow-2xl py-5 z-[100] rounded-lg border border-gray-200"
        >
            <ul>
                {options.map(({name, callback}) => (
                    <li
                    onClick={(event) => handleClick(event, callback)}
                    className="hover:bg-gray-100 pl-5 pr-10 py-2 cursor-pointer" key={name}
                    >
                        <span>{name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ContextMenu;