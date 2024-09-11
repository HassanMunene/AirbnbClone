// Import the Prisma client instance from the prisma configuration file
import prismaClient from "../libs/prismadb";

/**
 * Fetches a list of listings from the database, optionally filtered by multiple parameters.
 * 
 * @param {Object} params - Parameters to filter listings
 * @param {string} [params.userId] - Optional user ID to filter listings by a specific user
 * @param {number} [params.roomCount] - Minimum number of rooms required
 * @param {number} [params.guestCount] - Minimum number of guests that can be accommodated
 * @param {number} [params.bathroomCount] - Minimum number of bathrooms required
 * @param {string} [params.locationValue] - Filter by location
 * @param {string} [params.startDate] - Start date for availability filtering
 * @param {string} [params.endDate] - End date for availability filtering
 * @param {string} [params.category] - Filter by listing category
 * 
 * @returns {Promise<Array>} - Returns a promise that resolves to an array of listing objects
 * 
 * @throws {Error} - Throws an error if the database query fails
 */
async function getListings(params) {
    try {
        // Initialize an empty query object to build the search criteria
        let query = {};
        
        // Extract the filtering parameters from the input
        const { 
            userId, 
            roomCount, 
            guestCount, 
            bathroomCount, 
            locationValue, 
            startDate, 
            endDate, 
            category 
        } = params;

        // Filter listings by userId if provided (used for fetching specific user's listings)
        if (userId) {
            query.userId = userId;
        }

        // Filter by minimum room count, guest count, and bathroom count if provided
        if (roomCount) {
            query.roomCount = { gte: +roomCount };  // Ensure roomCount is a number and greater than or equal to the specified value
        }
        if (guestCount) {
            query.guestCount = { gte: +guestCount };
        }
        if (bathroomCount) {
            query.bathroomCount = { gte: +bathroomCount };
        }

        // Filter by location if locationValue is provided
        if (locationValue) {
            query.locationValue = locationValue;
        }

        // Filter by category if provided
        if (category) {
            query.category = category;
        }

        // Filter listings by availability dates (exclude listings with reservations that overlap with the given startDate and endDate)
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },  // Reservation overlaps with startDate
                                startDate: { lte: startDate } // Ensures the listing isn't available during the start date
                            },
                            {
                                startDate: { gte: endDate },   // Reservation overlaps with endDate
                                endDate: { lte: endDate }     // Ensures the listing isn't available during the end date
                            }
                        ]
                    }
                }
            }
        }

        // Fetch listings from the database based on the constructed query, ordering them by creation date in descending order
        const listings = await prismaClient.listing.findMany({
            where: query,
            orderBy: { createdAt: 'desc' }  // Order listings by newest first
        });
        //console.log(listings);
        // Return the fetched listings to the caller
        return listings;

    } catch (error) {
        // Log the error to the console
        console.log(error);
        
        // Throw an error to notify the caller of the failure
        throw new Error(error);
    }
}

// Export the getListings function for use in other parts of the application
export default getListings;