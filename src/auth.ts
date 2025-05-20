/* eslint-disable */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                const response = await fetch("");
                if (!response.ok) return null;
                return (await response.json()) ?? null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/signin",
    },
});
