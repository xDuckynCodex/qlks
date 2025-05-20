"use client";

import { ColumnDef } from "@tanstack/react-table";

import ActionsMenu from "./actions-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Phong = {
    MaPhong: string;
    LoaiPhong:
        | "single"
        | "double"
        | "suite"
        | "family"
        | "deluxe"
        | "presidential";
    GiaPhong: number;
    TinhTrang: statusType;
    NgayDat: string;
    NgayNhan: string;
    NgayTra: string;
};

type statusType =
    | "available"
    | "booked"
    | "maintenance"
    | "checked_out"
    | "checked_in";

// Dinh nghia cac cot cua bang
export const columns: ColumnDef<Phong>[] = [
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
            const roomId: Phong["MaPhong"] = row.getValue("MaPhong");
            return <div className="text-center">{roomId}</div>;
        },
    },
    {
        accessorKey: "LoaiPhong",
        header: () => <div className="text-center">Room Type</div>,
        cell: ({ row }) => {
            const roomType: Phong["LoaiPhong"] = row.getValue("LoaiPhong");
            const roomTypeMap: Record<string, string> = {
                single: "Single",
                double: "Double",
                suite: "Suite",
                family: "Family",
                deluxe: "Deluxe",
                presidential: "Presidential",
            };

            return <div className="text-center">{roomTypeMap[roomType]}</div>;
        },
    },
    {
        accessorKey: "GiaPhong",
        header: () => <div className="text-center">Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("GiaPhong"));
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
            const statusMap: Record<string, string> = {
                available: "Available",
                booked: "Booked",
                maintenance: "Maintenance",
                checked_out: "Checked Out",
                checked_in: "Checked In",
            };

            return <div className="text-center">{statusMap[status]}</div>;
        },
    },
    {
        accessorKey: "NgayDat",
        header: () => <div className="text-center">Booking Time</div>,
        cell: ({ row }) => {
            const bookingTime: string = row.getValue("NgayDat");
            return (
                <div className="text-center">
                    {bookingTime
                        ? new Date(bookingTime).toLocaleString("vi-VN")
                        : "-"}
                </div>
            );
        },
    },
    {
        accessorKey: "NgayNhan",
        header: () => <div className="text-center">Check-out Time</div>,
        cell: ({ row }) => {
            const checkInTime: string = row.getValue("NgayNhan");
            return (
                <div className="text-center">
                    {checkInTime
                        ? new Date(checkInTime).toLocaleString("vi-VN")
                        : "-"}
                </div>
            );
        },
    },
    {
        accessorKey: "NgayTra",
        header: () => <div className="text-center">Check-out Time</div>,
        cell: ({ row }) => {
            const checkOutTime: string = row.getValue("NgayTra");
            return (
                <div className="text-center">
                    {checkOutTime
                        ? new Date(checkOutTime).toLocaleString("vi-VN")
                        : "-"}
                </div>
            );
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
