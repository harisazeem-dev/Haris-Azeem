import React from 'react';

interface BrandLogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * Custom Geometric Vector Monogram for Haris Azeem (H + A + Modular Block Node)
 */
export const BrandLogoMark: React.FC<BrandLogoMarkProps> = ({
  className = '',
  size = 34,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Architectural Frame */}
      <rect
        x="1.5"
        y="1.5"
        width="37"
        height="37"
        rx="9"
        fill="#121216"
        stroke="#27272A"
        strokeWidth="1.5"
      />
      {/* Subtle Inner Grid Corner Accents */}
      <path
        d="M7 11V7H11"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33 29V33H29"
        stroke="#F59E0B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left Pillar of H */}
      <path
        d="M11.5 11V29"
        stroke="#FAFAFA"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Right Pillar of H / Leg of A */}
      <path
        d="M28.5 11V29"
        stroke="#FAFAFA"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Diagonal Ascender of A */}
      <path
        d="M11.5 24.5L22.5 11"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Horizontal Crossbar uniting H and A */}
      <path
        d="M11.5 21H28.5"
        stroke="#FAFAFA"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Modular Gutenberg Block Node at Top-Left Apex */}
      <rect
        x="16.5"
        y="9.5"
        width="4.5"
        height="4.5"
        rx="1"
        fill="#F59E0B"
      />
    </svg>
  );
};

export const RAW_HARIS_LOGO_SVG = `<svg width="120" height="120" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="37" height="37" rx="9" fill="#121216" stroke="#27272A" stroke-width="1.5"/>
  <path d="M7 11V7H11" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M33 29V33H29" stroke="#F59E0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.5 11V29" stroke="#FAFAFA" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M28.5 11V29" stroke="#FAFAFA" stroke-width="3.2" stroke-linecap="round"/>
  <path d="M11.5 24.5L22.5 11" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <path d="M11.5 21H28.5" stroke="#FAFAFA" stroke-width="2.8" stroke-linecap="round"/>
  <rect x="16.5" y="9.5" width="4.5" height="4.5" rx="1" fill="#F59E0B"/>
</svg>`;
