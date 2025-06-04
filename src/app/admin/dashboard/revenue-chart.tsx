"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    bookings: {
        label: "Total Bookings",
        color: "#2563eb",
    },
    services: {
        label: "Service Usages",
        color: "#60a5fa",
    },
} satisfies ChartConfig;

interface ChartProp {
    data: {
        time: string;
        bookings: number;
        services: number;
    }[];
}

export function Chart({ data }: ChartProp) {
    return (
        <ChartContainer
            config={chartConfig}
            className="min-h-[200px] max-h-[550px] w-full"
        >
            <BarChart accessibilityLayer data={data}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="time"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={true}
                />
                <YAxis tickLine={false} tickMargin={10} axisLine={true} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                    dataKey="bookings"
                    fill="var(--color-bookings)"
                    radius={4}
                />
                <Bar
                    dataKey="services"
                    fill="var(--color-services)"
                    radius={4}
                />
            </BarChart>
        </ChartContainer>
    );
}
