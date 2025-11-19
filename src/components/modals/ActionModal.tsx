import React, { useEffect, useRef } from 'react';
import { Bookmark, EyeOff, VolumeX, UserX, UserMinus, AlertCircle, Link as LinkIcon } from 'lucide-react';

interface ActionItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'danger';
    disabled?: boolean;
}

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    actions: ActionItem[];
    title?: string;
    position?: { x: number; y: number };
    closeOnClickOutside?: boolean;
    closeOnAction?: boolean;
    className?: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
                                                     isOpen,
                                                     onClose,
                                                     actions,
                                                     title,
                                                     position,
                                                     closeOnClickOutside = true,
                                                     closeOnAction = true,
                                                     className = '',
                                                 }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                closeOnClickOutside &&
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, closeOnClickOutside]);

    const handleActionClick = (action: ActionItem) => {
        if (!action.disabled) {
            action.onClick();
            if (closeOnAction) {
                onClose();
            }
        }
    };

    if (!isOpen) return null;

    const modalStyle = position
        ? { top: `${position.y}px`, left: `${position.x}px` }
        : {};

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    isOpen ? 'opacity-50' : 'opacity-0'
                }`}
            />

            <div
                ref={modalRef}
                style={position ? modalStyle : undefined}
                className={`relative bg-zinc-900 rounded-2xl shadow-2xl w-80 transform transition-all duration-300 ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } ${position ? 'absolute' : ''} ${className}`}
            >
                {title && (
                    <div className="px-6 py-4 border-b border-zinc-800">
                        <h3 className="text-white text-lg font-semibold">{title}</h3>
                    </div>
                )}

                <div className="py-2">
                    {actions.map((action, index) => (
                        <button
                            key={action.id}
                            onClick={() => handleActionClick(action)}
                            disabled={action.disabled}
                            className={`w-full px-6 py-4 flex items-center justify-between transition-all duration-200 ${
                                action.disabled
                                    ? 'opacity-40 cursor-not-allowed'
                                    : 'hover:bg-zinc-800 active:bg-zinc-750 cursor-pointer'
                            } ${
                                action.variant === 'danger'
                                    ? 'text-red-500'
                                    : 'text-white'
                            } ${index === 0 && !title ? 'rounded-t-2xl' : ''} ${
                                index === actions.length - 1 ? 'rounded-b-2xl' : ''
                            }`}
                        >
                            <span className="text-base font-medium">{action.label}</span>
                            <span className={`${action.variant === 'danger' ? 'text-red-500' : 'text-gray-400'}`}>
                {action.icon}
              </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Demo implementation
const Demo: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const defaultActions: ActionItem[] = [
        {
            id: 'save',
            label: 'Save',
            icon: <Bookmark className="w-5 h-5" />,
            onClick: () => console.log('Save clicked'),
        },
        {
            id: 'not-interested',
            label: 'Not interested',
            icon: <EyeOff className="w-5 h-5" />,
            onClick: () => console.log('Not interested clicked'),
        },
        {
            id: 'mute',
            label: 'Mute',
            icon: <VolumeX className="w-5 h-5" />,
            onClick: () => console.log('Mute clicked'),
        },
        {
            id: 'restrict',
            label: 'Restrict',
            icon: <UserX className="w-5 h-5" />,
            onClick: () => console.log('Restrict clicked'),
        },
        {
            id: 'block',
            label: 'Block',
            icon: <UserMinus className="w-5 h-5" />,
            onClick: () => console.log('Block clicked'),
            variant: 'danger',
        },
        {
            id: 'report',
            label: 'Report',
            icon: <AlertCircle className="w-5 h-5" />,
            onClick: () => console.log('Report clicked'),
            variant: 'danger',
        },
        {
            id: 'copy',
            label: 'Copy link',
            icon: <LinkIcon className="w-5 h-5" />,
            onClick: () => console.log('Copy link clicked'),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center justify-center p-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Action Menu Modal</h1>
                <p className="text-gray-400 mb-8">Reusable component with smooth transitions</p>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                    Open Menu
                </button>

                <ActionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    actions={defaultActions}
                    closeOnClickOutside={true}
                    closeOnAction={true}
                />
            </div>
        </div>
    );
};

export default Demo;