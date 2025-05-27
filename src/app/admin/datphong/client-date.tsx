"use client";

import { format } from "date-fns";
import React from "react";

const ClientDate = ({ time }: { time: string }) => {
    return (
        <div className="text-center">
            {time ? format(time, "dd-MM-yyyy") : "-"}
        </div>
    );
};

export default ClientDate;
