"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";
import { format } from "date-fns";

interface DatePickerWithRangeProps<T extends Record<string, any>>
    extends React.HTMLAttributes<HTMLDivElement> {
    field: ControllerRenderProps<T, "date">;
}

export function DatePickerWithRange<FType extends Record<string, any>>({
    className,
    field,
}: DatePickerWithRangeProps<FType>) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !field && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {field.value?.from ? (
                            field.value.to ? (
                                <>
                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                    {format(field.value.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(field.value.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value?.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        disabled={[
                            { before: new Date() },
                            new Date(2025, 5, 30),
                        ]}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
