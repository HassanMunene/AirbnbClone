'use client'

import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import ListingCategory from "./ListingCategory";
import { useMemo } from "react";
import dynamic from "next/dynamic";

// ListingInformation displays detailed information about a listing,
// including the host's details, description, amenities, and a map.

const ListingInformation = ({ user, description, guestCount, roomCount, bathroomCount, category, locationValue }) => {
    // Custom hook to get country details based on the location value
    const { getCountryByValue } = useCountries();

    // Get the coordinates of the country for displaying on the map
    const countryCoordinates = getCountryByValue(locationValue)?.latlng;

    // Dynamically import the Map component with server-side rendering disabled
    // `useMemo` is used to avoid re-importing the Map component unnecessarily
    const Map = useMemo(() => dynamic(() => import('../map/Map'), { ssr: false }), [locationValue]);

    return (
        <div className="col-span-4 flex flex-col gap-8">
            {/* Section for host details */}
            <div className="flex flex-col gap-2">
                {/* Host name and profile image */}
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Image 
                        src={user?.image} 
                        alt="profile"
                        height="30"
                        width="30"
                        className="rounded-full"
                    />
                </div>
                {/* Display guest count, room count, and bathroom count */}
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>{guestCount} guests</div>
                    <div>{roomCount} rooms</div>
                    <div>{bathroomCount} bathrooms</div>
                </div>
                {/* Display listing category if available */}
                {category && (
                    <ListingCategory
                        icon={category.icon}
                        label={category.label}
                        description={category.description} 
                    />
                )}
                <hr />
                {/* Display listing description */}
                <div className="text-lg font-light text-neutral-500">{description}</div>
                <hr />
                {/* Render the map centered on the country coordinates */}
                <Map center={countryCoordinates} />
            </div>
            <hr />
        </div>
    )
}

export default ListingInformation;