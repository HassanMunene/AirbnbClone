'use client'
//This will show every listing as a single card

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeartButton from "./HeartButton";
import Button from "../common/Button";

const ListingCard = ({data, reservation, onAction, disabled, actionLabel, actionId='', currentUser}) => {
    const router = useRouter();
    const { getCountryByValue } = useCountries();
    const locationData = getCountryByValue(data.locationValue);

    const handleCancel = () => {};
    const reservationDate = () => {};

    return (
        <div
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image 
                        fill 
                        alt="listing" 
                        src={data.imageSrc} 
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser}/>
                    </div>
                </div>
                <div className="font-semibold text-lg">{locationData?.region}, {locationData?.label}</div>
                <div className="font-light text-neutral-500">{reservationDate || data.category}</div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">KSH {data.price}</div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button disabled={disabled} small label={actionLabel} onClick={handleCancel}/>
                )}
            </div>
        </div>
    )
}

export default ListingCard;