"use server";
import { FormDatPhongSchemaType } from "@/app/admin/datphong/form-datphong";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { pool } from "./db";
import { DATPHONG, NGUOIDUNG, SDDDICHVU, UserRole } from "@/types";
import { generateRandomLetters } from "./utils";
import { differenceInDays } from "date-fns";
import { KhachHangDatPhongType } from "@/app/(guest)/datphong/form-datphong";
import { SDDVFormData } from "@/app/admin/sddichvu/form-dichvu";
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
    await signOut({ redirectTo: "/" });
};

export const datPhongQuaNhanVien = async (data: FormDatPhongSchemaType) => {
    const session = await auth();

    const user = await pool
        .request()
        .input("MaND", generateRandomLetters())
        .input("HoTen", data.HoTen)
        .input("SDT", data.SDT)
        .input("CCCD", data.CCCD)
        .input("Email", data.Email)
        .input("DiaChi", generateRandomLetters(60))
        .input("ChucVu", UserRole.customer)
        .execute<NGUOIDUNG>(`sp_UpsertNguoiDung`);

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
        .input("TienCoc", tongTien * 0.3)
        .execute<DATPHONG>(`sp_InsertDatPhong`);

    return res.recordset[0];
};

export const datPhongQuaKhachHang = async (data: KhachHangDatPhongType) => {
    const session = await auth();

    // Lay ma phong tu loai phong
    const phong = await pool
        .request()
        .input("TenLP", data.TenLP)
        .input("NgayNhan", data.date.from)
        .input("NgayTra", data.date.to)
        .execute<{
            MaPhong: string;
            Gia: number;
        }>(`sp_FindAvailableRoom`);

    const tongTien =
        differenceInDays(data.date.to, data.date.from) * phong.recordset[0].Gia;

    const randomNhanVien = "ND0" + Math.floor(Math.random() + 16).toString();

    const res = await pool
        .request()
        .input("MaDP", generateRandomLetters())
        .input("MaPhong", phong.recordset[0].MaPhong)
        .input("MaND_KhachHang", session?.user?.id)
        .input("MaND_NhanVien", randomNhanVien)
        .input("NgayDat", new Date())
        .input("NgayNhan", data.date.from)
        .input("NgayTra", data.date.to)
        .input("TongTien", tongTien)
        .input("TienCoc", tongTien * 0.3)
        .execute<DATPHONG>(`sp_InsertDatPhong`);

    return res.recordset[0];
};

export async function datDichVu(data: SDDVFormData) {
    const res = await pool
        .request()
        .input("MaDP", data.MaDP)
        .input("MaDV", data.MaDV)
        .input("SoLuong", data.SoLuong)
        .input("NSD", data.NSD)
        .execute<SDDDICHVU[]>(`sp_Insert_SDDichVu`);

    return res.recordset[0];
}

// export async funciton datDichVu