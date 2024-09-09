'use client'

import Container from "@/components/common/Container";
import { categories } from "@/components/navbar/Categories";
import { useMemo } from "react";
import ListingHead from "@/components/listings/ListingHead";
import ListingInformation from "@/components/listings/ListingInformation";

// ListingPageComponent is a client-side component that displays the detailed view of a listing.
// It receives `listing` and `currentUser` as props and uses them to render the listing's details.

const ListingPageComponent = ({ listing, currentUser }) => {
    // Memoize the category based on the listing's category to avoid unnecessary recalculations.
    // `useMemo` is used to optimize performance by recomputing the category only when `listing.category` changes.
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);

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
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingPageComponent;
