import React from "react";
import FormSDDichVu from "./form-sddichvu";
import { fetchDichVu } from "@/lib/data";

const Page = async () => {
    const res = await fetchDichVu();
    const servicesList = res.map((s) => {
        return {
            label: s.TenDV,
            value: s.MaDV,
        };
    });
    return (
        <div className="w-4/5 m-auto flex justify-center">
            <FormSDDichVu Ids={servicesList} />
        </div>
    );
};

export default Page;
