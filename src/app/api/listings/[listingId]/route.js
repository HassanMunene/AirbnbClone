// Import the function to get the current logged-in user
import getCurrentUser from "@/app/actions/getCurrentUser";

// Import Prisma client to interact with the database
import prismaClient from "@/app/libs/prismadb";

// Import Next.js helper for returning structured server responses
import { NextResponse } from "next/server";

// Async DELETE function to handle deleting a listing
export async function DELETE(request, { params }) {
    // Get the current logged-in user
    const currentUser = await getCurrentUser();

    // If there is no logged-in user, return an error response
    if (!currentUser) {
        return NextResponse.error();
    }

    // Extract listingId from the request parameters
    const { listingId } = params;

    // Validate that listingId is provided, if not, throw an error
    if (!listingId) {
        throw new Error('Invalid Id');
    }

    // Delete the listing from the database, but only if it belongs to the current user
    const listing = await prismaClient.listing.deleteMany({
        where: {
            id: listingId,           // Match the listing by ID
            userId: currentUser.id    // Ensure the listing belongs to the current user
        }
    });

    // Return the deleted listing data as a JSON response
    return NextResponse.json(listing);
}