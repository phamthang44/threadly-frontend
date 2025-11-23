import React from 'react';
import ThreadDetailView from "../../../features/thread/components/ThreadDetailView";
import {mockThreadDetail} from "@/utils/mockData";

const ThreadsPage = () => {
    return <ThreadDetailView rootThread={mockThreadDetail} />;
}

export default ThreadsPage;