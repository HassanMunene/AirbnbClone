import Link from "next/link";
import React from "react";
import { FiGlobe } from "react-icons/fi";
import { PiCaretUpBold } from "react-icons/pi"

const Footer = () => {
    const links = ["privacy", "terms", "sitemap", "company details", "destinations"];
    return (
        <div className="w-full px-20 border-t border-t-gray-200 py-4 flex items-center justify-between text-sm z-50 bg-white">
            <ul className="flex gap-3 font-normal">
                <li>
                    &copy; {new Date().getFullYear()} Airbnb, Inc
                </li>
                {links.map((item) => (
                    <li key={item}>
                        <Link href="#" className="capitalize">{item}</Link>
                    </li>
                ))}
            </ul>
            <ul className="flex gap-4 font-medium">
                <li className="flex items-center gap-2 cursor-pointer">
                    <FiGlobe /> English(KE)
                </li>
                <li className="cursor-pointer">KES</li>
                <li className="flex items-center gap-2 cursor-pointer">Support & resources <PiCaretUpBold /></li>
            </ul>
        </div>
    )
}

export default Footer;