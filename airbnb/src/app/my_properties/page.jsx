// Import necessary components and actions
import EmptyComponent from "@/components/common/EmptyComponent";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import MyPropertiesPageComponent from "./MyPropertiesPageComponent";

// Async function to render the "My Properties" page for the current user
const MyPropertiesPage = async () => {
    // Fetch the current user
    const currentUser = await getCurrentUser();

    // If no user is logged in, display an "Unauthorized" message
    if (!currentUser) {
        return (
            <EmptyComponent
                title="Unauthorized"  // Title for unauthorized access
                subtitle="Please login"  // Prompt the user to log in
            />
        );
    }

    // Fetch the properties (listings) owned by the current user
    const myProperties = await getListings({ userId: currentUser.id });

    // If the user has no properties, display an empty state message
    if (myProperties.length === 0) {
        return (
            <EmptyComponent
                title="No properties found"
                subtitle="Looks like you have no properties"
            />
        );
    }

    // If properties exist, render the MyPropertiesPageComponent with the data
    return (
        <MyPropertiesPageComponent 
            myProperties={myProperties}
            currentUser={currentUser}
        />
    );
}

// Export the component to be used elsewhere in the app
export default MyPropertiesPage;