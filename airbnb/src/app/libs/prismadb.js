import { PrismaClient } from "@prisma/client";

let prismaClient;

if (process.env.NODE_ENV === 'production') {
    prismaClient = new PrismaClient();
}
else {
    if (!global.prismaClient) {
        global.prismaClient = new PrismaClient();
    }
    prismaClient = global.prismaClient;
}

export default prismaClient;