import React from "react";
import BaoCaoChung from "./tt-chung";
import { DollarSign } from "lucide-react";
import { BieuDo } from "./revenue-chart";
import { fetchBaoCao, fetchBieuDo } from "@/lib/data";

const Page = async () => {
    const dataBieuDo = await fetchBieuDo();
    const dataBaoCao = await fetchBaoCao();

    // const dataBaoCao = await
    return (
        <div className="flex flex-col w-full space-y-4">
            <p className="text-2xl font-bold">Dashboard</p>
            <div className="w-full grid grid-cols-4 gap-4">
                {dataBaoCao.map((item, index) => (
                    <BaoCaoChung
                        key={index}
                        value={item.value}
                        icon={<DollarSign />}
                        title={item.label}
                    />
                ))}
            </div>
            <div className="w-4/5 mx-auto space-y-2">
                <p className="text-2xl font-bold">Biểu đồ</p>

                <BieuDo data={dataBieuDo} />
            </div>
        </div>
    );
};

export default Page;
