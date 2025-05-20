import { pool } from "@/lib/db";

const getSP = async (con: string) => {
    try {
        const res = await pool.request().query(`select * from NhanVien`);
        return res;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export async function GET(request: Request) {
    const url = new URL(request.url);
    const con = url.searchParams.get("con");
    if (!con) {
        return new Response("Missing 'con' parameter", { status: 400 });
    }
    try {
        const data = await getSP(con);

        return new Response(JSON.stringify(data.recordset), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response("Error fetching data", { status: 500 });
    }
}
