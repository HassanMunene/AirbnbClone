'use client';
import AirBnbLogo from "@/svg/airbnb-logo";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();
    return (
        <div onClick={() => router.push('/')} className="hidden md:block cursor-pointer">
            <AirBnbLogo />
        </div>
    )
}

export default Logo;