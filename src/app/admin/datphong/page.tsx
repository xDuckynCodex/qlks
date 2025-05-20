import { Phong, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Phong[]> {
    // Fetch data from your API here.
    return [
        {
            MaPhong: "P101",
            LoaiPhong: "single",
            GiaPhong: 500000,
            TinhTrang: "available",
        },
        {
            MaPhong: "P102",
            LoaiPhong: "double",
            GiaPhong: 700000,
            TinhTrang: "booked",
        },
        {
            MaPhong: "P103",
            LoaiPhong: "suite",
            GiaPhong: 1200000,
            TinhTrang: "checked_in",
        },
        {
            MaPhong: "P104",
            LoaiPhong: "family",
            GiaPhong: 900000,
            TinhTrang: "available",
        },
        {
            MaPhong: "P105",
            LoaiPhong: "deluxe",
            GiaPhong: 1000000,
            TinhTrang: "maintenance",
        },
        {
            MaPhong: "P106",
            LoaiPhong: "presidential",
            GiaPhong: 2500000,
            TinhTrang: "booked",
        },
        {
            MaPhong: "P107",
            LoaiPhong: "single",
            GiaPhong: 550000,
            TinhTrang: "available",
        },
        {
            MaPhong: "P108",
            LoaiPhong: "double",
            GiaPhong: 750000,
            TinhTrang: "checked_out",
        },
        {
            MaPhong: "P109",
            LoaiPhong: "suite",
            GiaPhong: 1300000,
            TinhTrang: "checked_in",
        },
        {
            MaPhong: "P110",
            LoaiPhong: "family",
            GiaPhong: 950000,
            TinhTrang: "booked",
        },
        {
            MaPhong: "P111",
            LoaiPhong: "deluxe",
            GiaPhong: 1100000,
            TinhTrang: "available",
        },
        {
            MaPhong: "P112",
            LoaiPhong: "presidential",
            GiaPhong: 2600000,
            TinhTrang: "checked_out",
        },
        {
            MaPhong: "P113",
            LoaiPhong: "single",
            GiaPhong: 600000,
            TinhTrang: "maintenance",
        },
        {
            MaPhong: "P114",
            LoaiPhong: "double",
            GiaPhong: 800000,
            TinhTrang: "available",
        },
        {
            MaPhong: "P115",
            LoaiPhong: "suite",
            GiaPhong: 1250000,
            TinhTrang: "booked",
        },
        {
            MaPhong: "P116",
            LoaiPhong: "family",
            GiaPhong: 970000,
            TinhTrang: "checked_in",
        },
        {
            MaPhong: "P117",
            LoaiPhong: "deluxe",
            GiaPhong: 1050000,
            TinhTrang: "checked_out",
        },
        {
            MaPhong: "P118",
            LoaiPhong: "presidential",
            GiaPhong: 2700000,
            TinhTrang: "booked",
        },
        {
            MaPhong: "P119",
            LoaiPhong: "single",
            GiaPhong: 520000,
            TinhTrang: "available",
        },
        {
            MaPhong: "P120",
            LoaiPhong: "double",
            GiaPhong: 720000,
            TinhTrang: "checked_in",
        },
    ];
}

export default async function Page() {
    const data = await getData();

    return (
        <div className="container mx-auto">
            <DataTable<Phong, unknown> columns={columns} data={data} />
        </div>
    );
}
