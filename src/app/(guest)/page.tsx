import React from "react";
import { fetchLoaiPhong } from "@/lib/data";
import { LoaiPhong } from "@/components/loai-phong";

const Page = async () => {
    const data = await fetchLoaiPhong("available");

    return (
        <div className="w-full flex justify-center mt-4">
            <div className="w-4/5 grid grid-cols-3 gap-5">
                {data.map((item) => (
                    <LoaiPhong
                        key={item.TenLP}
                        src={`/${item.TenLP}.jpg`}
                        alt={item.TenLP}
                        label={`${
                            item.TenLP.slice(0, 1).toUpperCase() +
                            item.TenLP.slice(1)
                        } Room`}
                        available={item.SoLuong}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
