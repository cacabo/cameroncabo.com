import React from 'react'

export const RiploSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg id="prefix__Layer_1" x={0} y={0} viewBox="0 0 820 820" xmlSpace="preserve" {...props}>
    <style>{'.prefix__st0{clip-path:url(#prefix__SVGID_2_)}'}</style>
    <defs>
      <circle id="prefix__SVGID_1_" cx={410} cy={410} r={410} />
    </defs>
    <clipPath id="prefix__SVGID_2_">
      <use xlinkHref="#prefix__SVGID_1_" overflow="visible" />
    </clipPath>
    <g className="prefix__st0">
      <defs>
        <path
          id="prefix__SVGID_3_"
          d="M659.7 820H160.3C72.1 820 0 747.9 0 659.7V160.3C0 72.1 72.1 0 160.3 0h499.4C747.9 0 820 72.1 820 160.3v499.4c0 88.2-72.1 160.3-160.3 160.3z"
        />
      </defs>
      <clipPath id="prefix__SVGID_4_">
        <use xlinkHref="#prefix__SVGID_3_" overflow="visible" />
      </clipPath>
      <linearGradient
        id="prefix__SVGID_5_"
        gradientUnits="userSpaceOnUse"
        x1={410}
        y1={0}
        x2={410}
        y2={820}
        gradientTransform="matrix(1 0 0 -1 0 820)"
      >
        <stop offset={0} stopColor="#ff3871" />
        <stop offset={1} stopColor="#ff4c7c" />
      </linearGradient>
      <path clipPath="url(#prefix__SVGID_4_)" fill="url(#prefix__SVGID_5_)" d="M0 0h820v820H0z" />
    </g>
    <g className="prefix__st0">
      <defs>
        <path
          id="prefix__SVGID_6_"
          d="M659.7 820H160.3C72.1 820 0 747.9 0 659.7V160.3C0 72.1 72.1 0 160.3 0h499.4C747.9 0 820 72.1 820 160.3v499.4c0 88.2-72.1 160.3-160.3 160.3z"
        />
      </defs>
      <clipPath id="prefix__SVGID_7_">
        <use xlinkHref="#prefix__SVGID_6_" overflow="visible" />
      </clipPath>
      <g clipPath="url(#prefix__SVGID_7_)">
        <linearGradient
          id="prefix__SVGID_8_"
          gradientUnits="userSpaceOnUse"
          x1={410}
          y1={0}
          x2={410}
          y2={471.052}
          gradientTransform="matrix(1 0 0 -1 0 820)"
        >
          <stop offset={0} stopColor="#4559ff" stopOpacity={0.85} />
          <stop offset={1} stopColor="#5065ff" />
        </linearGradient>
        <path
          d="M820 407.3V820H0V407.3c100.8-100.8 251.9-50.9 404 0 155.1 51.9 311.2 104.8 416 0z"
          fill="url(#prefix__SVGID_8_)"
        />
      </g>
    </g>
  </svg>
)
