import React, { Suspense } from "react";
import KhachHangDatPhongForm, { NgayDaDuocDat } from "./form-datphong";
import { fetchNgayDaDuocDatTheoLoaiPhong } from "@/lib/data";
import { TenLP } from "@/types";

const Page = async ({
    searchParams,
}: {
    searchParams: { type: keyof typeof TenLP };
}) => {
    const { type } = await searchParams;
    const reservedDates: NgayDaDuocDat = await fetchNgayDaDuocDatTheoLoaiPhong(
        TenLP[type]
    );
    return (
        <div className="w-full flex justify-center">
            <KhachHangDatPhongForm
                roomType={type}
                reservedDates={reservedDates}
            />
        </div>
    );
};

export default Page;
