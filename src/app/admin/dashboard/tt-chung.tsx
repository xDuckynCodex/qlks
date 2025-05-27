import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface BaoCaoChungProps {
    icon: React.ReactNode;
    value: number;
    title: string;
}
const BaoCaoChung = ({ value, icon, title }: BaoCaoChungProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {title === "Doanh thu"
                    ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                      }).format(value)
                    : value}
            </CardContent>
        </Card>
    );
};

export default BaoCaoChung;
