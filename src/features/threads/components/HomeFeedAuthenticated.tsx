'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Search, Home, Plus, User, Play } from 'lucide-react';
import {Sidebar} from "@/features/navigation/components/Sidebar";

const ThreadsUI = () => {
    const [activeTab, setActiveTab] = useState('foryou');

    const posts = [
        {
            id: 1,
            username: 'persie1812',
            time: '19h',
            verified: false,
            content: 'Giấc mơ không phải em',
            hasAudio: true,
            likes: 400,
            comments: 34,
            reposts: 14,
            shares: 18
        },
        {
            id: 2,
            username: 'mol_lyq.q',
            time: '9h',
            verified: false,
            content: '🔞 18+ warning ⚠️',
            images: [
                { spoiler: true },
                { spoiler: true },
                { spoiler: true },
                { spoiler: true }
            ],
            likes: 14100,
            comments: 81,
            reposts: 1600,
            shares: 1900
        },
        {
            id: 3,
            username: 'oakleymeta',
            time: '15h',
            verified: true,
            content: 'Locked in.',
            likes: 217,
            comments: 5,
            reposts: 5,
            shares: 122
        },
        {
            id: 4,
            username: 'hui_smann',
            time: '6h',
            verified: false,
            content: 'Đi thi tin học với tâm thế chỉ ơi số thực hành, nào ngờ kiếm tra lí thuyết được 4,67, ra thi thì mới xem điểm đạt 2 k năng phải đều trên 5\nTrường bạn đã vớt mình để mình qua môn. Quá tuyệt vời 😭',
            hasTable: true,
            likes: 38,
            comments: 4,
            reposts: 0,
            shares: 0
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Left Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="mx-auto max-w-2xl flex flex-col">
                {/* Header */}
                <div className=" bg-black border-b border-gray-800 w-full sticky top-0">
                    <div className="max-w-2xl mx-auto px-4">
                        {/* Tabs */}
                        <div className="flex gap-8 text-sm justify-center items-center w-full h-16">
                            <button
                                onClick={() => setActiveTab('foryou')}
                                className={`pb-3 px-1 relative ${activeTab === 'foryou' ? 'text-white' : 'text-gray-500'}`}
                            >
                                For you
                                {activeTab === 'foryou' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('following')}
                                className={`pb-3 px-1 relative ${activeTab === 'following' ? 'text-white' : 'text-gray-500'}`}
                            >
                                Following
                                {activeTab === 'following' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('ghost')}
                                className={`pb-3 px-1 relative ${activeTab === 'ghost' ? 'text-white' : 'text-gray-500'}`}
                            >
                                Ghost posts
                                {activeTab === 'ghost' && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {/* New Post */}
                <div className="border-b border-gray-800 pb-4 mb-4">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full" />
                        <input
                            type="text"
                            placeholder="What's new?"
                            className="flex-1 bg-transparent outline-none text-gray-500"
                        />
                        <button className="px-6 py-2 bg-white text-black rounded-lg font-semibold text-sm">
                            Post
                        </button>
                    </div>
                </div>

                {/* Posts */}
                {posts.map((post) => (
                    <div key={post.id} className="border-b border-gray-800 py-4">
                        <div className="flex gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gray-700 rounded-full" />
                                {post.verified && (
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">{post.username}</span>
                                        <span className="text-gray-500 text-sm">{post.time}</span>
                                    </div>
                                    <button>
                                        <MoreHorizontal className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <p className="mb-3 whitespace-pre-line">{post.content}</p>

                                {post.hasAudio && (
                                    <div className="mb-3 flex items-center gap-2 bg-gray-900 rounded-lg p-3">
                                        <Play className="w-5 h-5" />
                                        <div className="flex-1 h-8 bg-gray-800 rounded" />
                                    </div>
                                )}

                                {post.images && (
                                    <div className="grid grid-cols-4 gap-2 mb-3">
                                        {post.images.map((img, idx) => (
                                            <div key={idx} className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-600 blur-xl" />
                                                <span className="relative text-sm bg-gray-900/80 px-3 py-1 rounded-full">Spoiler</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {post.hasTable && (
                                    <div className="mb-3 bg-gray-900 rounded-lg p-3 overflow-hidden">
                                        <div className="text-xs text-gray-400 space-y-1">
                                            <div className="grid grid-cols-5 gap-2">
                                                <div>BME301100</div>
                                                <div>Pháp Văn</div>
                                                <div>Hạ</div>
                                                <div>01-12-2024</div>
                                                <div>Thành phố Hồ Chí Minh</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-6 text-gray-500">
                                    <button className="flex items-center gap-2 hover:text-red-500 transition">
                                        <Heart className="w-5 h-5" />
                                        <span className="text-sm">{post.likes > 1000 ? `${(post.likes / 1000).toFixed(1)}K` : post.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-blue-500 transition">
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="text-sm">{post.comments}</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-green-500 transition">
                                        <Repeat2 className="w-5 h-5" />
                                        <span className="text-sm">{post.reposts > 1000 ? `${(post.reposts / 1000).toFixed(1)}K` : post.reposts}</span>
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-purple-500 transition">
                                        <Send className="w-5 h-5" />
                                        <span className="text-sm">{post.shares > 1000 ? `${(post.shares / 1000).toFixed(1)}K` : post.shares}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Action Button */}
            <button className="fixed bottom-24 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Plus className="w-6 h-6 text-black" />
            </button>
        </div>
    );
};

export default ThreadsUI;