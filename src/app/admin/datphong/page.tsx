import { fetchThongTinDatPhong } from "@/lib/data";
import { ThongTinDatPhong, columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
    const data = await fetchThongTinDatPhong();
    return (
        <div className="container mx-auto">
            <DataTable<ThongTinDatPhong, unknown>
                columns={columns}
                data={data}
            />
        </div>
    );
}
