import React from "react";
import { Chart } from "./revenue-chart";
import { fetchBieuDo } from "@/lib/data";

const BieuDo = async () => {
    const chartData = await fetchBieuDo();

    return <Chart data={chartData} />;
};

export default BieuDo;
