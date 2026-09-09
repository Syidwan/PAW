// Illustration for the "Why It Matters" / stats section
// Depicts a team dashboard with progress charts in classic palette
const WorkspaceIllustration = () => (
  <svg
    viewBox="0 0 480 340"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
    aria-hidden="true"
  >
    {/* Main card background */}
    <rect x="0" y="0" width="480" height="340" rx="16" fill="#F9F6F0" />

    {/* Left sidebar */}
    <rect x="0" y="0" width="80" height="340" rx="16" fill="#0F2340" />
    <rect x="64" y="0" width="16" height="340" fill="#0F2340" />

    {/* Sidebar nav items */}
    <rect x="16" y="28" width="48" height="8" rx="4" fill="#E8B96A" opacity="0.7" />
    {[72, 100, 128, 156].map((y, i) => (
      <rect key={y} x="16" y={y} width={i === 0 ? 48 : 36} height="6" rx="3"
        fill={i === 0 ? "#C9923E" : "#F9F6F0"} opacity={i === 0 ? 0.9 : 0.25} />
    ))}
    {/* Sidebar avatar */}
    <circle cx="40" cy="310" r="16" fill="#1A3A6B" />
    <circle cx="40" cy="305" r="6" fill="#E8B96A" opacity="0.5" />
    <rect x="28" y="313" width="24" height="10" rx="5" fill="#E8B96A" opacity="0.4" />

    {/* Top header bar */}
    <rect x="80" y="0" width="400" height="48" fill="#EFE9DF" />
    <rect x="96" y="16" width="120" height="16" rx="5" fill="#E2DDD5" />
    <rect x="96" y="19" width="80" height="10" rx="3" fill="#6B6B6B" opacity="0.4" />
    {/* Search bar */}
    <rect x="240" y="14" width="140" height="20" rx="10" fill="#fff" />
    <rect x="254" y="20" width="70" height="8" rx="3" fill="#E2DDD5" />
    {/* Bell + avatar */}
    <circle cx="404" cy="24" r="8" fill="#EFE9DF" />
    <rect x="400" y="20" width="8" height="5" rx="1" fill="#C9923E" opacity="0.5" />
    <circle cx="428" cy="24" r="10" fill="#C9923E" opacity="0.3" />
    <circle cx="428" cy="21" r="5" fill="#E8B96A" opacity="0.7" />

    {/* ── MAIN CONTENT area ─────────────────────────── */}

    {/* Stat cards row */}
    {[
      { x: 96, color: "#C9923E", val: "24", label: "Active Tasks" },
      { x: 216, color: "#1A3A6B", val: "6", label: "In Review" },
      { x: 336, color: "#2C7A4B", val: "38", label: "Completed" },
    ].map(({ x, color, val, label }) => (
      <g key={x}>
        <rect x={x} y="60" width="100" height="58" rx="10" fill="#fff" />
        <rect x={x} y="60" width="100" height="58" rx="10" stroke="#E2DDD5" strokeWidth="1" />
        <rect x={x} y="60" width="4" height="58" rx="2" fill={color} />
        <text x={x + 14} y={85} fill={color} fontSize="22" fontWeight="bold"
          fontFamily="Georgia, serif">{val}</text>
        <rect x={x + 14} y="94" width="68" height="7" rx="3" fill="#6B6B6B" opacity="0.3" />
        <rect x={x + 14} y="103" width="48" height="5" rx="2" fill="#6B6B6B" opacity="0.2" />
      </g>
    ))}

    {/* Bar chart card */}
    <rect x="96" y="130" width="220" height="140" rx="12" fill="#fff" />
    <rect x="96" y="130" width="220" height="140" rx="12" stroke="#E2DDD5" strokeWidth="1" />
    <rect x="112" y="144" width="90" height="10" rx="3" fill="#0F2340" opacity="0.5" />
    <rect x="112" y="158" width="60" height="6" rx="3" fill="#6B6B6B" opacity="0.3" />

    {/* Bars */}
    {[
      { x: 118, h: 60, fill: "#C9923E" },
      { x: 146, h: 45, fill: "#E8B96A" },
      { x: 174, h: 70, fill: "#C9923E" },
      { x: 202, h: 38, fill: "#E8B96A" },
      { x: 230, h: 55, fill: "#C9923E" },
      { x: 258, h: 80, fill: "#C9923E" },
      { x: 286, h: 62, fill: "#E8B96A" },
    ].map(({ x, h, fill }) => (
      <g key={x}>
        <rect x={x} y={252 - h} width="18" height={h} rx="4" fill={fill} opacity="0.7" />
      </g>
    ))}
    {/* Baseline */}
    <rect x="112" y="252" width="188" height="1" fill="#E2DDD5" />

    {/* Donut chart card */}
    <rect x="336" y="130" width="140" height="140" rx="12" fill="#fff" />
    <rect x="336" y="130" width="140" height="140" rx="12" stroke="#E2DDD5" strokeWidth="1" />
    <rect x="350" y="144" width="70" height="10" rx="3" fill="#0F2340" opacity="0.5" />

    {/* Donut arcs (SVG path approximation using circles) */}
    <circle cx="406" cy="210" r="38" fill="none" stroke="#E2DDD5" strokeWidth="16" />
    <circle cx="406" cy="210" r="38" fill="none" stroke="#C9923E" strokeWidth="16"
      strokeDasharray="120 240" strokeDashoffset="0" strokeLinecap="round" />
    <circle cx="406" cy="210" r="38" fill="none" stroke="#1A3A6B" strokeWidth="16"
      strokeDasharray="72 240" strokeDashoffset="-120" strokeLinecap="round" />
    <circle cx="406" cy="210" r="38" fill="none" stroke="#2C7A4B" strokeWidth="16"
      strokeDasharray="48 240" strokeDashoffset="-192" strokeLinecap="round" opacity="0.7" />
    <circle cx="406" cy="210" r="18" fill="#fff" />
    <text x="406" y="213" textAnchor="middle" fill="#0F2340" fontSize="11" fontWeight="bold"
      fontFamily="Georgia, serif">79%</text>

    {/* Team activity row */}
    <rect x="96" y="282" width="380" height="42" rx="10" fill="#fff" />
    <rect x="96" y="282" width="380" height="42" rx="10" stroke="#E2DDD5" strokeWidth="1" />
    <rect x="110" y="293" width="70" height="8" rx="3" fill="#0F2340" opacity="0.4" />
    <rect x="110" y="305" width="50" height="5" rx="2" fill="#6B6B6B" opacity="0.25" />
    {/* Avatars cluster */}
    {[360, 378, 396, 414].map((cx, i) => (
      <circle key={cx} cx={cx} cy={303} r="11"
        fill={["#C9923E", "#1A3A6B", "#E8B96A", "#2C7A4B"][i]}
        opacity={0.7}
        stroke="#fff" strokeWidth="2" />
    ))}
    <rect x="432" y="295" width="32" height="16" rx="8" fill="#F5E6CE" />
    <rect x="438" y="300" width="20" height="6" rx="3" fill="#C9923E" opacity="0.6" />
  </svg>
);

export default WorkspaceIllustration;
