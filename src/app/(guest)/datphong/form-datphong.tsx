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

const bookingSchema = z.object({
    roomType: z.string().min(1, "Room type is required"),
    date: z.object({
        from: z.date(),
        to: z.date(),
    }),
    numberOfGuests: z.coerce
        .number()
        .min(1, "Number of guests is required")
        .max(10, "Maximum 10 guests allowed"),
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
            numberOfGuests: 1,
        },
    });

    const onSubmit = async (data: BookingFormData) => {
        console.log("Booking data:", data);
        // Handle booking logic here

        toast({
            title: "Đã đặt phòng thành công",
            description: `Đã đặt phòng thành công `,
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

                        {/* <FormField
                            control={form.control}
                            name="checkInDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of birth</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() ||
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        <FormField
                            control={form.control}
                            name="numberOfGuests"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Label className="text-sm font-medium">
                                        Số lượng người
                                    </Label>
                                    <Input
                                        type="number"
                                        {...field}
                                        className="border rounded p-2"
                                    />
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
