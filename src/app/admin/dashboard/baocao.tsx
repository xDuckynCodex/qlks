import React from "react";
import BaoCaoChung from "./tt-chung";
import { fetchBieuDo, fetchDoanThuThang } from "@/lib/data";
import { format } from "date-fns";
import { DollarSign } from "lucide-react";

const BaoCao = async () => {
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
    return (
        <div className="w-full grid grid-cols-4 gap-4">
            {baoCao.map((item, index) => (
                <BaoCaoChung
                    key={index}
                    value={item.value}
                    icon={<DollarSign />}
                    title={item.title}
                    format={item.title === "Doanh thu tháng"}
                />
            ))}
        </div>
    );
};

export default BaoCao;
