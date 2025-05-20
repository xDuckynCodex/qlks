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
