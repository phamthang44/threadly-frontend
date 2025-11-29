'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { createPortal } from 'react-dom';

interface LightboxProps {
    images: ImagesType;
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

type ImagesType = {
    id: number;
    url: string;
    type: string;
    desc: string;
}[];

type Direction = 'left' | 'right' | null;

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [direction, setDirection] = useState<Direction>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Handle animation completion
    useEffect(() => {
        if (!isAnimating || !direction) return;

        animationTimeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => {
                const next = direction === 'right' ? prev + 1 : prev - 1;
                return next;
            });
            setDirection(null);
            setIsAnimating(false);
        }, 300);

        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, [isAnimating, direction]);

    // Reset when lightbox opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setDirection(null);
            setIsAnimating(false);
        }
    }, [isOpen, initialIndex]);

    const handleNavigation = useCallback((nextDirection: Direction) => {
        setCurrentIndex((prev) => {
            const isFirst = prev === 0;
            const isLast = prev === images.length - 1;

            if (nextDirection === 'right' && !isLast) {
                setDirection('right');
                setIsAnimating(true);
                return prev;
            }
            if (nextDirection === 'left' && !isFirst) {
                setDirection('left');
                setIsAnimating(true);
                return prev;
            }
            return prev;
        });
    }, [images.length]);

    const handleNextImage = useCallback(() => {
        if (isAnimating) return;
        handleNavigation('right');
    }, [isAnimating, handleNavigation]);

    const handlePrevImage = useCallback(() => {
        if (isAnimating) return;
        handleNavigation('left');
    }, [isAnimating, handleNavigation]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevImage();
            if (e.key === 'ArrowRight') handleNextImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, handlePrevImage, handleNextImage]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

    if (!isOpen) return null;

    const currentImage = images[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === images.length - 1;

    const lightboxContent = (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-200" onClick={(e) => {
            e.stopPropagation();
            onClose();
        }}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="absolute top-4 left-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 cursor-pointer"
                aria-label="Close lightbox"
                type="button"
            >
                <X size={24} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center overflow-hidden px-4 md:px-16 py-8">
                <div
                    key={currentIndex}
                    className={`
                        relative max-w-full max-h-full flex items-center justify-center
                        transition-all duration-300 ease-out
                        ${isAnimating && direction === 'right' ? '-translate-x-full opacity-0' : ''}
                        ${isAnimating && direction === 'left' ? 'translate-x-full opacity-0' : ''}
                        ${!isAnimating ? 'translate-x-0 opacity-100' : ''}
                    `}
                >
                    <img
                        src={currentImage.url}
                        alt={currentImage.desc}
                        className="max-h-[85vh] w-auto max-w-full object-contain shadow-2xl rounded-sm select-none"
                        draggable={false}
                    />

                    <div className="absolute -bottom-8 left-0 right-0 text-center text-white/70 text-sm pointer-events-none">
                        {currentImage.desc} ({currentIndex + 1}/{images.length})
                    </div>
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage();
                        }}
                        disabled={isFirst || isAnimating}
                        className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full text-white transition-all duration-200
                            ${isFirst || isAnimating ? 'opacity-30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer'}
                        `}
                        aria-label="Previous image"
                        type="button"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage();
                        }}
                        disabled={isLast || isAnimating}
                        className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full text-white transition-all duration-200
                            ${isLast || isAnimating ? 'opacity-30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer'}
                        `}
                        aria-label="Next image"
                        type="button"
                    >
                        <ChevronRight size={32} />
                    </button>
                </>
            )}
        </div>
    );

    return createPortal(lightboxContent, document.body);
};

export default Lightbox;
