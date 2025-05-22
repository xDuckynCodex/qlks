/* eslint-disable */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { pool } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Login",
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                const res = await pool
                    .request()
                    .input("username", credentials?.username)
                    .input("password", credentials?.password)
                    .query(
                        `select * from NhanVien where username = @username and password = @password`
                    );
                console.log(res);
                return null;
            },
        }),
    ],
});
