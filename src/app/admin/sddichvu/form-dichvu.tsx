"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TimMaDP } from "./tim-madp";
import { DichVu } from "@/types";
import { toast } from "@/hooks/use-toast";
import { insertSDDV } from "@/lib/actions";

const formSchema = z.object({
    MaDP: z.string().min(1, { message: "Mã đặt phòng không được để trống" }),
    MaDV: z.string().min(1, { message: "Mã dịch vụ không được để trống" }),
    SoLuong: z.coerce
        .number()
        .int()
        .min(1, { message: "Số lượng không được để trống" }),
    NSD: z
        .date()
        .min(new Date(), { message: "Ngày sử dụng không được để trống" }),
});

export type SDDVFormData = z.infer<typeof formSchema>;

interface IDangKyDichVu {
    maDP: string[];
    dichVu: DichVu[];
}
const DangKyDichVu = ({ maDP, dichVu }: IDangKyDichVu) => {
    const DPIds = maDP.map((item) => ({
        value: item,
        label: item,
    }));

    const DVIds = dichVu.map((item) => ({
        value: item.MaDV,
        label: item.TenDV,
    }));

    const form = useForm<SDDVFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            MaDP: "",
            MaDV: "",
            SoLuong: 1,
            NSD: new Date(),
        },
    });

    const onSubmit = async (data: SDDVFormData) => {
        // Handle form submission
        // server action
        const res = await insertSDDV(data);

        console.log(data);
        toast({
            title: "Đăng ký dịch vụ thành công",
            description: `Đã đăng ký dịch vụ ${res.recordset[0].MaDV} cho mã đặt phòng ${res.recordset[0].MaDP}`,
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col justify-end space-y-4"
            >
                <div className="flex gap-4">
                    <TimMaDP<SDDVFormData>
                        name={`MaDP`}
                        label="Ma Dat phong"
                        form={form}
                        Ids={DPIds}
                    />
                    <TimMaDP<SDDVFormData>
                        name={`MaDV`}
                        label="Ma Dich vu"
                        form={form}
                        Ids={DVIds}
                    />
                    <FormField
                        control={form.control}
                        name="SoLuong"
                        render={({ field }) => (
                            <FormItem className="w-60">
                                <FormLabel>Số lượng</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        min={1}
                                        type="number"
                                        placeholder="Nhập số lượng..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button type="submit" className=" w-60">
                        Đăng ký
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default DangKyDichVu;
