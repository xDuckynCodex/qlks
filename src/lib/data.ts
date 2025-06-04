"use server";
import sql from "mssql";
import bcrypt from "bcrypt";
import { pool } from "./db";
import { ThongTinDatPhong } from "@/app/admin/datphong/columns";
import { DATPHONG, DICHVU, NGUOIDUNG, PHONG, TenLP } from "@/types";

export async function fetchNguoiDung(
    username: string,
    password: string
): Promise<NGUOIDUNG | null> {
    const res = await pool
        .request()
        .input("username", username)
        .execute<NGUOIDUNG>(`sp_LayNguoiDungTheoSDT`);

    const matchPwd = await bcrypt.compare(
        password,
        res.recordset[0].MatKhau as string
    );
    if (!matchPwd) {
        return null;
    }
    return res.recordset[0];
}

export async function fetchThongTinDatPhong(): Promise<ThongTinDatPhong[]> {
    const res = await pool
        .request()
        .execute<ThongTinDatPhong[]>(`sp_Get_ThongTinPhong_DaDat`);

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

export async function fetchPhongDangSD(): Promise<DATPHONG[]> {
    const res = await pool.request().execute(`sp_Get_DatPhong_DangO`);
    return res.recordset;
}

export async function fetchDichVu(): Promise<DICHVU[]> {
    const res = await pool.request().execute<DICHVU[]>(`sp_Get_DichVu`);
    return res.recordset;
}

interface ThongKe {
    Nam: number;
    Thang: number;
    SoLuong: number;
}
export async function fetchDatPhongTheoThang(): Promise<ThongKe[]> {
    const res = await pool
        .request()
        .execute<ThongKe[]>(`sp_ThongKeDatPhong_TheoThangNam`);
    return res.recordset;
}

export async function fetchDichVuTheoThang(): Promise<ThongKe[]> {
    const res = await pool
        .request()
        .execute<ThongKe[]>(`sp_ThongKeSuDungDichVu_TheoThangNam`);
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

export async function fetchDoanhThu() {
    const res = await pool
        .request()
        .input("Thang", sql.Int, new Date().getMonth() + 1)
        .input("Nam", sql.Int, new Date().getFullYear())
        .execute<{
            Thang: number;
            Nam: number;
            DoanhSo: number;
        }>(`sp_ThongKeDoanhSo_TheoThangNam`);

    return res.recordset[0];
}

export async function fetchSoLuotDatPhong() {
    const res = await pool
        .request()
        .input("Thang", sql.Int, new Date().getMonth() + 1)
        .input("Nam", sql.Int, new Date().getFullYear())
        .execute<{
            Thang: number;
            Nam: number;
            SoLuotDatPhong: number;
        }>(`sp_ThongKeSoLuotDatPhong_TheoThangNam`);

    return res.recordset[0];
}

export async function fetchSoLuotSDDV() {
    const res = await pool
        .request()
        .input("Thang", sql.Int, new Date().getMonth() + 1)
        .input("Nam", sql.Int, new Date().getFullYear())
        .execute<{
            Thang: number;
            Nam: number;
            SoLuongSDDV: number;
        }>(`sp_ThongKeSoLuongSuDungDichVu_TheoThangNam`);

    return res.recordset[0];
}

export async function fetchBaoCao() {
    const doanhThu = await fetchDoanhThu();
    const soLuotDatPhong = await fetchSoLuotDatPhong();
    const soLuotSDDV = await fetchSoLuotSDDV();

    return [
        {
            label: "Doanh thu",
            value: doanhThu.DoanhSo,
        },
        {
            label: "Số lượt đặt phòng",
            value: soLuotDatPhong.SoLuotDatPhong,
        },
        {
            label: "Số lượt sử dụng dịch vụ",
            value: soLuotSDDV.SoLuongSDDV,
        },
        {
            label: "Đánh giá",
            value: 4.5,
        },
    ];
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
        .execute(`sp_ThongKeSoLuongPhong_TheoTinhTrang`);
    return res.recordset;
}

export async function fetchDoanThuThang() {
    const res = await pool.request().execute(`sp_ThongKeDoanhThu_ThangHienTai`);

    return res.recordset[0]?.DoanhThu || 0;
}

export async function fetchNgayDaDuocDatTheoLoaiPhong(TenLP: TenLP) {
    const res = await pool
        .request()
        .input("TenLP", sql.NVarChar(50), TenLP)
        .execute<{ Ngay: Date }[]>(`sp_LietKeNgayDaDat_TheoLoaiPhong`);

    return res.recordset;
}

export async function fetchNgayDaDuocDatTheoMaPhong(MaPhong: PHONG["MaPhong"]) {
    const res = await pool
        .request()
        .input("MaPhong", sql.NVarChar(50), MaPhong)
        .execute<{ Ngay: Date }[]>(`sp_LietKeNgayDaDat_TheoMaPhong`);

    return res.recordset;
}

export interface KetQuaDatPhong {
    MaDP: string;
    HoTen: string;
    SDT: string;
    Email: string;
    CCCD: string;
    TenLP: keyof typeof TenLP;
    NgayNhan: Date;
    NgayTra: Date;
    TongTien: number;
}

export async function fetchKetQuaDatPhong(MaDP: string) {
    const res = await pool
        .request()
        .input("MaDP", MaDP)
        .execute<KetQuaDatPhong>(`sp_LayChiTietDatPhongTheoMaDP`);
    return res.recordset[0];
}