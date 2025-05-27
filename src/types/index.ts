export interface KhachHang {
    MaKH: string;
    HoTen: string;
    CCCD: string;
    SDT: string;
    Email: string;
    DiaChi: string;
    Hang: string;
}

export interface KhuyenMai {
    MaKM: string;
    TiLe: number;
    NgayBD: string; // date
    NgayKT: string; // date
    MaKH: string;
}

export interface Phong {
    MaPhong: string;
    MaLP: string;
    GiaPhong: number;
    TinhTrang: string;
}

export interface LoaiPhong {
    MaLP: string;
    TenLP: string;
    Gia: number;
}

export interface DatPhong {
    MaDP: string;
    MaKH: string;
    MaNV: string;
    MaPhong: string;
    NgayDat: string | Date; // date
    NgayNhan: string | Date; // date
    NgayTra: string | Date; // date
    TongTien: number;
    TienCoc: number;
}

export interface NhanVien {
    MaNV: string;
    HoTen: string;
    ChucVu: string;
    SDT: string;
}

export interface HoaDon {
    MaHD: string;
    MaDP: string;
    MaNV: string;
    NgayLap: string; // date
    TongTien: number;
}

export interface SuDungDichVu {
    MaDP: string;
    MaDV: string;
    SoLuong: number;
    NSD: string; // date
    DonViTinh: string;
}

export interface DichVu {
    MaDV: string;
    TenDV: string;
    DonGia: number;
}