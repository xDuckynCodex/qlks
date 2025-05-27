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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePickerWithRange } from "./range-date-picker";
import { useToast } from "@/hooks/use-toast";
import { insertDatPhong } from "@/lib/actions";

const bookingSchema = z.object({
    roomType: z.string().min(1, "Room type is required"),
    date: z.object({
        from: z.date(),
        to: z.date(),
    }),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    cccd: z.string().min(12, "CCCD is required"),
    phone: z.string().min(10, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
// type LoaiPhong = "single" | "double" | "suite" | "family" | "vip";

const loaiPhong = ["single", "double", "suite", "family", "vip"];
interface DatPhongFormProps {
    roomType: string;
}

const DatPhongForm = ({ roomType }: DatPhongFormProps) => {
    const { toast } = useToast();

    const form = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            roomType: roomType,
            date: {
                from: new Date(),
                to: addDays(new Date(), 3),
            },
            name: "",
            email: "",
            cccd: "",
            phone: "",
            address: "",
        },
    });

    const onSubmit = async (data: BookingFormData) => {
        console.log("Booking data:", data);
        // Handle booking logic here

        const res = await insertDatPhong(data);

        console.log(res.recordset);
        toast({
            title: "Đã đặt phòng thành công",
            description: `Mã đặt phòng là ${res.recordset[0].MaDP}`,
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
                            name="roomType"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-sm font-medium">
                                        Loại phòng
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl className="w-full">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn loại phòng bạn muốn lưu trú" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {loaiPhong.map((item) => (
                                                <SelectItem
                                                    value={item}
                                                    key={item}
                                                >
                                                    {`${
                                                        item
                                                            .slice(0, 1)
                                                            .toUpperCase() +
                                                        item.slice(1)
                                                    }`}
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

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-sm font-medium">
                                        Họ tên
                                    </Label>
                                    <Input
                                        type="text"
                                        {...field}
                                        className="border rounded p-2"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-sm font-medium">
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        {...field}
                                        className="border rounded p-2"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cccd"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-sm font-medium">
                                        CCCD
                                    </Label>
                                    <Input
                                        type="text"
                                        {...field}
                                        className="border rounded p-2"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-sm font-medium">
                                        SDT
                                    </Label>
                                    <Input
                                        type="number"
                                        {...field}
                                        className="border rounded p-2"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-sm font-medium">
                                        SDT
                                    </Label>
                                    <Input
                                        type="text"
                                        {...field}
                                        className="border rounded p-2"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" variant={"default"} className="mt-4">
                        Đặt phòng
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default DatPhongForm;
