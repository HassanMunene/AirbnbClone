// Import the Prisma client to interact with the database
import prismaClient from "../libs/prismadb";

// Async function to fetch reservations based on query parameters
async function getReservations(params) {
    try {
        // Destructure listingId, userId, and authorId from the incoming params
        const { listingId, userId, authorId } = params;

        // Initialize an empty query object to dynamically build search conditions
        const query = {};

        // If a listingId is provided, add it to the query to filter by listingId
        if (listingId) {
            query.listingId = listingId;
        }

        // If a userId is provided, add it to the query to filter by the user's reservations
        if (userId) {
            query.userId = userId;
        }

        // If an authorId is provided, add it to the query to filter by the listing's author (owner)
        if (authorId) {
            query.listing = { userId: authorId }; // Match reservations where the listing's owner is the authorId
        }

        // Fetch reservations from the database using Prisma's `findMany` method
        const reservations = await prismaClient.reservation.findMany({
            where: query,  // Apply the dynamically built query object

            // Include associated listing details in the response
            include: {
                listing: true
            },

            // Order results by creation date, in descending order (newest first)
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Return the fetched reservations
        return reservations;
    } catch (error) {
        // Throw an error if something goes wrong during the database operation
        throw new Error(error);
    }
}

export default getReservations;  // Export the function for use in other parts of the application