import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface BaoCaoChungProps {
    icon: React.ReactNode;
    value: number;
    title: string;
}
const BaoCaoChung = ({ value, icon, title }: BaoCaoChungProps) => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon} {title}
                </CardTitle>
            </CardHeader>
            <CardContent>{value}</CardContent>
        </Card>
    );
};

export default BaoCaoChung;
