import React from "react"

/**
 * Trống đồng Đông Sơn chi tiết cao (Detailed Dong Son Bronze Drum)
 * Thể hiện đầy đủ: Ngôi sao 14 cánh, hoạ tiết lông công, chim Lạc bay, răng cưa và chấm tròn tiếp tuyến.
 */
export function DongSonDrum({
  size = 280,
  color = "#f5d485",
  opacity = 0.45,
  className = "",
}: {
  size?: number | string
  color?: string
  opacity?: number
  className?: string
}) {
  const cx = 200
  const cy = 200

  // 1. Ngôi sao 14 cánh ở tâm
  const numPoints = 14
  const starOuterR = 48
  const starInnerR = 18
  const starPoints: string[] = []
  const featherTriangles: React.ReactNode[] = []

  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints - Math.PI / 2
    const r = i % 2 === 0 ? starOuterR : starInnerR
    starPoints.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }

  // Họa tiết lông đuôi công / tam giác giữa các cánh sao
  for (let i = 0; i < numPoints; i++) {
    const midAngle = ((i * 2 + 1) * Math.PI) / numPoints - Math.PI / 2
    const p1Angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2
    const p2Angle = ((i * 2 + 2) * Math.PI) / numPoints - Math.PI / 2
    const rBase = starInnerR + 2
    const rTip = starOuterR - 8

    featherTriangles.push(
      <g key={`feather-${i}`}>
        <polygon
          points={`
            ${cx + rBase * Math.cos(p1Angle)},${cy + rBase * Math.sin(p1Angle)} 
            ${cx + rTip * Math.cos(midAngle)},${cy + rTip * Math.sin(midAngle)} 
            ${cx + rBase * Math.cos(p2Angle)},${cy + rBase * Math.sin(p2Angle)}
          `}
          fill="none"
          stroke={color}
          strokeWidth="0.8"
        />
        <line
          x1={cx + rBase * Math.cos(midAngle)}
          y1={cy + rBase * Math.sin(midAngle)}
          x2={cx + rTip * Math.cos(midAngle)}
          y2={cy + rTip * Math.sin(midAngle)}
          stroke={color}
          strokeWidth="0.6"
        />
      </g>
    )
  }

  // 2. Vòng chim Lạc (10 con chim hạc sải cánh dài bay ngược chiều kim đồng hồ)
  const numBirds = 10
  const birdRadius = 138
  const birdElements = Array.from({ length: numBirds }).map((_, i) => {
    const deg = (i * 360) / numBirds
    return (
      <g key={`bird-${i}`} transform={`rotate(${deg} ${cx} ${cy})`}>
        {/* Thân và cánh chim Lạc */}
        <path
          d={`M ${cx + 105} ${cy - 8}
              Q ${cx + 120} ${cy - 12} ${cx + 138} ${cy - 3}
              Q ${cx + 146} ${cy - 2} ${cx + 158} ${cy - 8}
              Q ${cx + 150} ${cy + 2} ${cx + 138} ${cy + 4}
              Q ${cx + 120} ${cy + 6} ${cx + 105} ${cy + 2}
              Z`}
          fill={color}
        />
        {/* Mỏ dài vươn về phía trước */}
        <path
          d={`M ${cx + 158} ${cy - 8} Q ${cx + 172} ${cy - 12} ${cx + 182} ${cy - 14} Q ${cx + 172} ${cy - 8} ${cx + 160} ${cy - 6} Z`}
          fill={color}
        />
        {/* Đuôi xoè dài vút ngược */}
        <path
          d={`M ${cx + 105} ${cy - 8} 
              L ${cx + 86} ${cy - 20} 
              L ${cx + 94} ${cy - 10} 
              L ${cx + 82} ${cy - 14} 
              L ${cx + 96} ${cy - 5} 
              Z`}
          fill={color}
        />
        {/* Chân chim duỗi thẳng */}
        <line
          x1={cx + 115}
          y1={cy + 4}
          x2={cx + 95}
          y2={cy + 12}
          stroke={color}
          strokeWidth="1"
        />
      </g>
    )
  })

  // 3. Vòng răng cưa (Sawtooth)
  const sawtoothCount = 48
  const stR1 = 82
  const stR2 = 92
  const sawtoothLines: React.ReactNode[] = []
  for (let i = 0; i < sawtoothCount; i++) {
    const a1 = (i * 2 * Math.PI) / sawtoothCount
    const a2 = ((i * 2 + 1) * Math.PI) / sawtoothCount
    const a3 = ((i * 2 + 2) * Math.PI) / sawtoothCount
    sawtoothLines.push(
      <polygon
        key={`st-${i}`}
        points={`
          ${cx + stR1 * Math.cos(a1)},${cy + stR1 * Math.sin(a1)}
          ${cx + stR2 * Math.cos(a2)},${cy + stR2 * Math.sin(a2)}
          ${cx + stR1 * Math.cos(a3)},${cy + stR1 * Math.sin(a3)}
        `}
        fill={color}
      />
    )
  }

  // 4. Vòng người múa vũ trang / chấm tiếp tuyến ngoài
  const tangentCircleCount = 56
  const tgR = 176
  const tangentDots = Array.from({ length: tangentCircleCount }).map((_, i) => {
    const a = (i * 2 * Math.PI) / tangentCircleCount
    return (
      <circle
        key={`tg-${i}`}
        cx={cx + tgR * Math.cos(a)}
        cy={cy + tgR * Math.sin(a)}
        r="1.5"
        fill={color}
      />
    )
  })

  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="drumGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff4d0" stopOpacity="0.3" />
          <stop offset="60%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ánh sáng nền nhẹ tỏa ra từ tâm trống */}
      <circle cx={cx} cy={cy} r="190" fill="url(#drumGlow)" />

      {/* --- CÁC VÒNG ĐỒNG TÂM --- */}
      {/* Vòng ngoài cùng */}
      <circle cx={cx} cy={cy} r="196" fill="none" stroke={color} strokeWidth="2.2" />
      <circle cx={cx} cy={cy} r="190" fill="none" stroke={color} strokeWidth="1" />
      <circle cx={cx} cy={cy} r="183" fill="none" stroke={color} strokeWidth="1.2" />

      {/* Vòng chấm tròn tiếp tuyến */}
      {tangentDots}
      <circle cx={cx} cy={cy} r="170" fill="none" stroke={color} strokeWidth="1.2" />

      {/* Vòng chim Lạc */}
      <circle cx={cx} cy={cy} r="162" fill="none" stroke={color} strokeWidth="1" />
      <circle cx={cx} cy={cy} r="114" fill="none" stroke={color} strokeWidth="1" />
      <g>{birdElements}</g>

      {/* Vòng răng cưa kép */}
      <circle cx={cx} cy={cy} r="108" fill="none" stroke={color} strokeWidth="1.2" />
      <g>{sawtoothLines}</g>
      <circle cx={cx} cy={cy} r="76" fill="none" stroke={color} strokeWidth="1.2" />

      {/* Vòng chấm tròn con lộng */}
      <circle
        cx={cx}
        cy={cy}
        r="68"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="2.5 4.5"
      />
      <circle cx={cx} cy={cy} r="58" fill="none" stroke={color} strokeWidth="1.2" />

      {/* Ngôi sao 14 cánh & lông công ở tâm */}
      {featherTriangles}
      <polygon points={starPoints.join(" ")} fill={color} />
      <circle cx={cx} cy={cy} r="14" fill="none" stroke="#0a1931" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="6" fill="#fff4d0" />
    </svg>
  )
}

