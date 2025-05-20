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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Phong } from "./columns";

interface ActionsMenuProps {
    phong: Phong;
}

const ActionsMenu = ({ phong }: ActionsMenuProps) => {
    const canCheckIn =
        phong.TinhTrang === "available" || phong.TinhTrang === "booked";
    const canCheckOut = phong.TinhTrang === "checked_in";
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem
                        disabled={!canCheckIn}
                        onClick={() => {
                            // update check in
                            console.log("Update checkin");
                        }}
                    >
                        Update Checkin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        disabled={!canCheckOut}
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
                    <DialogTitle>Update room </DialogTitle>
                    <DialogDescription>
                        Add some infor for room
                    </DialogDescription>
                </DialogHeader>
                {/* form here */}
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={phong.MaPhong}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ActionsMenu;
