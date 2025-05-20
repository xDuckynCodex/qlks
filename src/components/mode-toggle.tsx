"use client";

import React from "react";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";

const ModeToggle = () => {
    const { setTheme } = useTheme();
    const [checked, setChecked] = React.useState(true);

    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={checked}
                onCheckedChange={() => {
                    setChecked(!checked);
                    setTheme(checked ? "light" : "dark");
                }}
            />
        </div>
    );
};

export default ModeToggle;
