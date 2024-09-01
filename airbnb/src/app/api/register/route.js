{/*
    This route will be used in the process of creating a user account
    and storing it in the mongoDB
*/}
import prismaClient from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    const body = await request.json();
    const {email, name, password} = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
        data: {
            email: email,
            name: name,
            hashedPassword: hashedPassword,
        }
    });
    return NextResponse.json(user);
}