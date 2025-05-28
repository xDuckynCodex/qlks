"use client";

import { ColumnDef } from "@tanstack/react-table";

import ActionsMenu from "./actions-menu";
import ClientDate from "./client-date";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ThongTinPhong = {
    MaPhong: string;
    TenLP: "single" | "double" | "suite" | "family" | "vip";
    Gia: number;
    TinhTrang: statusType;
    NgayDat: string;
    NgayNhan: string;
    NgayTra: string;
};

type statusType =
    | "maintenance"
    | "cleaning"
    | "occupied"
    | "available"
    | "reserved";

// Dinh nghia cac cot cua bang
export const columns: ColumnDef<ThongTinPhong>[] = [
    {
        id: "No.",
        header: () => <div className="text-center">No.</div>,
        cell: ({ row }) => {
            const index = row.index + 1;
            return <div className="text-center">{index}</div>;
        },
    },
    {
        accessorKey: "MaPhong",
        header: () => <div className="text-center">Room ID</div>,
        cell: ({ row }) => {
            const roomId: ThongTinPhong["MaPhong"] = row.getValue("MaPhong");
            return <div className="text-center">{roomId}</div>;
        },
    },
    {
        accessorKey: "TenLP",
        header: () => <div className="text-center">Room Type</div>,
        cell: ({ row }) => {
            const roomType: ThongTinPhong["TenLP"] = row.getValue("TenLP");

            return <div className="text-center">{roomType}</div>;
        },
    },
    {
        accessorKey: "Gia",
        header: () => <div className="text-center">Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("Gia"));
            const formatted = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(amount);

            return <div className="text-center">{formatted}</div>;
        },
    },
    {
        accessorKey: "TinhTrang",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const status: statusType = row.getValue("TinhTrang");
            return <div className="text-center">{status}</div>;
        },
    },
    {
        accessorKey: "NgayDat",
        header: () => <div className="text-center">Booking Time</div>,
        cell: ({ row }) => {
            const bookingTime: string = row.getValue("NgayDat");
            return <ClientDate time={bookingTime} />;
        },
    },
    {
        accessorKey: "NgayNhan",
        header: () => <div className="text-center">Check-in Time</div>,
        cell: ({ row }) => {
            const checkInTime: string = row.getValue("NgayNhan");
            return <ClientDate time={checkInTime} />;
        },
    },
    {
        accessorKey: "NgayTra",
        header: () => <div className="text-center">Check-out Time</div>,
        cell: ({ row }) => {
            const checkOutTime: string = row.getValue("NgayTra");
            return <ClientDate time={checkOutTime} />;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const phong = row.original;
            return <ActionsMenu phong={phong} />;
        },
    },
];
