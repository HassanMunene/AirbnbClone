'use client'

import { useRouter } from "next/navigation";
import Button from "../common/Button";
import HeaderComponent from "./HeaderComponent";

const EmptyComponent = ({showReset, title="No exact match", subtitle= "Try changing or removing some of your filters"}) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <HeaderComponent 
                title={title}
                subtitle={subtitle}
                center={true}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button onClick={() => router.push("/")} outline={true} label="Remove all filters" />
                )}
            </div>
        </div>
    )
}

export default EmptyComponent;