// Import necessary modules and hooks
import { useRouter } from "next/navigation"; // Hook to navigate programmatically or refresh the current route
import useLoginModal from "./useLoginModal"; // Custom hook to control the login modal
import { useCallback, useMemo } from "react"; // React hooks for optimizing performance (memoization and caching)
import toast from "react-hot-toast"; // Toast notifications for success/error messages
import axios from "axios"; // Axios library for making HTTP requests

// Custom hook to manage adding/removing a listing from a user's favorites
const useFavorite = ({ listingId, currentUser }) => {
    const router = useRouter(); // Router hook to programmatically refresh the page after state changes
    const loginModal = useLoginModal(); // Login modal hook to open the modal if the user is not logged in

    // Determine if the current listing is already in the user's list of favorites
    // this func will return true or false
    const hasBeenFavorited = useMemo(() => {
        const list = currentUser?.favoriteListingsIds || []; // Get user's favorite listing IDs or initialize an empty array
        return list.includes(listingId); // Check if the current listing is in the user's favorites
    }, [currentUser, listingId]); // Dependencies: Recompute if `currentUser` or `listingId` changes

    // Function to handle toggling the favorite status (add or remove)
    const toggleFavorite = useCallback(async (event) => {
        event.stopPropagation(); // Prevent triggering any parent click events

        // If the user is not logged in, open the login modal and exit the function
        if (!currentUser) {
            return loginModal.onOpen(); // Open the login modal
        }

        try {
            let request; // Variable to hold the HTTP request function
            let data = { listingId }; // Prepare the data to be sent in the request

            // Determine whether to send a POST (add to favorites) or DELETE (remove from favorites) request
            if (hasBeenFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`, data); // If already favorited, prepare DELETE request
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`, data); // If not favorited, prepare POST request
            }

            // Execute the HTTP request
            await request();
            
            // Refresh the page to reflect the updated favorite status
            router.refresh();

            // Display a success notification
            toast.success('success');
        } catch (error) {
            // Display an error notification if something goes wrong
            toast.error('Something went wrong');
        }
    }, [currentUser, hasBeenFavorited, listingId, loginModal, router]); // Dependencies: Recreate function only when these change

    return { toggleFavorite, hasBeenFavorited }; // Return the toggle function and favorite status for use in components
}

export default useFavorite;