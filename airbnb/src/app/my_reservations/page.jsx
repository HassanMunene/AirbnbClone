// Import necessary components and actions
import EmptyComponent from "@/components/common/EmptyComponent";
import getReservations from "../actions/getRervations";
import getCurrentUser from "../actions/getCurrentUser";
import ReservationPageComponent from "./ReservationPageComponent";

// Async function component to display reservations for properties owned by the current user
const MyReservationsPage = async () => {
    // Fetch the current user (likely from a session or token)
    const currentUser = await getCurrentUser();

    // If no user is logged in, display an "Unauthorized" empty component
    if (!currentUser) {
        return (
            <EmptyComponent
                title="Unauthorized"   // Title for unauthorized users
                subtitle="Please login"  // Subtitle prompting the user to log in
            />
        );
    }

    // Fetch reservations where the current user is the owner of the property
    const reservations = await getReservations({ authorId: currentUser.id });

    // If no reservations are found, display an empty state with a message
    if (reservations.length === 0) {
        return (
            <EmptyComponent
                title="No reservations found"  // Title when no reservations exist
                subtitle="Looks like you have no reservations on your properties"  // Subtitle informing the user
            />
        );
    }

    // If reservations are found, display the ReservationPageComponent with the data
    return (
        <ReservationPageComponent 
            reservations={reservations}  // Pass the fetched reservations as props
            currentUser={currentUser}    // Pass the current user as props
        />
    );
}

// Export the component for use in routing or other parts of the app
export default MyReservationsPage;