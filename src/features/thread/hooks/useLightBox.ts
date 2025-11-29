import { useRef, useState } from "react";

export function useLightBox() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [imageDimensions, setImageDimensions] = useState<{
        [key: string]: { width: number; height: number };
    }>({});
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const dragDistanceRef = useRef(0);
    const DRAG_THRESHOLD = 5; // pixels

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        dragDistanceRef.current = 0;
        setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
        setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
        dragDistanceRef.current = 0;
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        dragDistanceRef.current += Math.abs(walk);
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleImageClick = (index: number) => {
        // Only open lightbox if user didn't drag
        if (dragDistanceRef.current < DRAG_THRESHOLD) {
            openLightbox(index).then();
        }
    };

    const openLightbox = async (index: number) => {
        setPhotoIndex(index);
        await new Promise(resolve => setTimeout(resolve, 200));
        setLightboxOpen(true);
    };

    const handleImageLoad = (imageId: string, event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        setImageDimensions(prev => ({
            ...prev,
            [imageId]: { width: img.naturalWidth, height: img.naturalHeight }
        }));
    };

    return {
        lightboxOpen,
        setLightboxOpen,
        photoIndex,
        setPhotoIndex,
        imageDimensions,
        scrollContainerRef,
        isDragging,
        startX,
        scrollLeft,
        handleMouseDown,
        handleMouseUpOrLeave,
        handleMouseMove,
        openLightbox,
        handleImageClick,
        handleImageLoad,
    };
}
