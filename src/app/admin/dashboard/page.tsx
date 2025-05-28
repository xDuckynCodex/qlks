import React from "react";
import BaoCaoChung from "./tt-chung";
import { DollarSign } from "lucide-react";
import { BieuDo } from "./revenue-chart";
import { fetchBieuDo, fetchDoanThuThang } from "@/lib/data";
import { format } from "date-fns";
import { auth } from "@/auth";

const Page = async () => {
    const session = await auth();
    console.log(session);

    const chartData = await fetchBieuDo();
    const doanhThuThang = await fetchDoanThuThang();
    const baoCao: { title: string; value: number }[] = [
        {
            title: "Doanh thu tháng",
            value: doanhThuThang,
        },
        {
            title: "Số lượng đặt phòng",
            value:
                chartData.filter(
                    (item) => item.time === format(new Date(), "yyyy-MM")
                )[0]?.bookings || 0,
        },
        {
            title: "Số lượng sử dụng dịch vụ",
            value:
                chartData.filter(
                    (item) => item.time === format(new Date(), "yyyy-MM")
                )[0]?.services || 0,
        },
    ];

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
                        title={item.title}
                        format={item.title === "Doanh thu tháng"}
                    />
                ))}
            </div>
            <div className="w-4/5 mx-auto space-y-2">
                <p className="text-2xl font-bold">Biểu đồ</p>

                <BieuDo data={chartData} />
            </div>
        </div>
    );
};

export default Page;
