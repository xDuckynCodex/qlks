import React from "react";
import BaoCaoChung from "./tt-chung";
import { DollarSign } from "lucide-react";
import { Component } from "./revenue-chart";

const baoCao = [1, 2, 3, 4];

const Page = () => {
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

                <Component />
            </div>
        </div>
    );
};

export default Page;