/**
 * Mũ cử nhân tốt nghiệp (Graduation Cap / Mortarboard)
 */
export function GraduationCapIcon({
  size = 56,
  color = "#f5d485",
  className = "",
}: {
  size?: number | string
  color?: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 100 80"
      width={size}
      height={(Number(size) * 80) / 100}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Vành mũ dưới (Skull cap) */}
      <path
        d="M26 36 V48 C26 58, 74 58, 74 48 V36"
        fill={color}
        opacity="0.85"
      />

      {/* Mặt nón hình thoi phía trên */}
      <polygon
        points="50,14 90,32 50,48 10,32"
        fill={color}
      />
      <polygon
        points="50,18 82,32 50,44 18,32"
        fill="#fff8dc"
        opacity="0.35"
      />

      {/* Nút tròn ở đỉnh */}
      <circle cx="50" cy="31" r="3" fill="#ffffff" />

      {/* Dây tua rua (Tassel) */}
      <path
        d="M50 31 Q70 34 80 48 Q84 54 86 64"
        stroke={color}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Chùm tua rua ở đuôi dây */}
      <polygon
        points="83,64 89,64 91,74 81,74"
        fill={color}
      />
    </svg>
  )
}

/**
 * Họa tiết hoa văn góc nhọn ở đáy vạt sash (Corner Flourish)
 */
export function CornerFlourish({
  color = "#f5d485",
  className = "",
}: {
  color?: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 120 50"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Cuộn hoa văn bên trái */}
      <path d="M60 42 C54 34, 46 28, 36 28 C26 28, 20 34, 14 30 C10 27, 12 22, 18 22 C26 22, 32 30, 42 34" />
      <path d="M42 30 C34 22, 28 18, 16 18" strokeWidth="0.8" opacity="0.75" />

      {/* Cuộn hoa văn bên phải (đối xứng) */}
      <path d="M60 42 C66 34, 74 28, 84 28 C94 28, 100 34, 106 30 C110 27, 108 22, 102 22 C94 22, 88 30, 78 34" />
      <path d="M78 30 C86 22, 92 18, 104 18" strokeWidth="0.8" opacity="0.75" />

      {/* Mũi nhọn trung tâm */}
      <polygon points="60,46 58,40 60,37 62,40" fill={color} stroke="none" />
      <circle cx="60" cy="33" r="1.8" fill={color} stroke="none" />
      <circle cx="50" cy="36" r="1.2" fill={color} stroke="none" />
      <circle cx="70" cy="36" r="1.2" fill={color} stroke="none" />
    </svg>
  )
}
