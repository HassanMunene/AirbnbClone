'use client'

import Container from "@/components/common/Container";
import { categories } from "@/components/navbar/Categories";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListingHead from "@/components/listings/ListingHead";
import ListingInformation from "@/components/listings/ListingInformation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/components/listings/ListingReservation";

// ListingPageComponent is a client-side component that displays the detailed view of a listing.
// It receives `listing` and `currentUser` as props and uses them to render the listing's details.

const ListingPageComponent = ({ listing, currentUser, reservations = [] }) => {
    // Memoize the category based on the listing's category to avoid unnecessary recalculations.
    // `useMemo` is used to optimize performance by recomputing the category only when `listing.category` changes.
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

    const initialDateRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange)

    const reservedDates = useMemo(() => {
        // Initialize an empty array to store all the reserved dates
        let dates = [];
    
        // Iterate over each reservation in the reservations array
        reservations.forEach((reservation) => {
            // Generate an array of all dates between the startDate and endDate (inclusive)
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),  // Convert startDate string to Date object
                end: new Date(reservation.endDate)      // Convert endDate string to Date object
            });
    
            // Combine the newly generated dates with the existing dates array
            dates = [...dates, ...range];
        });
    
        // Return the full array of reserved dates, memoized for performance optimization
        return dates;
        
    // Only recalculate reservedDates when the reservations array changes
    }, [reservations]);

    const onCreatingReservation = useCallback(() => {
        // If the user is not logged in, open the login modal
        if (!currentUser) {
            return loginModal.onOpen();
        }
    
        // Set the loading state to true while the reservation request is processed
        setIsLoading(true);
    
        // Send a POST request to the '/api/reservations' endpoint to create a new reservation
        axios.post('/api/reservations', {
            totalPrice: totalPrice,             // Send the total price of the reservation
            startDate: dateRange.startDate,     // Send the selected start date
            endDate: dateRange.endDate,         // Send the selected end date
            listingId: listing?.id,             // Send the ID of the selected listing (optional chaining in case listing is undefined)
        })
        .then(() => {
            // On success, show a toast message indicating the reservation was successful
            toast.success('Listing reserved');
    
            // Reset the date range to its initial value after reservation
            setDateRange(initialDateRange);
    
            // Refresh the page to show the updated reservation status
            router.refresh();
        })
        .catch((error) => {
            // Log any error encountered during the reservation process
            console.log(error);
    
            // Show a toast message indicating that something went wrong
            toast.error('Something went wrong');
        })
        .finally(() => {
            // Once the request is complete (success or failure), stop the loading state
            setIsLoading(false);
        })
    
    // Use the variables in the dependency array to ensure that the callback is only re-created
    // if any of them change (totalPrice, dateRange, listing?.id, router, currentUser, loginModal)
    }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

    
    useEffect(() => {
        // Check if both startDate and endDate are selected in the dateRange
        if (dateRange.startDate && dateRange.endDate) {
    
            // Calculate the number of days between the startDate and endDate
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
    
            // If the number of days and listing price are valid, calculate total price
            if (dayCount && listing.price) {
                // Set the total price based on the number of days multiplied by the listing price per day
                setTotalPrice(dayCount * listing.price);
            } else {
                // If no valid day count is found, use the listing's base price
                setTotalPrice(listing.price);
            }
        }
        
    // Re-run this effect whenever dateRange or listing.price changes
    }, [dateRange, listing.price]);

    

    return (
        // Container component to wrap the content and provide consistent styling
        <Container>
            <div className="max-screen-lg mx-auto">
                {/* Main container for the listing page content */}
                <div className="flex flex-col gap-6">
                    {/* ListingHead component displays the title, image, location, and other basic details of the listing */}
                    <ListingHead 
                        title={listing.title} 
                        imageSrc={listing.imageSrc} 
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    {/* Grid layout for the listing information */}
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        {/* ListingInformation component displays detailed information about the listing */}
                        <ListingInformation
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue} 
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price} 
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreatingReservation}
                                disabled={isLoading}
                                disabledDates={reservedDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingPageComponent;