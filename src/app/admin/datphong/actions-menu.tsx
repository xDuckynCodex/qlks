import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { ThongTinDatPhong } from "./columns";
import FormDatPhong from "./form-datphong";
import { RoomStatus } from "@/types";
import { fetchNgayDaDuocDatTheoMaPhong } from "@/lib/data";
import { NgayDaDuocDat } from "@/app/(guest)/datphong/form-datphong";

interface ActionsMenuProps {
    phong: ThongTinDatPhong;
}

const ActionsMenu = ({ phong }: ActionsMenuProps) => {
    const canCheckIn = phong.TinhTrang === RoomStatus.reserved;
    const canCheckOut = phong.TinhTrang === RoomStatus.occupied;

    const reservedDates: NgayDaDuocDat = phong.NgayDaDat.split(",").map(
        (date) => {
            return {
                Ngay: new Date(date),
            };
        }
    );
    return (
        <Dialog>
            {/* dropdown menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DialogTrigger asChild>
                        <DropdownMenuItem>Đặt phòng</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem
                        disabled={canCheckIn}
                        onClick={() => {
                            // update check in
                            console.log("Update checkin");
                        }}
                    >
                        Update Checkin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={canCheckOut}
                        onClick={() => {
                            // update check out
                            console.log("Update checkout");
                        }}
                    >
                        Update Checkout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* dialog */}

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Đặt phòng </DialogTitle>
                    <DialogDescription>
                        Add some infor for room
                    </DialogDescription>
                </DialogHeader>
                {/* form here */}
                <FormDatPhong
                    reservedDates={reservedDates}
                    maPhong={phong.MaPhong}
                />
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ActionsMenu;
