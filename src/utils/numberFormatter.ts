export function formatNumber(value: string | number | undefined | null) {
    // 1. Parse sang số, nếu không parse được thì mặc định là 0
    const num = typeof value === 'string' ? parseFloat(value) : value;

    // 2. Kiểm tra kỹ: Nếu num là NaN hoặc null/undefined thì coi như là 0
    if (num === null || num === undefined || isNaN(num)) {
        return ''; // Hoặc trả về "" tuỳ design của bạn
    }

    // 3. Logic format K, M, B giữ nguyên
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return num.toString();
    }
}