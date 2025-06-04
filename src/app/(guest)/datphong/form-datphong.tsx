"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePickerWithRange } from "../../../components/range-date-picker";
import { useToast } from "@/hooks/use-toast";
import { datPhongQuaKhachHang } from "@/lib/actions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const loaiPhong = ["single", "double", "suite", "family", "vip"];

const khachHangDatPhongSchema = z.object({
    HoTen: z.string().min(1, "Họ tên không được để trống"),
    TenLP: z.string().min(1, "Loại phòng không được để trống"),
    SDT: z
        .string()
        .regex(/^[0-9]+$/, "SDT chỉ được chứa các ký tự số từ 0-9")
        .length(10, "SĐT không được để trống"),
    CCCD: z
        .string()
        .regex(/^[0-9]+$/, "CCCD chỉ được chứa các ký tự số từ 0-9")
        .length(12, "CCCD không được để trống"),
    Email: z.string().email("Email không hợp lệ"),
    date: z.object({
        from: z.date(),
        to: z.date(),
    }),
});

export type KhachHangDatPhongType = z.infer<typeof khachHangDatPhongSchema>;
// type LoaiPhong = "single" | "double" | "suite" | "family" | "vip";

export type NgayDaDuocDat = {
    Ngay: Date;
}[];

interface DatPhongFormProps {
    roomType: string;
    reservedDates: NgayDaDuocDat;
}

const KhachHangDatPhongForm = ({
    roomType,
    reservedDates,
}: DatPhongFormProps) => {
    const { data: session } = useSession();
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<KhachHangDatPhongType>({
        resolver: zodResolver(khachHangDatPhongSchema),
        defaultValues: {
            HoTen: session?.user.name || "",
            TenLP: roomType,
            SDT: session?.user.sdt || "",
            CCCD: session?.user.cccd || "",
            Email: session?.user.email || "",
            date: {
                from: new Date(),
                to: addDays(new Date(), 3),
            },
        },
    });

    const onSubmit = async (data: KhachHangDatPhongType) => {
        try {
            console.log("Booking data:", data);
            // Handle booking logic here
            const res = await datPhongQuaKhachHang(data);

            toast({
                title: "Đã đặt phòng thành công",
                description: `Mã đặt phòng ${res.MaDP}`,
            });
            router.push(`/datphong/ketqua?status=success&ma_dp=${res.MaDP}`);
        } catch (e) {
            router.push("/datphong/ketqua?status=fail");
        }
    };
    return (
        <div className="w-4/5 mt-3 p-2 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold mb-4">Đặt phòng</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col space-y-4">
                        <FormField
                            control={form.control}
                            name="HoTen"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium">
                                        HoTen
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="SDT"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium">
                                        SDT
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="CCCD"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium">
                                        CCCD
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="TenLP"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-medium">
                                        Loại phòng
                                    </FormLabel>
                                    <Select
                                        onValueChange={(e) => {
                                            field.onChange(e);
                                            router.push(`/datphong?type=${e}`);
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn loại phòng" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {loaiPhong.map((lp) => (
                                                <SelectItem key={lp} value={lp}>
                                                    {lp
                                                        .slice(0, 1)
                                                        .toUpperCase() +
                                                        lp.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={(field) => (
                                <FormItem>
                                    <FormLabel>Thời gian lưu trú</FormLabel>
                                    <FormControl>
                                        <DatePickerWithRange
                                            reservedDates={reservedDates}
                                            field={field.field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant="default">
                            Đặt Phòng
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default KhachHangDatPhongForm;
