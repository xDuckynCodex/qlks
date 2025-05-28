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

const loaiPhong = ["single", "double", "suite", "family", "vip"];

const khachHangDatPhongSchema = z.object({
    HoTen: z.string().min(1, "Mã phòng không được để trống"),
    TenLP: z.string().min(1, "Mã phòng không được để trống"),
    SDT: z.coerce.string().length(10, "Ngày đặt không được để trống"),
    CCCD: z.string().length(12, "Ngày nhận không được để trống"),
    Email: z.string().email("Email không hợp lệ"),
    date: z.object({
        from: z.date(),
        to: z.date(),
    }),
});

export type KhachHangDatPhongType = z.infer<typeof khachHangDatPhongSchema>;
// type LoaiPhong = "single" | "double" | "suite" | "family" | "vip";

interface DatPhongFormProps {
    roomType: string;
}

const KhachHangDatPhongForm = ({ roomType }: DatPhongFormProps) => {
    const { toast } = useToast();

    const form = useForm<KhachHangDatPhongType>({
        resolver: zodResolver(khachHangDatPhongSchema),
        defaultValues: {
            HoTen: "",
            TenLP: roomType,
            SDT: "",
            CCCD: "",
            Email: "",
            date: {
                from: new Date(),
                to: addDays(new Date(), 3),
            },
        },
    });

    const onSubmit = async (data: KhachHangDatPhongType) => {
        console.log("Booking data:", data);
        // Handle booking logic here

        const res = await datPhongQuaKhachHang(data);

        toast({
            title: "Đã đặt phòng thành công",
            description: `Mã đặt phòng ${res.MaDP}`,
        });
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
                                        onValueChange={field.onChange}
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
