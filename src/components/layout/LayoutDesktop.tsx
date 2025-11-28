import React from "react";

interface LayoutDesktopProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    rightSidebar?: React.ReactNode;
    isAuthenticated?: boolean;
}

const LayoutDesktop: React.FC<LayoutDesktopProps> = ({
                                                         children,
                                                         header,
                                                         sidebar,
                                                         rightSidebar,
                                                         isAuthenticated = false,
                                                     }) => {
    return (
        <div className="min-h-screen bg-[var(--bg-body)]">
            {/* LEFT SIDEBAR */}
            {sidebar}

            {/* MAIN CONTENT WRAPPER */}
            <>
                <div style={{ '--header-height': '0' } as React.CSSProperties}>
                    <div className="relative box-border z-0">
                        <div className="flex flex-col relative z-0">
                            <div className="top-[var(--header-height)] min-h-[calc(100vh-var(--header-height))] flex flex-col relative">
                                <div className="flex flex-col relative z-0 min-h-inherit">
                                    <div className="flex items-center flex-row">
                                        <div className="w-full flex justify-center [align-content:center] box-border [padding-inline-end:20px] bg-[var(--barcelona-secondary-background)] [padding-inline-start:20px]">
                                            <div className="min-h-screen flex">
                                                <div className="max-w-[var(--barcelona-column-layout-max-width)] w-[var(--barcelona-column-layout-max-width)] flex flex-col flex-grow [container-type:inline-size]">
                                                    {/* Header container */}
                                                    <div className="w-full min-h-[60px] top-0 sticky flex items-center z-1">
                                                        {/* Left Corner Border Radius */}
                                                        <div
                                                            className="absolute top-[48px] h-[36px] w-[36px] overflow-hidden z-1"
                                                            style={{ insetInlineStart: '-12px' }}
                                                        >
                                                            <div
                                                                className="absolute h-[48px] w-[48px]"
                                                                style={{
                                                                    top: '12px',
                                                                    insetInlineStart: '12px',
                                                                    borderStyle: 'solid',
                                                                    borderWidth: '.5px',
                                                                    borderColor: 'var(--barcelona-primary-column-outline)',
                                                                    borderRadius: '24px',
                                                                    boxShadow: '0 0 12px 0 var(--barcelona-box-shadow-04), 0 0 0 48px var(--barcelona-secondary-background)',
                                                                }}
                                                            />
                                                        </div>

                                                        {/* spacer */}
                                                        <div
                                                            className="absolute box-content h-[12px] top-[48px] w-[calc(100%-46px)] overflow-hidden z-[1]"
                                                            style={{
                                                                insetInlineStart: '24px',
                                                                borderBottomStyle: 'solid',
                                                                borderBottomColor: 'var(--barcelona-primary-column-outline)',
                                                                borderBottomWidth: '.5px',
                                                                borderTopStyle: 'solid',
                                                                borderTopColor: 'var(--barcelona-primary-column-outline)',
                                                                borderInlineStartStyle: 'solid',
                                                                borderInlineStartColor: 'var(--barcelona-primary-column-outline)',
                                                                borderInlineEndStyle: 'solid',
                                                                borderInlineEndColor: 'var(--barcelona-primary-column-outline)',
                                                            }}
                                                        >
                                                            <div
                                                                className="relative h-full w-full"
                                                                style={{ top: '100%', boxShadow: '0 0 12px 0 var(--barcelona-box-shadow-04)' }}
                                                            />
                                                        </div>

                                                        {/* Right Corner Border Radius */}
                                                        <div className="absolute top-[48px] h-[36px] w-[36px] overflow-hidden z-[1]" style={{ insetInlineEnd: '-12px' }}>
                                                            <div
                                                                className="absolute h-[48px] w-[48px]"
                                                                style={{
                                                                    top: '12px',
                                                                    insetInlineEnd: '12px',
                                                                    borderStyle: 'solid',
                                                                    borderWidth: '.5px',
                                                                    borderColor: 'var(--barcelona-primary-column-outline)',
                                                                    borderRadius: '24px',
                                                                    boxShadow: '0 0 12px 0 var(--barcelona-box-shadow-04), 0 0 0 48px var(--barcelona-secondary-background)',
                                                                }}
                                                            />
                                                        </div>

                                                        {header && (
                                                            <div
                                                                className="w-full h-[60px] top-0 absolute box-border touch-none grid justify-center z-0 opacity-100 bg-[var(--barcelona-secondary-background)] [padding-inline-start:16px] [padding-inline-end:16px] [column-gap:16px] [align-content:center] [grid-template-columns:1fr_minmax(auto,_80%)_1fr] [inset-inline-start:0px] [inset-inline-end:-12px]"
                                                            >
                                                                {header}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="overscroll-y-auto border-t-[.5px] w-full pt-0 overflow-x-hidden min-h-0 border-b-[.5px] bg-[var(--barcelona-elevated-background)] flex-shrink flex-col box-border flex relative z-0 flex-grow"
                                                        style={{
                                                            borderBottomColor: 'var(--barcelona-primary-column-outline)',
                                                            borderTopColor: 'var(--barcelona-primary-column-outline)',
                                                            borderInlineStartColor: 'var(--barcelona-primary-column-outline)',
                                                            borderInlineEndColor: 'var(--barcelona-primary-column-outline)',
                                                            borderInlineStartWidth: '.5px',
                                                            borderInlineEndWidth: '.5px',
                                                            borderInlineStartStyle: 'solid',
                                                            borderInlineEndStyle: 'solid',
                                                            perspective: '1px',
                                                            perspectiveOrigin: 'right top',
                                                            willChange: 'transform, scroll-position',
                                                            transformStyle: 'preserve-3d',
                                                            boxShadow: '0 0 12px 0 var(--barcelona-box-shadow-04)',
                                                            flexBasis: '100%',
                                                            scrollbarWidth: 'none',
                                                        }}
                                                    >
                                                        {/*<div className="w-12 h-12 absolute top-3 start-3 border-[0.5px] border-[var(--barcelona-primary-column-outline)] rounded-3xl"></div>*/}
                                                        <div className="flex flex-col">
                                                            {children}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            {/* RIGHT SIDEBAR (FIXED) */}
            {isAuthenticated ? null : rightSidebar}
        </div>
    );
};

export default LayoutDesktop;
