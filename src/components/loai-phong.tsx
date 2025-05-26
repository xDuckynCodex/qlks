import * as React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LoaiPhongProps {
    src: string;
    alt: string;
    label: string;
    available: number;
}

export function LoaiPhong({ src, alt, label, available }: LoaiPhongProps) {
    return (
        <Card className="w-full">
            <CardContent>
                <Image
                    src={src}
                    alt={alt}
                    className="w-full aspect-auto rounded-lg"
                    width={200}
                    height={200}
                />
            </CardContent>
            <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardDescription className="flex flex-col space-y-2">
                    <p className="text-justify ">
                        Phòng khách sạn Single tiện nghi, thiết kế hiện đại, phù
                        hợp cho một khách lưu trú với giường đơn êm ái và không
                        gian riêng tư thoải mái.
                    </p>
                    <p>{`Available: ${available}`}</p>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button variant="link" className="w-full">
                    <Link href={`/datphong?type=${alt}`}>Book Now</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
