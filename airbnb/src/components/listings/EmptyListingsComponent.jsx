'use client'

import { useRouter } from "next/navigation";
import Button from "../common/Button";

const EmptyListingsComponent = ({showReset, title="No exact match", subtitle= "Try changing or removing some of your filters"}) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <div className="text-center">
				<div className="font-bold text-2xl">{title}</div>
				<div className="font-light text-neutral-500 mt-2">{subtitle}</div>
			</div>
            <div className="w-48 mt-4">
                {showReset && (
                    <Button onClick={() => router.push("/")} outline={true} label="Remove all filters" />
                )}
            </div>
        </div>
    )
}

export default EmptyListingsComponent;