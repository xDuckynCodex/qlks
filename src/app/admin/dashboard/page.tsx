import React, { Suspense } from "react";
import BaoCao from "./baocao";
import BieuDo from "./bieu-do";
import { auth } from "@/auth";
import { UserRole } from "@/types";

const Page = async () => {
    const session = await auth();
    if (session?.user.role === UserRole.administrator) {
        return (
            <div className="flex flex-col w-full space-y-4">
                <p className="text-2xl font-bold">Dashboard</p>
                <Suspense fallback={<div>Loading</div>}>
                    <BaoCao />
                </Suspense>
                <div className="w-4/5 mx-auto space-y-2">
                    <p className="text-2xl font-bold">Biểu đồ</p>
                    <Suspense fallback={<div>Loading</div>}>
                        <BieuDo />
                    </Suspense>
                </div>
            </div>
        );
    } else {
        return <>Bạn không có quyền hạn</>;
    }
};

export default Page;
