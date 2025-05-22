import { signIn } from "@/auth";

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

export const login = async (username: string, password: string) => {
    console.log("Login data:", { username, password });
    const res = await signIn("Login", {
        username,
        password,
    });
    console.log("Login response:", res);
};
