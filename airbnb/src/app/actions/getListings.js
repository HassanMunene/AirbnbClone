// fetch listings data from db using prisma

import prismaClient from "../libs/prismadb";

async function getListings () {
    try {
        const listings = await prismaClient.listing.findMany({
            orderBy: {createdAt: 'desc'}
        });
        return listings;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export default getListings;