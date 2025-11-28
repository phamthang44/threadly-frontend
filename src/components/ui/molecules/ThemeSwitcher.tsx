import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react'; // Import thêm Monitor cho icon Auto
import { motion } from 'framer-motion';
import { useTheme } from "next-themes"; // <--- Import hook này

const ThemeSwitcher = () => {
    // Lấy theme hiện tại và hàm setTheme từ thư viện
    const { theme, setTheme } = useTheme();

    // Mảng option khớp với giá trị của next-themes
    const options = [
        { id: 'light', icon: <Sun size={20} />, label: null },
        { id: 'dark', icon: <Moon size={20} />, label: null },
        { id: 'system', icon: <Monitor size={20} />, label: 'Auto' }, // Đổi id thành 'system' cho chuẩn
    ];

    // Để tránh lỗi hydration khi server chưa biết theme là gì,
    // ta cần đợi client mount xong mới render (optional nhưng khuyên dùng)
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className="bg-[var(--theme-switcher-bg)] rounded-xl flex items-center justify-between relative h-12 w-full">
            {options.map((option) => {
                const isActive = theme === option.id;
                return (
                    <button
                        key={option.id}
                        onClick={() => setTheme(option.id)} // <--- Chỉ cần gọi hàm này là xong
                        className={`cursor-pointer relative z-10 flex-1 flex items-center justify-center h-full rounded-lg text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-[var(--theme-switcher-active-text)]' : 'text-[var(--theme-switcher-text-primary)] hover:text-[var(--theme-switcher-text-hover)]'}`} >
                        {isActive && (
                            <motion.div
                                layoutId="active-theme-bg"
                                className="absolute inset-0 bg-[var(--theme-swithcer-button-active-bg)] rounded-lg shadow-sm border border-[var(--theme-swithcer-button-active-border)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                                style={{ zIndex: -1 }}
                            />
                        )}
                        <div className="flex items-center gap-2">
                            <span>{option.icon}</span>
                            <span>{option.label}</span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default ThemeSwitcher;