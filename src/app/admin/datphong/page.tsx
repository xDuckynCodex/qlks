import { fetchThongTinPhong } from "@/lib/data";
import { ThongTinPhong, columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
    const data = await fetchThongTinPhong();

    return (
        <div className="container mx-auto">
            <DataTable<ThongTinPhong, unknown> columns={columns} data={data} />
        </div>
    );
}
