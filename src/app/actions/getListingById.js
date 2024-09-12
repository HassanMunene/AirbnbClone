// Import the Prisma client to interact with the database
import prismaClient from "../libs/prismadb";

// Function to fetch a listing by its ID
// Accepts `params` object containing the `listingId`
async function getListingById(params) {
    // Ensure params is defined and has the property listingId
    if (!params || !params.listingId) {
        throw new Error('Listing ID is required.');
    }
    // Destructure `listingId` from the `params` object
    const { listingId } = params;

    try {
        // Query the database to find the listing with the provided `listingId`
        const listing = await prismaClient.listing.findUnique({
            where: {
                id: listingId, // Match the listing by its unique ID
            },
            include: {
                user: true, // Also fetch the related user who created the listing
            },
        });

        // If no listing is found, return null
        if (!listing) {
            return null;
        }

        // Return the listing if found
        return listing;
    } catch (error) {
        // If an error occurs during the query, throw an error
        throw new Error(error); // Pass the error to the caller
    }
}

// Export the `getListingById` function as the default export
export default getListingById;