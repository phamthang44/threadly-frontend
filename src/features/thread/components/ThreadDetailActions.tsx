import React from "react";

interface ThreadDetailActionsProps {
    actions: {
        key: string;
        icon: React.ReactNode;
        interactionsNumber: string;
    }[];
    hoveredActionKey: string | null;
    setHoveredActionKey: (key: string | null) => void;
}

const ThreadDetailActions: React.FC<ThreadDetailActionsProps> = ({actions, hoveredActionKey, setHoveredActionKey}) => {
    return (
        <div className="mt-[6px] mb-[-4px] [margin-inline-start:-8px]">
            <div className="flex">
                {actions.map((action, i) => {
                    const isHovered = hoveredActionKey === action.key;
                    const hasNumber = parseInt(action.interactionsNumber) > 0;
                    const isHoveredThis = isHovered && hoveredActionKey === action.key;
                    return (
                        <div key={i} className="w-max justify-center flex items-center">
                            <div className="border-b-[var(--always-dark-overlay)] border-t-[var(--always-dark-overlay)] pt-0 min-w-0 mt-0 mb-0 border-t-0 min-h-0 border-b-0 [border-bottom-style:solid] [border-top-style:solid] [padding-inline-end:0] [border-start-end-radius:inherit] [border-end-start-radius:inherit] bg-transparent touch-manipulation [flex-basis:auto] [border-inline-end-color:var(--always-dark-overlay)] box-border select-none list-none flex-shrink-0 cursor-pointer [border-inline-starat-style:solid] outline-none items-stretch flex-row [border-inline-start-color:var(--always-dark-overlay)] relative z-0 [-webkit-tap-highlight-color:transparent] [border-start-start-radius:inherit] [padding-inline-start:0] [border-inline-end-style:solid] [text-align:inherit] [margin-inline-end:0] [border-inline-start-width:0] [border-end-end-radius:inherit] [border-inline-end-width:0] [text-decoration:none] [outline:none]">
                                <div className="h-9 w-auto transition-[.15s] [border-end-end-radius:1000px] [padding-inline-end:12px] justify-center flex items-center [transform:scale(1)] [border-start-end-radius:1000px] [padding-inline-start:12px] [border-start-start-radius:1000px] relative [transition-property:transform] [border-end-start-radius:1000px]">
                                    {/* Bubble background */}
                                    <div
                                        className={`
                                                                absolute bg-[#1e1e1e] transition-all duration-200 ease-out origin-center
                                                                ${isHoveredThis
                                            ? (hasNumber
                                                ? "w-[68px] h-8 scale-100 rounded-2xl opacity-100"
                                                : "w-8 h-8 scale-100 rounded-full opacity-100")
                                            : "w-8 h-8 scale-0 opacity-0 rounded-full pointer-events-none"
                                        }
                                                            `}
                                    />
                                    <div className="flex justify-center items-center [column-gap:4px]" onMouseOver={() => setHoveredActionKey(action.key)} onMouseOut={() => setHoveredActionKey(null)}>
                                        {action.icon}
                                        <span style={{'--x--base-line-clamp-line-heigh' : 'calc(1.4*1em)', '--x-lineHeight' : 'calc(1.4*1em)'} as React.CSSProperties} className=" overflow-visible min-w-0 max-w-full font-normal text-[var(--barcelona-charcoal-text)] [font-size:var(--system-13-font-size)] text-start [word-wrap:break-word] relative block [font-family:var(--system-font-family)] whitespace-pre-line leading-[var(--x-lineHeight)] [word-break:break-word] [--base-line-clamp-line-height:var(--x---base-line-clamp-line-height)] select-none list-none cursor-pointer [-webkit-tap-highlight-color:transparent] action-text">
                                                                <div className="h-[1.4em] w-[var(--x-width)] whitespace-nowrap [transition:width] [transition-duration:.5s]" style={{
                                                                    '--x-width': hasNumber ? '3.5ch' : '0ch',
                                                                    width: 'var(--x-width)',
                                                                } as React.CSSProperties}>
                                                                    {(action.interactionsNumber && parseInt(action.interactionsNumber) > 0) ? (<span className="top-0 absolute [inset-inline-start:0]">{action.interactionsNumber}</span>) : null}
                                                                </div>
                                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ThreadDetailActions;