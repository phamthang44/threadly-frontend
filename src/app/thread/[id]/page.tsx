'use client';
import React from 'react';
import ThreadDetailView from "../../../features/thread/components/ThreadDetailView";
import {useParams} from "next/navigation";
import {mockThreadDetail} from "@/utils/mockData";

const ThreadsPage = () => {
    return <ThreadDetailView rootThread={mockThreadDetail} />;
}

export default ThreadsPage;