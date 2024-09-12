//we will use this route to create a listing and storing it in mongoDB

import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request) {
    console.log('here')
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }
    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue,
        price
    } = body

    try {
        // create a new listing in the db
        const listing = await prismaClient.listing.create({
            data: {
                title: title,
                description: description,
                imageSrc: imageSrc,
                category: category,
                roomCount: roomCount,
                bathroomCount: bathroomCount,
                guestCount: guestCount,
                locationValue: locationValue.value,
                price: parseInt(price, 10),
                userId: currentUser.id,
            }
        });

        //return the created listing
        return NextResponse.json(listing);

    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}