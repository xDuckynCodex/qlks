/* eslint-disable */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { fetchNhanVien } from "./lib/data";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                const res = await fetchNhanVien(
                    credentials?.username as string,
                    credentials?.password as string
                );

                if (!res) {
                    return null;
                } else {
                    return {
                        id: res.MaNV,
                        name: res.HoTen,
                        email: res.SDT,
                        role: res.ChucVu,
                    };
                }
            },
        }),
    ],
});
