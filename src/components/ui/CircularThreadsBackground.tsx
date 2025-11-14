interface CircularThreadsBackgroundProps {
    className?: string;
    size?: number;
    text?: string;
    fontSize?: number;
}

const CircularThreadsBackground = ({
                                       className = "",
                                       size = 500,
                                       text = "THREADS SAVE THE THREADS SAVE THE THREADS SAVE THE —",
                                       fontSize = 32,
                                   }: CircularThreadsBackgroundProps) => {
    const radius = size / 2 - 50;

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={`absolute ${className}`}
        >
            <defs>
                <path
                    id="circlePath"
                    d={`
                        M ${size / 2}, ${size / 2}
                        m -${radius}, 0
                        a ${radius},${radius} 0 1,1 ${radius * 2},0
                        a ${radius},${radius} 0 1,1 -${radius * 2},0
                    `}
                />
            </defs>

            <text fill="white" fontSize={fontSize} fontFamily="Arial" fontWeight="bold">
                <textPath href="#circlePath" startOffset="0%">
                    {text}
                </textPath>
            </text>
        </svg>
    );
};

export default CircularThreadsBackground;
