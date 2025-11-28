import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MenuItem } from "@/components/ui";

interface MoreModalProps {
    onClose: () => void;
    isAuthenticated: boolean;
    triggerRef: React.RefObject<HTMLButtonElement>;
}

const MoreModal = ({ onClose, isAuthenticated, triggerRef }: MoreModalProps) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 8,
                left: rect.right - 200
            });
        }
    }, [triggerRef]);

    return createPortal(
        <div
            className="fixed z-50"
            style={{
                top: `${position.top}px`,
                left: `${position.left}px`
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div
                className="bg-[#1c1c1e] rounded-2xl w-48 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {isAuthenticated ? (
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
                    <div className="py-2">
                        <MenuItem label="Appearance" hasArrow />
                        <MenuItem label="Report a problem" />
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default MoreModal;
