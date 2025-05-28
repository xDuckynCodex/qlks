/* eslint-disable */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { fetchNguoiDung } from "./lib/data";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                const res = await fetchNguoiDung(
                    credentials?.username as string,
                    credentials?.password as string
                );

                if (!res) {
                    return null;
                } else {
                    return {
                        id: res.MaND,
                        name: res.HoTen,
                        email: res.Email,
                        role: res.ChucVu,
                    };
                }
            },
        }),
    ],
});
