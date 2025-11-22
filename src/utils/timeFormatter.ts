export function formatRelativeTime(dateISO: string): string {
    const date = new Date(dateISO);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // --- FIX QUAN TRỌNG: CHẶN SỐ ÂM ---
    if (diffInSeconds < 0) {
        return "now"; // Hoặc "Just now"
    }

    if (diffInSeconds < 60) return `${diffInSeconds}s`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;

    // Fallback sang ngày tháng nếu quá lâu
    return date.toLocaleDateString('en-US');
}


