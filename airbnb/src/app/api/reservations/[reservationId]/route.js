// Import function to get the current logged-in user
import getCurrentUser from "@/app/actions/getCurrentUser";

// Import prismaClient for interacting with the database
import prismaClient from "@/app/libs/prismadb";

// Import Next.js helper for returning structured server responses
import { NextResponse } from "next/server";

// Async function to handle DELETE requests for deleting reservations
export async function DELETE(request, { params }) {
    // Get the current logged-in user
    const currentUser = await getCurrentUser();

    // If no user is logged in, return an error response (unauthorized)
    if (!currentUser) {
        return NextResponse.error(); // Return error if user is not authenticated
    }

    // Extract reservationId from the route parameters
    const { reservationId } = params;

    // Check if reservationId is valid, if not, throw an error
    if (!reservationId) {
        throw new Error('Invalid Id'); // Ensure the reservation ID is provided
    }

    // Delete the reservation from the database using Prisma
    const reservation = await prismaClient.reservation.deleteMany({
        where: {
            id: reservationId,  // Match the reservation by ID
            OR: [
                { userId: currentUser.id },  // Allow the reservation owner to delete
                { listing: { userId: currentUser.id } }  // Allow the listing owner to delete
            ]
        }
    });

    // Return the deleted reservation details as a JSON response
    return NextResponse.json(reservation);
}