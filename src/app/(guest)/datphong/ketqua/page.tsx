import React from "react";
import {
    CheckCircle,
    Calendar,
    Phone,
    Mail,
    CreditCard,
    User,
    Bed,
    Clock,
    XCircle,
} from "lucide-react";
import { fetchKetQuaDatPhong, KetQuaDatPhong } from "@/lib/data";
import { format } from "date-fns";

interface BookingData {
    fullName: string;
    phoneNumber: string;
    citizenId: string;
    email: string;
    roomType: string;
    checkInDate: string;
    checkOutDate: string;
    bookingId: string;
    totalAmount: string;
}

const BookingConfirmation = async ({
    searchParams,
}: {
    searchParams: { status: "success" | "fail"; ma_dp?: string };
}) => {
    const { status, ma_dp } = await searchParams;
    if (status === "fail") {
        return (
            <div className="min-h-screen bg-background py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Header thành công */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-foreground/10 rounded-full mb-4">
                            <XCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Đặt phòng thất bại
                        </h1>
                        <p className="text-foreground">
                            Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của
                            chúng tôi
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-foreground text-sm">
                            Chúc bạn có một kỳ nghỉ tuyệt vời! 🏨✨
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    const ketQua = await fetchKetQuaDatPhong(ma_dp as string);

    // Dữ liệu mẫu - trong thực tế sẽ được truyền từ props hoặc state
    const bookingData: BookingData = {
        fullName: "Nguyễn Văn An",
        phoneNumber: "0987654321",
        citizenId: "123456789012",
        email: "nguyenvanan@email.com",
        roomType: "Phòng Deluxe Twin",
        checkInDate: "15/06/2025",
        checkOutDate: "18/06/2025",
        bookingId: "BK2025060400123",
        totalAmount: "2,400,000 VNĐ",
    };

    const InfoRow: React.FC<{
        icon: React.ReactNode;
        label: string;
        value: string;
    }> = ({ icon, label, value }) => (
        <div className="flex items-start space-x-3 p-4 bg-background rounded-lg hover:bg-foreground/30 transition-colors">
            <div className="flex-shrink-0 text-blue-600 mt-0.5">{icon}</div>
            <div className="flex-1 min-w-0">
                <dt className="text-sm font-medium text-foreground mb-1">
                    {label}
                </dt>
                <dd className="text-sm text-foreground font-semibold break-words">
                    {value}
                </dd>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header thành công */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-foreground/10 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Đặt phòng thành công!
                    </h1>
                    <p className="text-foreground">
                        Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của chúng
                        tôi
                    </p>
                </div>

                {/* Card thông tin đặt phòng */}
                <div className="bg-background rounded-2xl shadow-xl overflow-hidden border border-foreground/10">
                    {/* Header card */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">
                            Thông tin đặt phòng
                        </h2>
                        <p className="text-blue-100 text-sm">
                            Mã đặt phòng: {ketQua.MaDP}
                        </p>
                    </div>

                    {/* Nội dung thông tin */}
                    <div className="p-6">
                        <div className="grid gap-4">
                            <InfoRow
                                icon={<User className="w-5 h-5" />}
                                label="Họ và tên"
                                value={ketQua.HoTen}
                            />

                            <InfoRow
                                icon={<Phone className="w-5 h-5" />}
                                label="Số điện thoại"
                                value={ketQua.SDT}
                            />

                            <InfoRow
                                icon={<CreditCard className="w-5 h-5" />}
                                label="Số CCCD/CMND"
                                value={ketQua.CCCD}
                            />

                            <InfoRow
                                icon={<Mail className="w-5 h-5" />}
                                label="Email"
                                value={ketQua.Email}
                            />

                            <InfoRow
                                icon={<Bed className="w-5 h-5" />}
                                label="Loại phòng"
                                value={
                                    ketQua.TenLP.slice(0, 1).toUpperCase() +
                                    ketQua.TenLP.slice(1)
                                }
                            />

                            <InfoRow
                                icon={<Calendar className="w-5 h-5" />}
                                label="Ngày nhận phòng"
                                value={format(ketQua.NgayNhan, "dd-MM-yyyy")}
                            />

                            <InfoRow
                                icon={<Calendar className="w-5 h-5" />}
                                label="Ngày trả phòng"
                                value={format(ketQua.NgayTra, "dd-MM-yyyy")}
                            />
                        </div>

                        {/* Thông tin tổng tiền */}
                        <div className="mt-6 p-4 bg-foreground/10 rounded-lg border border-foreground/50">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-foreground">
                                    Tổng tiền:
                                </span>
                                <span className="text-2xl font-bold text-green-600">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(ketQua.TongTien)}
                                </span>
                            </div>
                        </div>

                        {/* Lưu ý */}
                        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="flex items-start space-x-2">
                                <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-amber-800 mb-1">
                                        Lưu ý quan trọng:
                                    </h4>
                                    <ul className="text-sm text-amber-700 space-y-1">
                                        <li>
                                            • Vui lòng mang theo CCCD/CMND khi
                                            nhận phòng
                                        </li>
                                        <li>
                                            • Thời gian nhận phòng: 14:00 | Trả
                                            phòng: 12:00
                                        </li>
                                        <li>
                                            • Liên hệ hotline: 1900-xxxx để thay
                                            đổi thông tin
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                                Tải xuống xác nhận
                            </button>
                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors">
                                Gửi qua email
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-foreground text-sm">
                        Chúc bạn có một kỳ nghỉ tuyệt vời! 🏨✨
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
