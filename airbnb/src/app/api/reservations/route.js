// Import function to get the current logged-in user
import getCurrentUser from "@/app/actions/getCurrentUser";

// Import Prisma client to interact with the database
import prismaClient from "@/app/libs/prismadb";

// Import Next.js helper for returning structured server responses
import { NextResponse } from "next/server";

// Handle POST requests for creating a new reservation
export async function POST(request) {
    // Get the current logged-in user (likely from a session or token)
    const currentUser = await getCurrentUser();

    // If no user is logged in, return an error response
    if (!currentUser) {
        return NextResponse.error(); // Send an error response if the user is not authenticated
    }

    // Parse the incoming request body as JSON to extract reservation data
    const body = await request.json();

    // Destructure the required fields from the request body
    const { listingId, startDate, endDate, totalPrice } = body;

    // Check if any of the required fields are missing, and return an error if so
    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error(); // Send an error response if any field is missing
    }

    // Update the listing in the database to add a new reservation
    const listingAndReservation = await prismaClient.listing.update({
        where: {
            id: listingId  // Find the listing by its ID
        },
        data: {
            // Create a new reservation associated with the listing
            reservations: {
                create: {
                    userId: currentUser.id,  // Link the reservation to the current user
                    startDate: startDate,    // Set the start date of the reservation
                    endDate: endDate,        // Set the end date of the reservation
                    totalPrice: totalPrice   // Set the total price of the reservation
                }
            }
        }
    });

    // Return the updated listing and reservation data as a JSON response
    return NextResponse.json(listingAndReservation);
}