import Header from "@/components/header";

export default function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="w-full flex justify-center">
                <Header />
            </div>
            {children}
        </>
    );
}
