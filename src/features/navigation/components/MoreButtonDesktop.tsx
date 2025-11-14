import React from "react";

const MoreButtonDesktop: React.FC = () => {
    return (
        <svg aria-label="More" role="img" viewBox="0 0 24 24"
             style={
                    { width: '24px', height: '24px', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' }
             }><title>More</title>
            <rect  rx="1.25" x="3" y="7"></rect>
            <rect  rx="1.25" x="3" y="15"></rect>
        </svg>
    );
}
export default MoreButtonDesktop;