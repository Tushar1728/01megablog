import React from "react";

function Logo({ width = 60 }) {
    return (
        <svg
            width={width}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            {/* Document */}
            <rect
                x="10"
                y="6"
                width="44"
                height="52"
                rx="6"
                fill="white"
                stroke="#2563EB"
                strokeWidth="3"
            />

            {/* Text Lines */}
            <line
                x1="18"
                y1="20"
                x2="46"
                y2="20"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1="18"
                y1="28"
                x2="42"
                y2="28"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1="18"
                y1="36"
                x2="38"
                y2="36"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Pen */}
            <path
                d="M22 48L42 28L48 34L28 54L20 56L22 48Z"
                fill="#4F46E5"
            />

            {/* Pen Tip */}
            <circle
                cx="46"
                cy="30"
                r="3"
                fill="#4F46E5"
            />
        </svg>
    );
}

export default Logo;