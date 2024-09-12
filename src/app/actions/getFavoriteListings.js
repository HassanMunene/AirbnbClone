// Import the Prisma client to interact with the database
import prismaClient from "../libs/prismadb";

// Import function to get the currently logged-in user
import getCurrentUser from "./getCurrentUser";

// Async function to retrieve the favorite listings of the current user
async function getFavoriteListings() {
    try {
        // Get the current logged-in user
        const currentUser = await getCurrentUser();

        // If no user is logged in, return an empty array (no favorites)
        if (!currentUser) {
            return [];
        }

        // Fetch listings from the database where the listing ID is in the user's favorite IDs array
        const favoriteListings = await prismaClient.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteListingsIds || [])]
                }
            }
        });

        // Return the list of favorite listings
        return favoriteListings;
        
    } catch (error) {
        // If an error occurs, throw a new error with the original message
        throw new Error(error);
    }
}

// Export the function for use in other parts of the application
export default getFavoriteListings;