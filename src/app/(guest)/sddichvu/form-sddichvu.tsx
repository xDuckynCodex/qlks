"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { datDichVu } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const serviceSchema = z.object({
    MaDP: z.string().min(1, { message: `Khong duoc bo trong` }),
    MaDV: z.string().min(1, { message: `Khong duoc bo trong` }),
    SoLuong: z.coerce.number().min(1),
    DonViTinh: z.string(),
    NSD: z.date(),
});

type serviceForm = z.infer<typeof serviceSchema>;

const FormSDDichVu = ({
    Ids,
}: {
    Ids: {
        value: string;
        label: string;
    }[];
}) => {
    const [open, setOpen] = React.useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<serviceForm>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            MaDP: "",
            MaDV: "",
            SoLuong: 1,
            DonViTinh: "Lan",
            NSD: new Date(),
        },
    });

    const label = "Lua chon dich vu";

    const onSubmit = async (data: serviceForm) => {
        try {
            const res = await datDichVu(data);
            toast({
                title: "Đăng ký dịch vụ thành công",
                description: `Đã đăng ký dịch vụ ${
                    Ids.filter((i) => i.value === res.MaDV)[0].label
                } cho mã đặt phòng ${res.MaDP}`,
            });
            router.push("/");
        } catch (error) {
            toast({
                title: "Đăng ký dịch vụ that bai",
                description: `Vui long thu lai sau`,
            });
            router.push("/");
        }
    };
    return (
        <div className="m-auto ">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Đăng ký dịch vụ
                </h1>
                <p className="text-foreground">
                    Chọn và đăng ký các dịch vụ bổ sung cho kỳ nghỉ của bạn
                </p>
            </div>
            <Form {...form}>
                <form
                    className="space-y-4"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="MaDP"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Số lượng</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Nhập ma DP..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="MaDV"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>{label}</FormLabel>
                                <FormControl className="w-full">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {field.value
                                                    ? Ids.find(
                                                          (Id) =>
                                                              Id.value ===
                                                              field.value
                                                      )?.label
                                                    : `${label}...`}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder={`Search ${label}...`}
                                                    className="h-9"
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        No Id found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {Ids.map((Id) => (
                                                            <CommandItem
                                                                key={Id.value}
                                                                value={Id.value}
                                                                onSelect={(
                                                                    currentValue
                                                                ) => {
                                                                    field.onChange(
                                                                        currentValue ===
                                                                            field.value
                                                                            ? ""
                                                                            : currentValue
                                                                    );
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                {Id.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="SoLuong"
                        render={({ field }) => (
                            <FormItem className="w-full">
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

                    <Button type="submit">Đăng ký</Button>
                </form>
            </Form>
        </div>
    );
};

export default FormSDDichVu;
