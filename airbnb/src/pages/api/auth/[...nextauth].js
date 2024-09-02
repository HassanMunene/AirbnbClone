{/*
    This file will define the following routes that will handle login of users
    1. when user wants to login using their credentials email and password
    2. When user wants to login using their Github account
    3. When user wants to login using their Google account
*/}
import NextAuth from "next-auth/next";
import prismaClient from "@/app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";



export const authenticationOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                const user = await prismaClient.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }
                return user;
            }
        }),
    ],
    pages: {
        signIn: '/',  // Custom sign-in page
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET_KEY,
}

export default NextAuth(authenticationOptions);