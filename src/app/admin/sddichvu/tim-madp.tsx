"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface ITimMaDp<FData> {
    label: string;
    name: keyof FData;
    Ids: {
        value: string;
        label: string;
    }[];
    form: UseFormReturn<
        {
            MaDP: string;
            MaDV: string;
            SoLuong: number;
            NSD: Date;
        },
        any, //eslint-disable-line
        {
            MaDP: string;
            MaDV: string;
            SoLuong: number;
            NSD: Date;
        }
    >;
}

export function TimMaDP<FData>({ form, Ids, label, name }: ITimMaDp<FData>) {
    const [open, setOpen] = React.useState(false);

    return (
        <FormField
            control={form.control}
            name={`${name}`}
            render={({ field }) => (
                <FormItem className="w-1/3">
                    <FormLabel>{label}</FormLabel>
                    <FormControl className="w-full">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-60 justify-between"
                                >
                                    {field.value
                                        ? Ids.find(
                                              (Id) => Id.value === field.value
                                          )?.label
                                        : `${label}...`}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-60 p-0">
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
                                                        setOpen(false);
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
    );
}
