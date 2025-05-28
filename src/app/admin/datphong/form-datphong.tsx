"use client";

import { NgayDaDuocDat } from "@/app/(guest)/datphong/form-datphong";
import { DatePickerWithRange } from "@/components/range-date-picker";
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
import { useToast } from "@/hooks/use-toast";
import { datPhongQuaNhanVien } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormDatPhongSchema = z.object({
    MaPhong: z.string().min(1, "Mã phòng không được để trống"),
    HoTen: z.string().min(1, "Mã phòng không được để trống"),
    SDT: z.coerce.string().length(10, "Ngày đặt không được để trống"),
    CCCD: z.string().length(12, "Ngày nhận không được để trống"),
    Email: z.string().email("Email không hợp lệ"),
    date: z.object({
        from: z.date(),
        to: z.date(),
    }),
});

export type FormDatPhongSchemaType = z.infer<typeof FormDatPhongSchema>;

interface FormDatPhongProps {
    maPhong: string;
    reservedDates: NgayDaDuocDat;
}

const FormDatPhong = ({ maPhong, reservedDates }: FormDatPhongProps) => {
    const { toast } = useToast();
    const form = useForm<FormDatPhongSchemaType>({
        resolver: zodResolver(FormDatPhongSchema),
        defaultValues: {
            MaPhong: maPhong,
            HoTen: "",
            SDT: "",
            CCCD: "",
            Email: "",
            date: {
                from: new Date(),
                to: addDays(new Date(), 0),
            },
        },
    });

    const onSubmit = async (data: FormDatPhongSchemaType) => {
        console.log("Form submitted with data:", data);
        // Handle form submission logic here
        const res = await datPhongQuaNhanVien(data);

        toast({
            title: res ? "Đặt phòng thành công" : "Đặt phòng thất bại",
            description: `Mã phòng: ${data.MaPhong}, Tên khách hàng: ${data.HoTen}`,
        });
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                </form>
            </Form>
        </div>
    );
};

export default FormDatPhong;
