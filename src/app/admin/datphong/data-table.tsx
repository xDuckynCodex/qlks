"use client";

import React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ColumnFilter } from "@/components/column-filter";
import { DataTablePagination } from "@/components/ui/data-table/datatable-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const roomTypeOptions = [
    {
        value: "single",
        label: "Single",
    },
    {
        value: "double",
        label: "Double",
    },
    {
        value: "suite",
        label: "Suite",
    },
    {
        value: "family",
        label: "Family",
    },
    {
        value: "vip",
        label: "Vip",
    },
];

const statusOptions = [
    {
        value: "available",
        label: "Available",
    },
    {
        value: "reserved",
        label: "Reserved",
    },
    {
        value: "maintenance",
        label: "Maintenance",
    },
    {
        value: "cleaning",
        label: "Cleaning",
    },
    {
        value: "occupied",
        label: "Occupied",
    },
];

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnFilters,
        },
        initialState: {
            pagination: {
                pageIndex: 0, //custom initial page index
                pageSize: 10, //custom default page size
            },
        },
    });

    return (
        <>
            {/* Filter */}
            <div className="flex items-center gap-4 py-4">
                <Input
                    placeholder="Filter ma phong..."
                    value={
                        (table
                            .getColumn("MaPhong")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("MaPhong")
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <ColumnFilter
                    filterLabel="Room type"
                    columnFilter="TenLP"
                    options={roomTypeOptions}
                    table={table}
                />
                <ColumnFilter
                    filterLabel="Status"
                    columnFilter="TinhTrang"
                    options={statusOptions}
                    table={table}
                />
            </div>
            {/* Bang */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* Phan trang */}
            <DataTablePagination table={table} />
        </>
    );
}
