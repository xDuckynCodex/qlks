import React from "react";
import BaoCaoChung from "./tt-chung";
import { DollarSign } from "lucide-react";
import { BieuDo } from "./revenue-chart";
import { fetchBieuDo } from "@/lib/data";

const baoCao = [1, 2, 3, 4];

const Page = async () => {
    const data = await fetchBieuDo();

    return (
        <div className="flex flex-col w-full space-y-4">
            <p className="text-2xl font-bold">Dashboard</p>
            <div className="w-full grid grid-cols-4 gap-4">
                {baoCao.map((item, index) => (
                    <BaoCaoChung
                        key={index}
                        value={1000}
                        icon={<DollarSign />}
                        title="Revenue"
                    />
                ))}
            </div>
            <div className="w-4/5 mx-auto space-y-2">
                <p className="text-2xl font-bold">Biểu đồ</p>

                <BieuDo data={data} />
            </div>
        </div>
    );
};

export default Page;
