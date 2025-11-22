import { useEffect, useState } from "react";
import { formatRelativeTime } from "@/utils/timeFormatter";

export function useTimeAgo(dateISO: string): string {
    // 1. Khởi tạo state.
    // Mẹo: Để tránh Hydration Error trong Next.js, ta có thể khởi tạo null hoặc chuỗi rỗng trước,
    // sau đó useEffect mới tính toán. Nhưng để UI không bị giật (flash), ta vẫn tính ngay,
    // nhưng cần đảm bảo formatRelativeTime xử lý được việc sai lệch giây nhỏ.
    const [timeAgo, setTimeAgo] = useState<string>("");

    useEffect(() => {
        // Flag để tránh update state khi component đã unmount
        let isMounted = true;
        let timeoutId: NodeJS.Timeout;

        const tick = () => {
            if (!isMounted) return;

            const now = new Date();
            const date = new Date(dateISO);
            // Tính khoảng cách bằng giây
            const diffSec = (now.getTime() - date.getTime()) / 1000;

            // --- FIX LỖI THỜI GIAN ÂM (TƯƠNG LAI) ---
            // Nếu diffSec < 0 (tức là tương lai), ép về 0 để hiện "just now" thay vì "-10s"
            const safeDiffSec = diffSec < 0 ? 0 : diffSec;

            // Cập nhật text hiển thị
            // Lưu ý: Hàm formatRelativeTime của bạn phải xử lý safeDiffSec
            setTimeAgo(formatRelativeTime(dateISO));

            // --- TÍNH TOÁN THỜI GIAN UPDATE TIẾP THEO (DYNAMIC) ---
            let nextTickDelay = 10000000; // Mặc định rất lâu mới update

            if (safeDiffSec < 60) {
                // Dưới 1 phút: Update mỗi 1 giây (để thấy 1s, 2s...)
                nextTickDelay = 1000;
            } else if (safeDiffSec < 3600) {
                // Dưới 1 giờ: Update mỗi 1 phút
                nextTickDelay = 60000;
            } else if (safeDiffSec < 86400) {
                // Dưới 1 ngày: Update mỗi 1 giờ
                nextTickDelay = 3600000;
            }
            // Hơn 1 ngày thì không cần auto update nữa (hoặc rất lâu)

            // Đệ quy: Gọi lại tick sau khoảng thời gian đã tính
            timeoutId = setTimeout(tick, nextTickDelay);
        };

        // Chạy ngay lập tức lần đầu
        tick();

        return () => {
            isMounted = false;
            clearTimeout(timeoutId);
        };
    }, [dateISO]);

    return timeAgo;
}