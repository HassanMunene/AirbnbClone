{/*
    This file will help us fetch the currently logged in user
    using a function provided by nextjs NextAuth authentication library getServerSession
    We dont really need to make an API request anymore
*/}
import { getServerSession } from "next-auth";
import { authenticationOptions } from "@/pages/api/auth/[...nextauth]";
import prismaClient from "../libs/prismadb";

const getCurrentUser = async () => {
    try {
        const session = await getServerSession(authenticationOptions);

        if (!session?.user?.email) {
            return null;
        }
        const currentUser = await prismaClient.user.findUnique({
            where: {
                email: session.user.email
            }
        });
        if (!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error) {
        return null;
    }
}

export default getCurrentUser;