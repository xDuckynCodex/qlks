import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
    return (
        <div className="w-4/5 h-[80px] flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    className="object-cover size-16 mr-2"
                    width={200}
                    height={200}
                />
                <span className="text-xl font-bold">My App</span>
            </div>
            <nav className="flex space-x-4">
                <Button variant="link" asChild>
                    <Link href="/">Home</Link>
                </Button>
                <Button variant="link" asChild>
                    <Link href="/datphong">Booking</Link>
                </Button>
                <Button variant="link" asChild>
                    <Link href="/sddichvu">Services</Link>
                </Button>
                <Button variant="link" asChild>
                    <Link href="/login">Login</Link>
                </Button>
            </nav>
        </div>
    );
};

export default Header;
