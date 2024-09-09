import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyListingsComponent from "@/components/listings/EmptyListingsComponent";
import ListingPageComponent from "./ListingPageComponent";

// ListingPage is an asynchronous component that fetches the details of a specific listing
// and the current user to display the listing page. If the listing is not found,
// it renders an EmptyListingsComponent. Otherwise, it renders the details of the listing.
const ListingPage = async ({ params }) => {
    // Fetch the listing details based on the provided parameters
    const listing = await getListingById(params);
    // Fetch the current user details
    const currentUser = await getCurrentUser();

    // If the listing is not found, render the EmptyListingsComponent
    if (!listing) {
        return (
            <EmptyListingsComponent />
        );
    }

    // Render the ListingPage component with the fetched listing and current user details
    return (
        <ListingPageComponent listing={listing} currentUser={currentUser} />
    );
}

export default ListingPage;