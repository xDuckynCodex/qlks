import type { NextAuthConfig } from "next-auth";
import { IUser } from "./types/next-auth";
import { UserRole } from "./types";
import { NextResponse } from "next/server";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt", // Sử dụng JWT để quản lý session
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // 'user' ở đây là đối tượng được trả về từ hàm 'authorize' của provider (ví dụ Credentials)
                // hoặc từ database khi dùng adapter với các provider OAuth.
                token.user = user as IUser;
                // Đảm bảo đối tượng user của bạn có thuộc tính 'role'.
                if ("role" in user && typeof user.role === "string") {
                    token.role = user.role;
                }
            }
            return token;
        },
        // Callback này chạy mỗi khi session được tạo hoặc cập nhật.
        // Chúng ta thêm 'role' từ JWT vào đối tượng session.user để có thể truy cập ở client-side.
        async session({ session, token }) {
            if (token.role) {
                (session.user as IUser) = token.user;
            }
            return session;
        },
        async authorized({ request, auth }) {
            const user = auth?.user as IUser | null;
            const pathname = request.nextUrl.pathname;
            // Kiểm tra xem người dùng có quyền truy cập vào trang này không
            if (pathname.startsWith("/admin")) {
                if (user?.role === UserRole.Customer) {
                    return NextResponse.redirect(
                        new URL("/", request.nextUrl.origin)
                    ); // Chỉ admin mới có quyền truy cập vào trang /admin
                }
                return NextResponse.next(); // Cho phép truy cập nếu là admin
            }
            return !!auth;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
