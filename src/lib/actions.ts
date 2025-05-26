"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { pool } from "./db";

export const getSP = async () => {
    const res = await fetch("/api/test?con=Thai%20Lan", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
};

export const authenticate = async (username: string, password: string) => {
    try {
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        return res;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
};

export const logout = async () => {
    await signOut({ redirectTo: "/login" });
};

export const insertDatPhong = async (data: any) => {
    const res = await pool.request().input("MaDP", data.MaDP);
};
