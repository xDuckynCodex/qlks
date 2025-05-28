import React from "react";
import KhachHangDatPhongForm from "./form-datphong";

const Page = async ({ searchParams }: { searchParams: { type: string } }) => {
    const { type } = await searchParams;

    return (
        <div className="w-full flex justify-center">
            <KhachHangDatPhongForm roomType={type} />
        </div>
    );
};

export default Page;
