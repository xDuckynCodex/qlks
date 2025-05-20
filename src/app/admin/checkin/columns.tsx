"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

// Dinh nghia cac cot cua bang
export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                //Checkin actions
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Checkin
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                //Checkout actions
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Checkout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
