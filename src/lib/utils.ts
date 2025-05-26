import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(
    isoString: string,
    format: string = "DD-MM-YYYY"
): string {
    return dayjs(isoString).format(format);
}
