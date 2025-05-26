import React from "react";
import DangKyDichVu from "./form-dichvu";
import { fetchDichVu, fetchPhongDangSD } from "@/lib/data";

const Page = async () => {
    // query madp, dichvu
    const DP = await fetchPhongDangSD();
    const madp = DP.map((item) => item.MaDP);
    const dichVu = await fetchDichVu();

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="text-2xl font-bold">Đăng ký dịch vụ</div>
            <DangKyDichVu maDP={madp} dichVu={dichVu} />
        </div>
    );
};

export default Page;
