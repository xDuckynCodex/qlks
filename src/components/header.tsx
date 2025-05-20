import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import ModeToggle from "./mode-toggle";

const Header = () => {
    return (
        <div className="flex w-full items-center justify-between bg-background p-4 shadow-md h-16 gap-2 border-b-1 border-b-foreground/15">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="text-foreground hover:bg-foreground/70 hover:text-foreground" />
                <Separator orientation="vertical" className="h-full" />
                <div className="text-2xl font-bold text-foreground">
                    Welcome, User
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-foreground/70">Dark mode</span>
                <ModeToggle />
            </div>
        </div>
    );
};

export default Header;
