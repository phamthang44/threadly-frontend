import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Interface giữ nguyên ---
export interface MenuItem {
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    variant?: 'default' | 'danger';
    disabled?: boolean;
    submenu?: MenuGroup[];
    subMenuTitle?: string;
    customRender?: React.ReactNode;
    protected?: boolean;
}

export interface MenuGroup {
    id: string;
    items: MenuItem[];
}

interface ActionMenuProps {
    isOpen: boolean;
    onClose: () => void;
    groups: MenuGroup[];
    triggerRef?: React.RefObject<HTMLElement | null>;
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
    const [history, setHistory] = useState<{ title: string; groups: MenuGroup[] }[]>([]);
    const [direction, setDirection] = useState(0);
    const [coords, setCoords] = useState({ top: 0, left: 0, transformOrigin: 'top left' });
    const [placement, setPlacement] = useState<'bottom' | 'top'>('bottom');


    const currentMenuGroups = history.length > 0 ? history[history.length - 1].groups : groups;
    const currentTitle = history.length > 0 ? history[history.length - 1].title : null;

    useLayoutEffect(() => {
        if (isOpen && triggerRef?.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const menuWidth = 300;
            const menuHeight = 300;
            const spaceBelow = window.innerHeight - triggerRect.bottom;

            let left = triggerRect.right - menuWidth;
            if (left < 10) left = 50;
            if (triggerRect.right + (menuWidth - triggerRect.width) > window.innerWidth) {
                left = window.innerWidth - menuWidth - 8;
            }

            if (spaceBelow < menuHeight) {
                setCoords({ top: triggerRect.top - 8, left, transformOrigin: 'bottom left' });
                setPlacement('top');
            } else {
                setCoords({ top: triggerRect.bottom + 8, left, transformOrigin: 'top left' });
                setPlacement('bottom');
            }
        }
    }, [isOpen, triggerRef]);

    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setHistory([]);
                setDirection(0);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (triggerRef?.current && triggerRef.current.contains(target)) return;
            if (menuRef.current && !menuRef.current.contains(target)) onClose();
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, triggerRef]);

    const handleEnterSubmenu = (item: MenuItem) => {
        if (item.submenu) {
            setDirection(1);
            setHistory(prev => [...prev, { title: item.subMenuTitle || 'Menu', groups: item.submenu! }]);
        }
    };

    const handleBack = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDirection(-1);
        setHistory(prev => prev.slice(0, -1));
    };

    const menuVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: placement === 'top' ? 10 : -10
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring' as const, duration: 0.3, bounce: 0 }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.15 }
        }
    };

    const contentVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 30 : -30,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -30 : 30,
            opacity: 0,
        }),
    };

    const menuContent = (
        <div
            style={{
                position: 'fixed',
                left: coords.left,
                top: coords.top,
                zIndex: 50,
                transform: placement === 'top' ? 'translateY(-100%)' : 'none',
            }}
            className="pointer-events-none"
        >
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        style={{ transformOrigin: coords.transformOrigin }}
                        className={`
                            pointer-events-auto
                            w-[300px] bg-[var(--action-menu-bg)] text-[var(--action-menu-text-primary)]
                            rounded-2xl shadow-2xl overflow-hidden border border-[var(--action-menu-border)]
                            flex flex-col
                            ${className}
                        `}
                        layout
                        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {history.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center px-2 py-3 border-b border-[var(--action-menu-border)] relative shrink-0 z-10 bg-[var(--action-menu-bg)]"
                                >
                                    <button
                                        onClick={handleBack}
                                        className="absolute left-2 p-1 hover:bg-[var(--action-menu-button-hover)] rounded-full transition-colors cursor-pointer"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <span className="w-full text-center font-bold text-[16px] pointer-events-none select-none">
                                        {currentTitle}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative overflow-hidden">
                            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                                <motion.div
                                    key={history.length}
                                    custom={direction}
                                    variants={contentVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                                    className="px-2 py-1"
                                >
                                    {currentMenuGroups.map((group, groupIndex) => (
                                        <div key={group.id}>
                                            {groupIndex > 0 && <div className="h-[1px] bg-[--action-menu-bg] mx-2 my-1" />}
                                            <div className="py-1">
                                                {group.items.map((item) => {
                                                    if (item.customRender) {
                                                        return (
                                                            <div key={item.id} className="px-4 py-2">
                                                                {item.customRender}
                                                            </div>
                                                        );
                                                    }
                                                    if (item.protected) return null;
                                                    return (
                                                        <button
                                                            key={item.id}
                                                            onClick={() => {
                                                                if (item.disabled) return;
                                                                if (item.submenu) {
                                                                    handleEnterSubmenu(item);
                                                                } else if (item.onClick) {
                                                                    item.onClick();
                                                                    onClose();
                                                                }
                                                            }}
                                                            disabled={item.disabled}
                                                            className={`w-full px-4 py-3.5 flex items-center justify-between text-[15px] font-medium transition-colors duration-150 hover:bg-[var(--action-menu-hover)] active:bg-[var(--action-menu-button-active)] rounded-2xl
                                                            ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                                            ${item.variant === 'danger' ? 'text-[var(--action-menu-text-disable)]' : 'text-[var(--action-menu-text-primary)]'}
                                                        `}
                                                        >
                                                            <span className="truncate">{item.label}</span>
                                                            <span className="ml-3 flex-shrink-0 text-[var(--action-submenu-text-primary)]">
                                                                {item.submenu ? <ChevronRight size={20} /> : item.icon}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    return createPortal(menuContent, document.body);
};

export default ActionMenu;