'use client'; // This component is client-side rendered

// This component shows each listing as a card with details like location, price, etc.

import useCountries from "@/app/hooks/useCountries"; // Custom hook to get country details
import Image from "next/image"; // Image component from Next.js for optimized images
import { useRouter } from "next/navigation"; // Router for navigating between pages
import HeartButton from "./HeartButton"; // HeartButton component to favorite/unfavorite listings
import Button from "../common/Button"; // Button component for actions like reservation cancel
import { useMemo } from "react"; // React hook to optimize expensive calculations
import { format } from 'date-fns'; // Importing format from date-fns to format dates

const ListingCard = ({ data, reservation, onAction, disabled, actionLabel, actionId = '', currentUser }) => {
    const router = useRouter(); // Router instance to handle navigation
    const { getCountryByValue } = useCountries(); // Get the function to fetch country data by value
    const locationData = getCountryByValue(data.locationValue); // Fetch location data for the listing

    // Function to handle cancel action; calls the `onAction` callback if it's provided
    const handleCancel = (e) => {
        e.stopPropagation(); // Prevent event bubbling when clicking the button
        if (disabled) return; // Prevent action if the button is disabled
        onAction?.(actionId); // Call the onAction callback with actionId (e.g., reservation cancel)
    };

    // Memoize the reservation dates to avoid unnecessary recalculations
    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null; // If no reservation exists, return null
        }

        const start = new Date(reservation.startDate); // Parse start date
        const end = new Date(reservation.endDate); // Parse end date

        // Return a formatted date range string
        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]); // Recompute only when reservation changes

    return (
        <div
            // Navigate to the listing's detail page on card click
            onClick={() => router.push(`/listings/${data.id}`)}
            className="col-span-1 cursor-pointer group" // Styling for responsiveness and hover effects
        >
            <div className="flex flex-col gap-2 w-full">
                {/* Image section */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image 
                        fill 
                        alt="listing" 
                        src={data.imageSrc} 
                        className="object-cover h-full w-full group-hover:scale-110 transition" // Hover effect on image
                    />
                    {/* Favorite button (heart) */}
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser} /> 
                    </div>
                </div>

                {/* Listing location */}
                <div className="font-semibold text-lg">
                    {locationData?.region}, {locationData?.label} {/* Show country region and label */}
                </div>

                {/* Reservation date or listing category */}
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category} {/* Show reservation date if available, else category */}
                </div>

                {/* Price section */}
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">KSH {data.price}</div>
                    {!reservation && (
                        <div className="font-light">night</div>
                    )}
                </div>

                {/* Action button (e.g., cancel reservation) */}
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled} // Disable the button if disabled prop is true
                        small
                        label={actionLabel} // Display action label (e.g., "Cancel")
                        onClick={handleCancel} // Handle the action when the button is clicked
                    />
                )}
            </div>
        </div>
    );
};

export default ListingCard; // Export the component for use in other parts of the app