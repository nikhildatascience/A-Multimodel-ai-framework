import React from 'react';

const commonProps = {
    className: "h-16 w-16 mb-4 text-blue-500 group-hover:text-blue-600 transition-colors",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
} as const;

export const BrainIcon: React.FC = () => (
    <svg {...commonProps}>
        <path d="M9.5 2.5c1.7-1.3 3.3-1.3 5 0" />
        <path d="M4.5 9c-1.3 1.7-1.3 3.3 0 5M19.5 9c1.3 1.7 1.3 3.3 0 5" />
        <path d="M2.5 14.5c1.7 1.3 3.3 1.3 5 0M16.5 19.5c1.7-1.3 3.3-1.3 5 0" />
        <path d="M9.5 21.5c1.7 1.3 3.3 1.3 5 0" />
        <path d="M2.5 9.5c-1.7-1.3-1.7-3.3 0-5M16.5 4.5c1.7 1.3 1.7 3.3 0 5" />
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

export const BoneIcon: React.FC = () => (
    <svg {...commonProps}>
        <path d="M8 12.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
        <path d="M16 18.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
        <path d="M10.5 9.5l3 3" />
        <path d="M8 12.5L5 15.5" />
        <path d="M16 11.5L19 8.5" />
    </svg>
);

export const EyeIcon: React.FC = () => (
    <svg {...commonProps}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

export const SkinIcon: React.FC = () => (
    <svg {...commonProps}>
        <path d="M14.5 3.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        <path d="M18.5 7.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        <path d="M5.5 7.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        <path d="M9.5 11.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        <path d="M12 21.5a8 8 0 000-16" />
        <path d="M12 3.5a8 8 0 010 16" />
    </svg>
);
