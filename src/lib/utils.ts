import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { randomBytes } from "crypto";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(
    isoString: string,
    format: string = "DD-MM-YYYY"
): string {
    return dayjs(isoString).format(format);
}

export function generateRandomString(length = 5): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const bytes = randomBytes(length);
    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars[bytes[i] % chars.length];
    }

    return result;
}
