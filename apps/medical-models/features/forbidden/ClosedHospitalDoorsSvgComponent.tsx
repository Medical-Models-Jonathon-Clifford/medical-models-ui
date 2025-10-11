export function ClosedHospitalDoors() {
  return (
    <svg
      className="w-64 h-64 mx-auto"
      viewBox="0 0 200 200"
      height="100%"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="100" cy="100" r="95" fill="#E0F2FE" />

      {/* Door Frame */}
      <rect x="30" y="40" width="140" height="120" rx="5" fill="#9CA3AF" />
      <rect x="35" y="45" width="130" height="110" rx="2" fill="#E5E7EB" />

      {/* Left Door */}
      <g>
        <rect
          x="35"
          y="45"
          width="65"
          height="110"
          fill="#F9FAFB"
          stroke="#D1D5DB"
          strokeWidth="1"
        />
        {/* Window */}
        <rect x="50" y="60" width="35" height="40" rx="5" fill="#9CA3AF" />
        <rect
          x="52.5"
          y="62.5"
          width="30"
          height="35"
          rx="3"
          fill="#E0F2FE"
          stroke="#F9FAFB"
          strokeWidth="1"
        />
        {/* Push Plate */}
        <rect x="85" y="85" width="8" height="30" rx="2" fill="#D1D5DB" />
      </g>

      {/* Right Door */}
      <g>
        <rect
          x="100"
          y="45"
          width="65"
          height="110"
          fill="#F9FAFB"
          stroke="#D1D5DB"
          strokeWidth="1"
        />
        {/* Window */}
        <rect x="115" y="60" width="35" height="40" rx="5" fill="#9CA3AF" />
        <rect
          x="117.5"
          y="62.5"
          width="30"
          height="35"
          rx="3"
          fill="#E0F2FE"
          stroke="#F9FAFB"
          strokeWidth="1"
        />
        {/* Push Plate */}
        <rect x="107" y="85" width="8" height="30" rx="2" fill="#D1D5DB" />
      </g>

      {/* Center line */}
      <line
        x1="100"
        y1="45"
        x2="100"
        y2="155"
        stroke="#D1D5DB"
        strokeWidth="1"
      />

      {/* "No Entry" Sign, scaled and centered over the doors */}
      <g transform="translate(100, 100) scale(0.6)">
        <circle
          cx="0"
          cy="0"
          r="35"
          fill="#FEE2E2"
          stroke="#DC2626"
          strokeWidth="2"
        />
        <circle cx="0" cy="0" r="30" fill="#EF4444" />
        <rect x="-22" y="-6" width="44" height="12" fill="white" rx="3" />
      </g>
    </svg>
  );
}
