import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface BaoCaoChungProps {
    icon: React.ReactNode;
    value: number;
    title: string;
    format?: boolean;
}
const BaoCaoChung = ({
    value,
    icon,
    title,
    format = false,
}: BaoCaoChungProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {format
                    ? new Intl.NumberFormat("vi-vn", {
                          currency: "VND",
                          style: "currency",
                      }).format(value)
                    : value}
            </CardContent>
        </Card>
    );
};

export default BaoCaoChung;
