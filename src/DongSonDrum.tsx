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
 * Họa tiết hoa văn góc nhọn ở đáy vạt sash (Victorian / Baroque Filigree Corner Flourish)
 * Tái hiện chính xác theo ảnh thực tế dải sash IUH
 */
export function CornerFlourish({
  color = "#e5ba42",
  className = "",
}: {
  color?: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 120 54"
      width="120"
      height="54"
      className={className}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* 1. Đường viền chữ V góc nhọn phía trong */}
      <path d="M 16 12 L 60 49 L 104 12" strokeWidth="1" opacity="0.9" />
      <path d="M 21 12 L 60 45.5 L 99 12" strokeWidth="0.5" opacity="0.65" strokeDasharray="1.5 1.5" />

      {/* 2. Mũi nhọn & lá trung tâm chỉ thẳng lên trên */}
      <path
        d="M 60 16 C 57 23, 57 32, 60 38 C 63 32, 63 23, 60 16 Z"
        fill="#fff4d0"
        stroke="none"
      />
      <circle cx="60" cy="41" r="1.4" fill="#fff4d0" stroke="none" />
      <circle cx="60" cy="45" r="1" fill={color} stroke="none" />
      {/* Giọt nhọn ở đáy trỏ xuống đỉnh góc V */}
      <polygon points="60,51 58.5,46 61.5,46" fill={color} stroke="none" />

      {/* 3. Cuộn hoa văn Baroque bên trái */}
      <path
        d="M 60 39 C 54 37, 48 35, 43 30 C 39 26, 39 21, 44 19 C 48 17, 52 21, 49 25 C 46 28, 40 28, 35 23"
        strokeWidth="1"
      />
      <path
        d="M 43 30 C 37 31, 30 25, 25 19 C 21 14, 24 10, 28 10 C 33 10, 34 16, 30 19"
        strokeWidth="0.8"
        opacity="0.9"
      />
      <path d="M 52 35 C 47 38, 38 34, 33 27" strokeWidth="0.6" opacity="0.75" />
      {/* Lá phụ & chuỗi hạt ngọc bên trái */}
      <path d="M 25 16 C 22 14, 20 11, 21 9 C 23 9, 26 12, 27 14" fill={color} stroke="none" />
      <path d="M 38 21 C 36 19, 33 17, 34 15 C 36 15, 38 18, 39 20" fill={color} stroke="none" />
      <circle cx="52" cy="38" r="1.1" fill="#fff4d0" stroke="none" />
      <circle cx="44" cy="32" r="1" fill="#fff4d0" stroke="none" />
      <circle cx="36" cy="26" r="0.9" fill="#fff4d0" stroke="none" />
      <circle cx="27" cy="18" r="0.8" fill="#fff4d0" stroke="none" />

      {/* 4. Cuộn hoa văn Baroque bên phải (đối xứng hoàn hảo) */}
      <path
        d="M 60 39 C 66 37, 72 35, 77 30 C 81 26, 81 21, 76 19 C 72 17, 68 21, 71 25 C 74 28, 80 28, 85 23"
        strokeWidth="1"
      />
      <path
        d="M 77 30 C 83 31, 90 25, 95 19 C 99 14, 96 10, 92 10 C 87 10, 86 16, 90 19"
        strokeWidth="0.8"
        opacity="0.9"
      />
      <path d="M 68 35 C 73 38, 82 34, 87 27" strokeWidth="0.6" opacity="0.75" />
      {/* Lá phụ & chuỗi hạt ngọc bên phải */}
      <path d="M 95 16 C 98 14, 100 11, 99 9 C 97 9, 94 12, 93 14" fill={color} stroke="none" />
      <path d="M 82 21 C 84 19, 87 17, 86 15 C 84 15, 82 18, 81 20" fill={color} stroke="none" />
      <circle cx="68" cy="38" r="1.1" fill="#fff4d0" stroke="none" />
      <circle cx="76" cy="32" r="1" fill="#fff4d0" stroke="none" />
      <circle cx="84" cy="26" r="0.9" fill="#fff4d0" stroke="none" />
      <circle cx="93" cy="18" r="0.8" fill="#fff4d0" stroke="none" />

      {/* 5. Vòng cung vương miện trên liên kết 2 cánh hoa văn */}
      <path d="M 50 21 Q 60 14 70 21" strokeWidth="0.75" opacity="0.85" />
      <circle cx="60" cy="14" r="1.3" fill="#fff4d0" stroke="none" />
      <circle cx="56" cy="15" r="0.9" fill={color} stroke="none" />
      <circle cx="64" cy="15" r="0.9" fill={color} stroke="none" />
    </svg>
  )
}
