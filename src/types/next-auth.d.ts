import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        user: IUser;
    }
}

declare module "next-auth" {
    interface Session {
        user: IUser;
    }

    interface User extends IUser {}
}
