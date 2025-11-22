export function formatRelativeTime(dateISO: string): string {
    const now = new Date();
    const date = new Date(dateISO);

    const diffSec = (now.getTime() - date.getTime()) / 1000;
    const sec = diffSec;
    const min = sec / 60;
    const hour = min / 60;
    const day = hour / 24;

    if (sec < 60) return `${Math.floor(sec)}s`;
    if (min < 60) return `${Math.floor(min)}m`;
    if (hour < 24) return `${Math.floor(hour)}h`;
    if (day < 7) return `${Math.floor(day)}d`;

    return date.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}

export function renderTimeTag(dateISO: string): string {
    const relative = formatRelativeTime(dateISO);
    const full = new Date(dateISO).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

    return `
<time datetime="${dateISO}" title="${full}">
    <span><abbr>${relative}</abbr></span>
</time>
`.trim();
}

