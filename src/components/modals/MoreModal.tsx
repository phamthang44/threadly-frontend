// import { ChevronRight, X } from 'lucide-react';
// import { useState } from 'react';
//
// export default function AuthModal() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isAuthenticated, setIsAuthenticated] = useState(true);
//
//     const Modal = ({ onClose }) => (
//         <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center sm:justify-center z-50" onClick={onClose}>
//             <div
//                 className="bg-[#1c1c1e] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md sm:mx-4 animate-slide-up"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {isAuthenticated ? (
//                     // Authenticated Menu
//                     <div className="py-2">
//                         <MenuItem label="Appearance" hasArrow badge="116" />
//                         <MenuItem label="Insights" badge="87" />
//                         <MenuItem label="Settings" />
//                         <MenuItem label="Saved" />
//                         <MenuItem label="Liked" badge="64" />
//                         <MenuItem label="Report a problem" />
//                         <MenuItem label="Log out" isDestructive />
//                     </div>
//                 ) : (
//                     // Unauthenticated Menu
//                     <div className="py-2">
//                         <MenuItem label="Appearance" hasArrow />
//                         <MenuItem label="Report a problem" />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
//
//     const MenuItem = ({ label, hasArrow, badge, isDestructive }) => (
//         <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
//       <span className={`text-base font-normal ${isDestructive ? 'text-red-500' : 'text-white'}`}>
//         {label}
//       </span>
//             <div className="flex items-center gap-3">
//                 {badge && (
//                     <span className="text-gray-400 text-sm">{badge}</span>
//                 )}
//                 {hasArrow && (
//                     <ChevronRight className="w-5 h-5 text-gray-400" />
//                 )}
//             </div>
//         </button>
//     );
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
//             <div className="text-center space-y-8">
//                 <div className="space-y-4">
//                     <h1 className="text-3xl font-bold text-white">Authentication Modal</h1>
//                     <p className="text-gray-400">Toggle between authenticated and guest views</p>
//                 </div>
//
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <button
//                         onClick={() => setIsOpen(true)}
//                         className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
//                     >
//                         Open Menu
//                     </button>
//
//                     <button
//                         onClick={() => setIsAuthenticated(!isAuthenticated)}
//                         className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
//                     >
//                         {isAuthenticated ? 'Switch to Guest' : 'Switch to Authenticated'}
//                     </button>
//                 </div>
//
//                 <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full">
//                     <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-gray-500'}`} />
//                     <span className="text-sm text-gray-300">
//             {isAuthenticated ? 'Authenticated' : 'Guest'}
//           </span>
//                 </div>
//             </div>
//
//             {isOpen && <Modal onClose={() => setIsOpen(false)} />}
//
//             <style jsx>{`
//         @keyframes slide-up {
//           from {
//             transform: translateY(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }
//         .animate-slide-up {
//           animation: slide-up 0.3s ease-out;
//         }
//       `}</style>
//         </div>
//     );
// }

import React from "react";
import {MenuItem} from "@/components/ui";

interface MoreModalProps {
    onClose: () => void;
    isAuthenticated: boolean;
}

const MoreModal = ({ onClose, isAuthenticated }: MoreModalProps) => (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center sm:justify-center z-50" onClick={onClose}>
        <div
            className="bg-[#1c1c1e] rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md sm:mx-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
        >
            {isAuthenticated ? (
                // Authenticated Menu
                <div className="py-2">
                    <MenuItem label="Appearance" hasArrow badge="116" />
                    <MenuItem label="Insights" badge="87" />
                    <MenuItem label="Settings" />
                    <MenuItem label="Saved" />
                    <MenuItem label="Liked" badge="64" />
                    <MenuItem label="Report a problem" />
                    <MenuItem label="Log out" isDestructive />
                </div>
            ) : (
                // Unauthenticated Menu
                <div className="py-2">
                    <MenuItem label="Appearance" hasArrow />
                    <MenuItem label="Report a problem" />
                </div>
            )}
        </div>
    </div>
);
export default MoreModal;
