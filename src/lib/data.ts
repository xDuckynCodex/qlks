"use server";
import { NVarChar } from "mssql";
import bcrypt from "bcrypt";
import { pool } from "./db";
import { ThongTinPhong } from "@/app/admin/datphong/columns";
import { DATPHONG, DICHVU, NGUOIDUNG } from "@/types";

export async function fetchNguoiDung(
    username: string,
    password: string
): Promise<NGUOIDUNG | null> {
    const res = await pool
        .request()
        .input("username", username)
        .query<NGUOIDUNG>(
            `select top 1 * from NGUOIDUNG where SDT = @username`
        );

    const matchPwd = await bcrypt.compare(password, res.recordset[0].MatKhau);
    if (!matchPwd) {
        return null;
    }
    return res.recordset[0];
}

export async function fetchThongTinPhong(): Promise<ThongTinPhong[]> {
    const res = await pool.request().query<ThongTinPhong[]>(`
            SELECT
        P.MaPhong AS N'MaPhong',
        LP.TenLP AS N'TenLP',
        LP.Gia AS N'Gia',
        P.TinhTrang AS N'TinhTrang',
        -- Thông tin đặt phòng hiện tại (nếu có)
        D.MaDP AS N'Mã Đặt Phòng Hiện Tại',
        D.NgayDat AS N'NgayDat',
        D.NgayNhan AS N'NgayNhan',
        D.NgayTra AS N'NgayTra'
    FROM
        PHONG AS P
    JOIN
        LOAIPHONG AS LP ON P.MaLP = LP.MaLP
    LEFT JOIN
        DATPHONG AS D ON P.MaPhong = D.MaPhong
                      AND GETDATE() BETWEEN D.NgayNhan AND D.NgayTra
    ORDER BY
        P.MaPhong;
            `);

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
    const res = await pool.request().query(`
        SELECT
        DP.*
    FROM
        DATPHONG AS DP
    JOIN
        PHONG AS P ON DP.MaPhong = P.MaPhong
    JOIN
        LOAIPHONG AS LP ON P.MaLP = LP.MaLP
    JOIN
        NGUOIDUNG AS ND_KH ON DP.MaND_KhachHang = ND_KH.MaND 
    JOIN
        NGUOIDUNG AS ND_NV ON DP.MaND_NhanVien = ND_NV.MaND   
    WHERE
        GETDATE() BETWEEN DP.NgayNhan AND DP.NgayTra;
        `);
    return res.recordset;
}

export async function fetchDichVu(): Promise<DICHVU[]> {
    const res = await pool.request().query<DICHVU[]>(`SELECT *
    FROM DICHVU;`);
    return res.recordset;
}

interface ThongKe {
    Nam: number;
    Thang: number;
    SoLuong: number;
}
export async function fetchDatPhongTheoThang(): Promise<ThongKe[]> {
    const res = await pool.request().query<ThongKe[]>(`SELECT 
        YEAR(NgayDat) AS Nam,
        MONTH(NgayDat) AS Thang,
        COUNT(*) AS SoLuong
    FROM DATPHONG
    GROUP BY YEAR(NgayDat), MONTH(NgayDat)
    ORDER BY Nam, Thang;
`);
    return res.recordset;
}

export async function fetchDichVuTheoThang(): Promise<ThongKe[]> {
    const res = await pool.request().query<ThongKe[]>(`SELECT 
        YEAR(NSD) AS Nam,
        MONTH(NSD) AS Thang,
        COUNT(*) AS SoLuong
    FROM SDDICHVU
    GROUP BY YEAR(NSD), MONTH(NSD)
    ORDER BY Nam, Thang;`);
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
        .input("Nam", sql.Int, new Date().getFullYear()).query<{
        Thang: number;
        Nam: number;
        DoanhSo: number;
    }>(`SELECT month(NgayDat) as Thang, year(NgayDat) as Nam,  SUM(TongTien) as DoanhSo
            FROM DATPHONG
            WHERE MONTH(NgayDat) = @Thang and YEAR(NgayDat) = @Nam
            group by month(NgayDat), year(NgayDat)`);

    return res.recordset[0];
}

export async function fetchSoLuotDatPhong() {
    const res = await pool
        .request()
        .input("Thang", sql.Int, new Date().getMonth() + 1)
        .input("Nam", sql.Int, new Date().getFullYear()).query<{
        Thang: number;
        Nam: number;
        SoLuotDatPhong: number;
    }>(`SELECT month(NgayDat) as Thang, year(NgayDat) as Nam,  COUNT(*) as SoLuotDatPhong
            FROM DATPHONG
            WHERE MONTH(NgayDat) = @Thang and YEAR(NgayDat) = @Nam
            group by month(NgayDat), year(NgayDat)`);

    return res.recordset[0];
}

export async function fetchSoLuotSDDV() {
    const res = await pool
        .request()
        .input("Thang", sql.Int, new Date().getMonth() + 1)
        .input("Nam", sql.Int, new Date().getFullYear()).query<{
        Thang: number;
        Nam: number;
        SoLuongSDDV: number;
    }>(`select month(NSD) as Thang, year(NSD) as Nam, count(*) as SoLuongSDDV
        from SDDICHVU
        WHERE MONTH(NSD) = @Thang and YEAR(NSD) = @Nam
        group by month(NSD), year(NSD)`);

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
    const res = await pool.request().input("TinhTrang", NVarChar(50), status)
        .query(`SELECT
        LP.TenLP AS N'TenLP',
        COUNT(P.MaPhong) AS N'SoLuong'
        FROM
            PHONG AS P
        INNER JOIN
            LOAIPHONG AS LP ON P.MaLP = LP.MaLP
        WHERE
            P.TinhTrang = @TinhTrang
        GROUP BY
            LP.TenLP;`);
    return res.recordset;
}

export async function fetchDoanThuThang() {
    const res = await pool.request().query(`
        SELECT MONTH(NgayDat) AS Thang, YEAR(NgayDat) AS Nam, SUM(TongTien) AS DoanhThu
        FROM DATPHONG
        WHERE MONTH(NgayDat) = MONTH(GETDATE()) AND YEAR(NgayDat) = YEAR(GETDATE())
        GROUP BY YEAR(NgayDat), MONTH(NgayDat);`);

    return res.recordset[0]?.DoanhThu || 0;
}

// export async function 