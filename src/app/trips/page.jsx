// Import components and actions required for the Trips page
import EmptyComponent from "@/components/common/EmptyComponent";  // Component to display an empty state
import getCurrentUser from "../actions/getCurrentUser";  // Function to get the current logged-in user
import TripsPageComponent from "./TripsPageComponent";
import getReservations from "../actions/getRervations";

// Async functional component for the user's Trips page
const TripsPage = async () => {
    // Fetch the current user (likely from session or token)
    const currentUser = await getCurrentUser();

    // If the user is not logged in, display an "Unauthorized" message
    if (!currentUser) {
        return (
            <EmptyComponent
                title="Unauthorized"   // Main title of the empty state
                subtitle="Please login"  // Subtitle prompting the user to log in
            />
        );
    }

    // Fetch the reservations for the current user
    const reservations = await getReservations({ userId: currentUser.id });

    // If no reservations are found, display a "No trips found" message
    if (reservations.length === 0) {
        return (
            <EmptyComponent
                title="No trips found"  // Title when no trips are found
                subtitle="Looks like you have not reserved any trips"  // Inform the user that no reservations exist
            />
        );
    }

    // If there are reservations, render the TripsPageComponent with the user's reservations
    return (
        <TripsPageComponent 
            reservations={reservations}  // Pass the fetched reservations to the component
            currentUser={currentUser}    // Pass the current user information
        />
    );
}

// Export the TripsPage component for use in routing or other parts of the app
export default TripsPage;