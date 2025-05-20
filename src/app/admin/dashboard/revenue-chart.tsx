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

const chartData = [
    { month: "January", bookings: 186, serviceUsages: 80 },
    { month: "February", bookings: 305, serviceUsages: 200 },
    { month: "March", bookings: 237, serviceUsages: 120 },
    { month: "April", bookings: 73, serviceUsages: 190 },
    { month: "May", bookings: 209, serviceUsages: 130 },
    { month: "June", bookings: 214, serviceUsages: 140 },
    { month: "July", bookings: 214, serviceUsages: 140 },
    { month: "August", bookings: 214, serviceUsages: 140 },
    { month: "September", bookings: 214, serviceUsages: 140 },
    { month: "October", bookings: 214, serviceUsages: 140 },
    { month: "November", bookings: 214, serviceUsages: 140 },
    { month: "December", bookings: 214, serviceUsages: 140 },
];

const chartConfig = {
    bookings: {
        label: "Total Bookings",
        color: "#2563eb",
    },
    serviceUsages: {
        label: "Service Usages",
        color: "#60a5fa",
    },
} satisfies ChartConfig;

export function Component() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={true}
                    tickFormatter={(value) => value.slice(0, 3)}
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
                    dataKey="serviceUsages"
                    fill="var(--color-serviceUsages)"
                    radius={4}
                />
            </BarChart>
        </ChartContainer>
    );
}
