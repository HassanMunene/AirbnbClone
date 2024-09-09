import getCurrentUser from "@/app/actions/getCurrentUser"; // Function to get the currently logged-in user
import prismaClient from "@/app/libs/prismadb"; // Prisma client to interact with the database
import { NextResponse } from "next/server"; // Utility from Next.js for server responses

// Asynchronous function to handle POST requests
export async function POST(request) {
    // Get the current user making the request
    const currentUser = await getCurrentUser();

    // If there's no logged-in user, return an error response
    if (!currentUser) {
        return NextResponse.error(); // Return a generic error response if user is not authenticated
    }

    // Parse the request body to extract the data being sent in the POST request
    const body = await request.json();
    const { listingId } = body; // Destructure the listingId from the request body

    // Validate that a valid listingId is provided
    if (!listingId) {
        throw new Error('Invalid ID'); // Throw an error if listingId is missing or undefined
    }

    // Create a copy of the user's favorite listings, or initialize it if it's undefined
    let favoriteIds = [...(currentUser.favoriteListingsIds || [])];
    
    // Add the new listingId to the list of favoriteIds
    favoriteIds.push(listingId);

    // Update the user's favoriteIds in the database using Prisma
    const user = await prismaClient.user.update({
        where: {
            id: currentUser.id // Update the user based on their unique ID
        },
        data: {
            favoriteListingsIds: favoriteIds // Set the updated favoriteIds array
        }
    });

    // Return a JSON response with the updated user data
    return NextResponse.json(user);
}

// Asynchronous function to handle DELETE requests
export async function DELETE(request, { params }) {
    // Get the current user making the request
    const currentUser = await getCurrentUser();

    // If there's no logged-in user, return an error response
    if (!currentUser) {
        return NextResponse.error(); // Return a generic error response if user is not authenticated
    }

    // Destructure the listingId from the request body
    const { listingId } = params;

    // Validate that a valid listingId is provided
    if (!listingId) {
        throw new Error('Invalid ID'); // Throw an error if listingId is missing or undefined
    }

    // Create a copy of the user's favorite listings or initialize it if it's undefined
    let favoriteIds = [...(currentUser.favoriteListingsIds || [])];
    
    // Remove the specified listingId from the list of favoriteIds
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    // Update the user's favoriteIds in the database using Prisma
    const user = await prismaClient.user.update({
        where: {
            id: currentUser.id // Update the user based on their unique ID
        },
        data: {
            favoriteListingsIds: favoriteIds // Set the updated favoriteIds array
        }
    });

    // Return a JSON response with the updated user data
    return NextResponse.json(user);
}