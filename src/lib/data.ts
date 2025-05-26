"use server";
import sql from "mssql";
import bcrypt from "bcrypt";
import { pool } from "./db";
import { ThongKePhong } from "@/app/admin/datphong/columns";
import { DatPhong, DichVu, NhanVien } from "@/types";

export async function fetchNhanVien(
    username: string,
    password: string
): Promise<NhanVien | null> {
    const res = await pool
        .request()
        .input("username", username)
        .query(`select * from NhanVien where MaNV = @username`);

    const matchPwd = await bcrypt.compare(password, res.recordset[0].MatKhau);
    if (!matchPwd) {
        return null;
    }
    return res.recordset[0];
}

export async function fetchPhong(): Promise<ThongKePhong[]> {
    const res = await pool
        .request()
        .execute<ThongKePhong[]>(`sp_LietKeThongTinPhong`);
    const data = res.recordset.map((phong) => {
        if (
            !(phong.TinhTrang === "reserved" || phong.TinhTrang === "occupied")
        ) {
            phong.NgayDat = "";
            phong.NgayNhan = "";
            phong.NgayTra = "";
        }
        return phong;
    });
    return data;
}

export async function fetchPhongDangSD(): Promise<DatPhong[]> {
    const res = await pool.request().execute(`sp_LietKePhongDangSuDung`);
    return res.recordset;
}

export async function fetchDichVu(): Promise<DichVu[]> {
    const res = await pool.request().execute(`sp_LayDanhSachDichVu`);
    return res.recordset;
}

interface ThongKe {
    Nam: number;
    Thang: number;
    SoLuong: number;
}
export async function fetchDatPhongTheoThang(): Promise<ThongKe[]> {
    const res = await pool.request().execute(`sp_ThongKeDatPhongTheoThangNam`);
    return res.recordset;
}

export async function fetchDichVuTheoThang(): Promise<ThongKe[]> {
    const res = await pool.request().execute(`sp_ThongKeSuDungDichVu`);
    return res.recordset;
}

export async function fetchBieuDo() {
    const bookings = await fetchDatPhongTheoThang();
    const services = await fetchDichVuTheoThang();

    const map = new Map<
        string,
        { time: string; bookings: number; services: number }
    >();

    for (const i of bookings) {
        const time = `${i.Nam}-${String(i.Thang).padStart(2, "0")}`;
        if (!map.has(time)) {
            map.set(time, { time, bookings: i.SoLuong, services: 0 });
        } else {
            map.get(time)!.bookings += i.SoLuong;
        }
    }

    for (const i of services) {
        const time = `${i.Nam}-${String(i.Thang).padStart(2, "0")}`;
        if (!map.has(time)) {
            map.set(time, { time, bookings: 0, services: i.SoLuong });
        } else {
            map.get(time)!.services += i.SoLuong;
        }
    }

    return Array.from(map.values()).sort((a, b) =>
        a.time.localeCompare(b.time)
    );
}

interface LoaiPhong {
    MaLP: string;
    TenLP: string;
    SoLuong: number;
}

export async function fetchLoaiPhong(status: string): Promise<LoaiPhong[]> {
    const res = await pool
        .request()
        .input("TinhTrang", sql.NVarChar(50), status)
        .execute<LoaiPhong[]>(`sp_ThongKeLoaiPhongTheoTinhTrang`);
    return res.recordset;
}
