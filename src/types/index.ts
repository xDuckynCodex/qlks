// Enums
export enum TenLP {
    single = "single",
    double = "double",
    suite = "suite",
    family = "family",
    vip = "vip",
}

export enum RoomStatus {
    available = "available",
    reserved = "reserved",
    occupied = "occupied",
    cleaning = "cleaning",
    maintenance = "maintenance",
}

export enum UserRole {
    customer = "customer",
    receptionist = "receptionist",
    housekeeper = "housekeeper",
    serviceManager = "serviceManager",
    administrator = "administrator",
}

// Interfaces
export interface NGUOIDUNG {
    MaND: string;
    HoTen: string;
    SDT: string;
    CCCD: string;
    Email: string;
    DiaChi: string;
    ChucVu: UserRole;
    MatKhau?: string; // Optional, as it may not be needed in all contexts
}

export interface LOAIPHONG {
    MaLP: string;
    TenLP: TenLP;
    Gia: number; // money type in DB usually maps to number in TS
}

export interface PHONG {
    MaPhong: string;
    MaLP: string;
    TinhTrang: RoomStatus;
}

export interface DATPHONG {
    MaDP: string;
    MaND_KhachHang: string;
    MaND_NhanVien: string;
    MaPhong: string;
    NgayDat: Date | string; // date type in DB maps to Date object in TS
    NgayNhan: Date | string;
    NgayTra: Date | string;
    TongTien: number; // money type in DB usually maps to number in TS
    TienCoc: number; // money type in DB usually maps to number in TS
}

export interface DICHVU {
    MaDV: string;
    TenDV: string;
    DonGia: number; // money type in DB usually maps to number in TS
}

export interface SDDDICHVU {
    MaDP: string;
    MaDV: string;
    SoLuong: number;
    NSD: Date | string; // date type in DB maps to Date object in TS
    DonViTinh: string;
}
