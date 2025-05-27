"use server";
import { FormDatPhongSchemaType } from "@/app/admin/datphong/form-datphong";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { pool } from "./db";
import { DATPHONG, NGUOIDUNG, UserRole } from "@/types";
import { generateRandomLetters } from "./utils";
import { differenceInDays } from "date-fns";
// import { pool } from "./db";

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

export const datPhongQuaNhanVien = async (data: FormDatPhongSchemaType) => {
    const session = await auth();

    console.log(session);

    const user = await pool
        .request()
        .input("MaND", generateRandomLetters())
        .input("HoTen", data.HoTen)
        .input("SDT", data.SDT)
        .input("CCCD", data.CCCD)
        .input("Email", data.Email)
        .input("DiaChi", generateRandomLetters(60))
        .input("ChucVu", UserRole.Customer).query<NGUOIDUNG>(`
            INSERT INTO NGUOIDUNG (MaND, HoTen, SDT, CCCD, Email, DiaChi, ChucVu)
            OUTPUT INSERTED.*
            VALUES (@MaND, @HoTen, @SDT, @CCCD, @Email, @DiaChi, @ChucVu);   
        `);

    const phong = await pool.request().input("MaPhong", data.MaPhong).query<{
        Gia: number;
    }>(`
            SELECT L.Gia FROM PHONG P JOIN LOAIPHONG L ON P.MaLP = L.MaLP  WHERE MaPhong = @MaPhong;
        `);

    const tongTien =
        differenceInDays(data.date.to, data.date.from) * phong.recordset[0].Gia;

    const res = await pool
        .request()
        .input("MaDP", generateRandomLetters())
        .input("MaPhong", data.MaPhong)
        .input("MaND_KhachHang", user.recordset[0].MaND)
        .input("MaND_NhanVien", session?.user?.id)
        .input("NgayDat", data.date.from)
        .input("NgayNhan", data.date.from)
        .input("NgayTra", data.date.to)
        .input("TongTien", tongTien)
        .input("TienCoc", tongTien * 0.3).query<DATPHONG>(`
            INSERT INTO DATPHONG (MaDP, MaPhong, MaND_KhachHang, MaND_NhanVien, NgayDat, NgayNhan, NgayTra, TongTien, TienCoc)
            OUTPUT INSERTED.*
            VALUES (@MaDP, @MaPhong, @MaND_KhachHang, @MaND_NhanVien, @NgayDat, @NgayNhan, @NgayTra, @TongTien, @TienCoc);
        `);

    return res.recordset[0];
};
