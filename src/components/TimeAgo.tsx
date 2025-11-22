import React from "react";
import { useTimeAgo } from "@/hooks/useTimeAgo";

export default function TimeAgo({ datetime }: { datetime: string }) {
    const text = useTimeAgo(datetime);

    return (
        <time dateTime={datetime} title={new Date(datetime).toLocaleString()} className="min-w-6 whitespace-nowrap text-center inline-block" data-visualcompletion="ignore-dynamic">
            <span className="text-[14px]"><abbr>{text}</abbr></span>
        </time>
    );
}
