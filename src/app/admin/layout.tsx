import { AdminSidebar } from "@/components/admin-sidebar";
import AdminHeader from "@/components/admin-header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="w-full">
                <AdminHeader />
                <div className="pt-4 px-4">{children}</div>
            </main>
        </SidebarProvider>
    );
}
