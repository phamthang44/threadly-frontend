export const customScrollbar = [
    // Basic sizing - thin but visible on hover
    "[&::-webkit-scrollbar]:w-2",
    "[&::-webkit-scrollbar]:h-2",

    // The draggable thumb - hidden by default, visible on hover
    "[&::-webkit-scrollbar-thumb]:bg-[#383939]",
    "[&::-webkit-scrollbar-thumb]:rounded-full",
    "[&::-webkit-scrollbar-thumb]:transition-all",
    "[&::-webkit-scrollbar-thumb]:duration-300",
    "[&::-webkit-scrollbar-thumb:hover]:bg-[#555555]",

    // Clean transparent track
    "[&::-webkit-scrollbar-track]:bg-transparent",
    "[&::-webkit-scrollbar-button]:hidden",

    // Hide scrollbar by default, show on container hover
    "hover:[&::-webkit-scrollbar-thumb]:opacity-100",
    "[&::-webkit-scrollbar-thumb]:opacity-0"
].join(" ");
