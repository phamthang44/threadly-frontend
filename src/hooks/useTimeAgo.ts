import { useEffect, useState } from "react";
import { formatRelativeTime } from "@/utils/timeFormatter";

export function useTimeAgo(dateISO: string): string {
    const [text, setText] = useState(() => formatRelativeTime(dateISO));

    useEffect(() => {
        const update = () => setText(formatRelativeTime(dateISO));

        // Determine update interval based on age
        const now = new Date();
        const date = new Date(dateISO);
        const diffSec = (now.getTime() - date.getTime()) / 1000;

        let interval = 0;

        if (diffSec < 60) interval = 1000;                 // every 1s
        else if (diffSec < 3600) interval = 30_000;        // every 30s
        else if (diffSec < 86400) interval = 60_000;       // every 1min
        else interval = 0;                                 // no update

        update();

        if (interval === 0) return;

        const handle = setInterval(update, interval);
        return () => clearInterval(handle);

    }, [dateISO]);

    return text;
}
