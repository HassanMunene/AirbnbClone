'use client' // Ensures that this component runs in the client-side of Next.js

// Importing necessary components and libraries
import Container from "@/components/common/Container";
import HeaderComponent from "@/components/common/HeaderComponent";
import ListingCard from "@/components/listings/ListingCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

/**
 * MyPropertiesPageComponent renders a page that displays a list of properties
 * owned by the current user. It also allows the user to delete properties.
 */
const MyPropertiesPageComponent = ({ myProperties, currentUser }) => {
    const router = useRouter(); // Hook for handling navigation and page refresh
    const [deletingId, setDeletingId] = useState(''); // State to track the property being deleted

    /**
     * Handles the deletion of a property by its ID.
     * 
     * @param {string} id - The ID of the property to delete
     */
    const onDeleteProperty = useCallback((id) => {
        setDeletingId(id); // Mark the property as being deleted
        
        // Send a DELETE request to the server to delete the property
        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Property deleted'); // Show success toast notification
            router.refresh(); // Refresh the page to show the updated list
        })
        .catch(() => {
            toast.error('Something went wrong'); // Show error toast notification in case of failure
        })
        .finally(() => {
            setDeletingId(''); // Reset the deletingId state after the operation
        });
    }, [router]); // Memoize the function to avoid unnecessary re-renders

    return (
        <Container>
            {/* Header section for the page */}
            <HeaderComponent
                title="Properties"
                subtitle="List of your properties"
            />
            
            {/* Grid layout to display the list of properties */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {myProperties.map((property) => (
                    <ListingCard
                        key={property.id} // Unique key for each property
                        data={property} // Property data passed to the ListingCard
                        actionId={property.id} // ID used to trigger actions like delete
                        onAction={onDeleteProperty} // Function to handle delete action
                        disabled={deletingId === property.id} // Disable delete button during deletion
                        currentUser={currentUser} // Pass current user data to the ListingCard
                        actionLabel="Delete property" // Label for the delete button
                    />
                ))}
            </div>
        </Container>
    );
}

export default MyPropertiesPageComponent;