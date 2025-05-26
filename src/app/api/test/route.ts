import { pool } from "@/lib/db";

const getSP = async () => {
    try {
        const res = await pool.request().query(`select * from NhanVien`);
        return res;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export async function GET() {
    try {
        const data = await getSP();

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
