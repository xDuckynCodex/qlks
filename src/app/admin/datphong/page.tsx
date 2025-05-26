import { fetchPhong } from "@/lib/data";
import { ThongKePhong, columns } from "./columns";
import { DataTable } from "./data-table";

export default async function Page() {
    const data = await fetchPhong();

    return (
        <div className="container mx-auto">
            <DataTable<ThongKePhong, unknown> columns={columns} data={data} />
        </div>
    );
}
