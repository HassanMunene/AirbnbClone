'use client';

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "./HeartButton";

const ListingHead = ({title, locationValue, imageSrc, id, currentUser}) => {
    const { getCountryByValue } = useCountries();
    const location = getCountryByValue(locationValue);

    return (
        <>
            <div className="text-start">
                <div className="font-bold text-2xl">{title}</div>
                <div className="font-medium text-neutral-500 mt-2">{`${location?.region}, ${location?.label}`}</div>
            </div>
            <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
                <Image 
                    alt="listing"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    )
}

export default ListingHead;