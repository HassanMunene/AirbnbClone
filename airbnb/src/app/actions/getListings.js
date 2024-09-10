// Import the Prisma client instance from the prisma configuration file
import prismaClient from "../libs/prismadb";

/**
 * Fetches a list of listings from the database, optionally filtered by userId.
 * 
 * @param {Object} params - Parameters to filter listings
 * @param {string} [params.userId] - Optional user ID to filter listings by a specific user
 * 
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of listing objects
 * 
 * @throws {Error} - Throws an error if the database query fails
 */
async function getListings (params) {
    try {
        // Initialize an empty query object to build the search criteria
        let query = {};
        
        // Extract the userId from the input parameters
        const { userId } = params;

        // If userId is provided, filter the listings by this user ID
        if (userId) {
            query.userId = userId;
        }

        // Fetch the listings from the database using Prisma's findMany method
        // The query filters by userId if provided and orders the results by creation date (descending)
        const listings = await prismaClient.listing.findMany({
            where: query,
            orderBy: { createdAt: 'desc' }
        });
        
        // Return the fetched listings as the function result
        return listings;
        
    } catch (error) {
        // Log the error to the console for debugging
        console.log(error);
        
        // Throw a new error to notify the caller of the issue
        throw new Error(error);
    }
}

// Export the getListings function for use in other parts of the application
export default getListings;