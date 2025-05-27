"use server";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { pool } from "./db";
import { BookingFormData } from "@/app/(guest)/datphong/form-datphong";
import { generateRandomString } from "./utils";
import { DatPhong } from "@/types";
import { SDDVFormData } from "@/app/admin/sddichvu/form-dichvu";

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
    await signOut({ redirectTo: "/" });
};

export async function insertObject(
    table: string,
    data: Record<string, unknown>
) {
    const columns = Object.keys(data);
    const values = Object.values(data);

    // Build parameter names: @id, @name, @age
    const params = columns.map((col) => "@" + col);

    // Build the query
    const query = `
        INSERT INTO ${table} (${columns.join(", ")})
        OUTPUT INSERTED.*
        VALUES (${params.join(", ")})
    `;

    const request = pool.request();

    // Bind parameters
    columns.forEach((col, i) => {
        request.input(col, values[i]);
    });

    return await request.query(query);
}

export const insertDatPhong = async (data: BookingFormData) => {
    const sesion = await auth();

    const MaPhongResult = await pool
        .request()
        .input("from", data.date.from)
        .input("to", data.date.to)
        .input("roomType", data.roomType).query<{ MaPhong: string }>(`
            SELECT TOP 1 P.MaPhong
            FROM PHONG P
            JOIN LOAIPHONG L ON P.MaLP = L.MaLP
            WHERE L.TenLP = @roomType
            AND P.MaPhong NOT IN (
                SELECT D.MaPhong
                FROM DATPHONG D
                WHERE NOT (
                    @to <= D.NgayNhan OR @from >= D.NgayTra
                )
            )
        `);

    console.log(MaPhongResult);

    const khachHang = await insertObject("KHACHHANG", {
        MaKH: generateRandomString(), // Giả sử đã có khách hàng với mã này
        HoTen: data.name,
        DiaChi: data.address,
        CCCD: data.cccd,
        SDT: data.phone,
        Email: data.email,
        Hang: "Thường",
    });

    const datPhong = {
        MaDP: generateRandomString(),
        MaKH: khachHang.recordset[0].MaKH, // Can truy xuat du lieu
        MaNV: sesion?.user?.id as string, // Can truy xuat
        MaPhong: MaPhongResult.recordset[0].MaPhong, // Can truy xuat du lieu
        NgayDat: new Date(),
        NgayNhan: data.date.from,
        NgayTra: data.date.to,
        TongTien: 500000,
        TienCoc: 100000,
    } satisfies DatPhong;

    const res = await insertObject("DATPHONG", datPhong);
    return res;
};

export async function insertSDDV(data: SDDVFormData) {
    const sddv = {
        MaDP: data.MaDP,
        MaDV: data.MaDV,
        SoLuong: data.SoLuong,
        NSD: data.NSD,
    } satisfies SDDVFormData;

    const res = await insertObject("SDDichVu", sddv);
    return res;
}