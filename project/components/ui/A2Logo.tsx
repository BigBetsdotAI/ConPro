import * as React from "react";

export function A2Logo({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="url(#a2-gradient)" />
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        fontWeight="bold"
        fontSize="16"
        fill="white"
        fontFamily="inherit"
        dy=".1em"
      >
        A2
      </text>
      <defs>
        <linearGradient id="a2-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
