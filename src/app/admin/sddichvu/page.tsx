import React from "react";
import DangKyDichVu from "./form-dichvu";
import { DichVu } from "@/types";

const getMaDP = async (): Promise<string[]> => {
    return [
        "DP001",
        "DP002",
        "DP003",
        "DP004",
        "DP005",
        "DP006",
        "DP007",
        "DP008",
        "DP009",
        "DP010",
        "DP011",
        "DP012",
        "DP013",
        "DP014",
        "DP015",
        "DP016",
        "DP017",
        "DP018",
        "DP019",
        "DP020",
    ];
};

const getDichVu = async (): Promise<DichVu[]> => {
    return [
        { MaDV: "DV001", TenDV: "Khám tổng quát", DonGia: 300000 },
        { MaDV: "DV002", TenDV: "Xét nghiệm máu", DonGia: 150000 },
        { MaDV: "DV003", TenDV: "Chụp X-quang", DonGia: 200000 },
        { MaDV: "DV004", TenDV: "Siêu âm bụng", DonGia: 250000 },
        { MaDV: "DV005", TenDV: "Đo điện tim (ECG)", DonGia: 180000 },
        { MaDV: "DV006", TenDV: "Khám mắt", DonGia: 120000 },
        { MaDV: "DV007", TenDV: "Khám tai mũi họng", DonGia: 130000 },
        { MaDV: "DV008", TenDV: "Khám da liễu", DonGia: 140000 },
        { MaDV: "DV009", TenDV: "Nội soi dạ dày", DonGia: 600000 },
        { MaDV: "DV010", TenDV: "Tư vấn dinh dưỡng", DonGia: 100000 },
    ];
};

const Page = async () => {
    // query madp, dichvu
    const madp = await getMaDP();
    const dichVu = await getDichVu();
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="text-2xl font-bold">Đăng ký dịch vụ</div>
            <DangKyDichVu maDP={madp} dichVu={dichVu} />
        </div>
    );
};

export default Page;
