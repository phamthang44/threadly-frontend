import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { ChevronRight } from 'lucide-react';

export interface MenuItem {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'danger';
    disabled?: boolean;
    hasSubmenu?: boolean;
}

export interface MenuGroup {
    id: string;
    items: MenuItem[];
}

interface ActionMenuProps {
    isOpen: boolean;
    onClose: () => void;
    groups: MenuGroup[];
    triggerRef?: React.RefObject<HTMLElement> | null;
    className?: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
                                                   isOpen,
                                                   onClose,
                                                   groups,
                                                   triggerRef,
                                                   className = '',
                                               }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    // State lưu vị trí đã tính toán
    const [coords, setCoords] = useState({ top: 0, left: 0, transformOrigin: 'top left' });
    const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');

    // 1. Tính toán vị trí THÔNG MINH (Auto Flip)
    useLayoutEffect(() => {
        if (isOpen && triggerRef?.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const menuHeight = 300; // Ước lượng chiều cao menu (hoặc đo thật nếu cần chính xác tuyệt đối)
            const spaceBelow = window.innerHeight - triggerRect.bottom;

            // Logic: Nếu bên dưới còn ít chỗ quá (< 300px) thì lật lên trên
            const isFlipTop = spaceBelow < menuHeight;

            if (isFlipTop) {
                setCoords({
                    top: triggerRect.top - 8, // Cách đỉnh nút 8px
                    left: triggerRect.left,
                    transformOrigin: 'bottom left' // Hiệu ứng phóng từ dưới lên
                });
                setPlacement('top');
            } else {
                setCoords({
                    top: triggerRect.bottom + 8, // Cách đáy nút 8px
                    left: triggerRect.left,
                    transformOrigin: 'top left' // Hiệu ứng phóng từ trên xuống
                });
                setPlacement('bottom');
            }
        }
    }, [isOpen, triggerRef]);

    // 2. Xử lý Animation (Mount/Unmount)
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isOpen) {
            setShouldRender(true);
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
            timeoutId = setTimeout(() => setShouldRender(false), 200);
        }
        return () => clearTimeout(timeoutId);
    }, [isOpen]);

    // 3. Xử lý Click Outside (FIX LỖI TOGGLE)
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // QUAN TRỌNG: Nếu click vào chính cái nút trigger thì KHÔNG làm gì cả
            // (để sự kiện onClick của nút tự lo việc toggle)
            if (triggerRef?.current && triggerRef.current.contains(target)) {
                return;
            }

            // Nếu click ra ngoài menu thì đóng
            if (menuRef.current && !menuRef.current.contains(target)) {
                onClose();
            }
        };

        // Dùng mousedown để trải nghiệm nhanh hơn
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, triggerRef]);

    if (!shouldRender) return null;

    // Animation class dựa trên vị trí (Lật lên hay lật xuống)
    const baseAnimation = 'transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]';
    const activeClass = 'opacity-100 scale-100 translate-y-0';

    // Nếu hiện ở trên (Top) thì animation trượt từ dưới lên, và ngược lại
    const hiddenClass = placement === 'top'
        ? 'opacity-0 scale-95 translate-y-[10px]'
        : 'opacity-0 scale-95 translate-y-[-10px]';

    // Xử lý style để menu không bị trôi khi lật ngược (dùng translate -100% Y)
    const positioningStyle: React.CSSProperties = {
        position: 'fixed',
        left: `${coords.left}px`,
        top: `${coords.top}px`,
        // Nếu lật lên trên, ta phải dịch chuyển cả menu lên trên chiều cao của nó
        transform: placement === 'top' ? 'translateY(-100%)' : 'none',
        zIndex: 50,
        transformOrigin: coords.transformOrigin,
    };

    // Khi đang animate, ta kết hợp transform định vị + transform animation.
    // Tailwind transform sẽ ghi đè style inline, nên ta cần xử lý class khéo léo hoặc dùng style inline cho transform animation luôn.
    // Cách đơn giản nhất: Bọc 1 thẻ div wrapper để định vị, thẻ bên trong để animate.

    return (
        <div style={positioningStyle} className="z-50 pointer-events-none">
            {/* Wrapper này có pointer-events-auto để nhận click */}
            <div
                ref={menuRef}
                className={`
                    pointer-events-auto
                    w-[300px] bg-[#1E1E1E] text-white 
                    rounded-2xl shadow-2xl overflow-hidden border border-zinc-800
                    flex flex-col
                    ${baseAnimation}
                    ${isVisible ? activeClass : hiddenClass}
                    ${className}
                `}
            >
                {groups.map((group, groupIndex) => (
                    <div key={group.id}>
                        {groupIndex > 0 && <div className="h-[1px] bg-zinc-800 mx-0 my-1" />}
                        <div className="py-1">
                            {group.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        if (!item.disabled && item.onClick) {
                                            item.onClick();
                                            // Đóng menu khi chọn item
                                        }
                                    }}
                                    disabled={item.disabled}
                                    className={`
                                        w-full px-4 py-3.5 flex items-center justify-between
                                        text-[15px] font-medium transition-colors duration-150
                                        hover:bg-zinc-800 active:bg-zinc-700
                                        ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                        ${item.variant === 'danger' ? 'text-red-500' : 'text-white'}
                                    `}
                                >
                                    <span className="truncate">{item.label}</span>
                                    <span className="ml-3 flex-shrink-0 text-zinc-400">
                                        {item.variant === 'danger' && item.icon ? (
                                            <span className="text-red-500">{item.icon}</span>
                                        ) : item.hasSubmenu ? (
                                            <ChevronRight size={20} />
                                        ) : (
                                            item.icon
                                        )}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActionMenu;