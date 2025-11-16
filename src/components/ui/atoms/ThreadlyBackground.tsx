// src/components/ui/ThreadlyBackground.tsx
"use client";

import React from "react";

interface ThreadlyBackgroundProps {
    size?: number;
    loops?: number;
    text?: string;
    fontSize?: number;
}

const ThreadlyBackground = ({
                                size = 1000,
                                loops = 10,
                                text = "THREADLY THREADLY THREADLY THREADLY ",
                                fontSize = 40,
                            }: ThreadlyBackgroundProps) => {
    const loopPath = `
      M ${size / 2}, 80
      C ${size * 0.9}, 80 ${size * 0.9}, ${size - 80} ${size / 2}, ${size - 80}
      C ${size * 0.1}, ${size - 80} ${size * 0.1}, 80 ${size / 2}, 80
    `;

    const angleStep = (Math.PI * 2) / loops;
    const baseRotation = 360 / loops;
    const radius = size * 0.25;

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            {Array.from({ length: loops }).map((_, i) => {
                const angle = angleStep * i;
                const rotation = baseRotation * i;
                const factor = loops > 1 ? i / (loops - 1) : 0;
                const scale = 0.6 + factor * 0.8;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <svg
                        key={i}
                        width="100%"
                        height="200%"
                        viewBox={`0 0 ${size} ${size}`}
                        preserveAspectRatio="none"
                        className="absolute"
                        style={{
                            left: "1%",
                            top: "-163%",
                            transform: `
                                translate(${x}px, ${y}px)
                                rotate(${rotation}deg)
                                scale(${scale})
                            `,
                            transformOrigin: "center",
                        }}
                    >
                        <defs>
                            <path id={`loop-${i}`} d={loopPath} fill="none" />
                        </defs>

                        <text
                            fill="#a8a8a8"
                            fontSize={fontSize}
                            fontFamily="Arial"
                            fontWeight="bold"
                            letterSpacing="4px"
                        >
                            <textPath href={`#loop-${i}`}>
                                {text.repeat(10)}
                            </textPath>
                        </text>
                    </svg>
                );
            })}
        </div>
    );
};

export default ThreadlyBackground;
