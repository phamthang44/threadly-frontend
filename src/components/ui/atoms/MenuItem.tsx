import {ChevronRight} from "lucide-react";

interface MenuItemProps {
    label: string;
    hasArrow?: boolean;
    badge?: string;
    isDestructive?: boolean;
}

const MenuItem = ({ label, hasArrow, badge, isDestructive }: MenuItemProps) => (
    <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
      <span className={`text-base font-normal ${isDestructive ? 'text-red-500' : 'text-white'}`}>
        {label}
      </span>
        <div className="flex items-center gap-3">
            {badge && (
                <span className="text-gray-400 text-sm">{badge}</span>
            )}
            {hasArrow && (
                <ChevronRight className="w-5 h-5 text-gray-400" />
            )}
        </div>
    </button>
);

export default MenuItem;