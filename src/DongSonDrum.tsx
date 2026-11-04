import React from "react"

/**
 * Trống đồng Đông Sơn vector (Dong Son Bronze Drum)
 * Được thiết kế tỉ mỉ với ngôi sao trung tâm, vòng chim Lạc bay và các họa tiết kỷ hà truyền thống Việt Nam.
 */
export function DongSonDrum({
  size = 260,
  color = "currentColor",
  opacity = 0.22,
  className = "",
}: {
  size?: number | string
  color?: string
  opacity?: number
  className?: string
}) {
  const cx = 150
  const cy = 150
  const starR = 40
  const starInnerR = 14
  const numPoints = 14

  // Tạo tọa độ ngôi sao 14 cánh
  const starPoints: string[] = []
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints - Math.PI / 2
    const r = i % 2 === 0 ? starR : starInnerR
    starPoints.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }

  // Tạo các cánh chim Lạc (hạc bay) ngược chiều kim đồng hồ
  const birds = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
    return (
      <g key={deg} transform={`rotate(${deg} ${cx} ${cy})`}>
        {/* Thân và cánh chim Lạc cách điệu */}
        <path
          d={`M ${cx + 82} ${cy - 12} 
              Q ${cx + 94} ${cy - 10} ${cx + 106} ${cy - 2} 
              Q ${cx + 96} ${cy + 4} ${cx + 86} ${cy + 2} 
              Z`}
          fill={color}
        />
        {/* Cổ và mỏ dài vươn tới */}
        <path
          d={`M ${cx + 104} ${cy - 2} Q ${cx + 116} ${cy - 6} ${cx + 124} ${cy - 10} Q ${cx + 118} ${cy - 2} ${cx + 106} ${cy + 1} Z`}
          fill={color}
        />
        {/* Đuôi xoè */}
        <path
          d={`M ${cx + 82} ${cy - 12} L ${cx + 68} ${cy - 20} L ${cx + 74} ${cy - 10} L ${cx + 65} ${cy - 14} L ${cx + 76} ${cy - 6} Z`}
          fill={color}
        />
      </g>
    )
  })

  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Vòng ngoài cùng */}
      <circle cx={cx} cy={cy} r="146" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="142" fill="none" stroke={color} strokeWidth="0.8" />
      
      {/* Vòng chấm tròn ngoài */}
      <circle
        cx={cx}
        cy={cy}
        r="137"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="2.5 5"
      />
      <circle cx={cx} cy={cy} r="132" fill="none" stroke={color} strokeWidth="0.8" />

      {/* Vòng chim Lạc bay */}
      <circle cx={cx} cy={cy} r="126" fill="none" stroke={color} strokeWidth="0.8" />
      {birds}
      <circle cx={cx} cy={cy} r="74" fill="none" stroke={color} strokeWidth="0.8" />

      {/* Vòng họa tiết răng cưa / tam giác */}
      <circle
        cx={cx}
        cy={cy}
        r="68"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeDasharray="4 3"
      />
      <circle cx={cx} cy={cy} r="62" fill="none" stroke={color} strokeWidth="0.8" />

      {/* Vòng chấm tròn trong */}
      <circle
        cx={cx}
        cy={cy}
        r="54"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeDasharray="2 4"
      />
      <circle cx={cx} cy={cy} r="48" fill="none" stroke={color} strokeWidth="0.8" />

      {/* Ngôi sao 14 cánh ở trung tâm */}
      <polygon points={starPoints.join(" ")} fill={color} />
      <circle cx={cx} cy={cy} r="10" fill="none" stroke={color} strokeWidth="1" />
      <circle cx={cx} cy={cy} r="4" fill={color} />
    </svg>
  )
}

/**
 * Biểu tượng Mũ cử nhân tốt nghiệp (Graduation Cap / Mortarboard)
 */
export function GraduationCapIcon({
  size = 54,
  color = "var(--gold, #e5ba42)",
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
        d="M26 36 V48 C26 56, 74 56, 74 48 V36"
        fill={color}
        opacity="0.85"
      />
      
      {/* Mặt nón hình thoi phía trên */}
      <polygon
        points="50,14 88,32 50,48 12,32"
        fill={color}
      />
      <polygon
        points="50,18 82,32 50,44 18,32"
        fill="#fff4d0"
        opacity="0.25"
      />

      {/* Nút tròn ở đỉnh */}
      <circle cx="50" cy="31" r="3" fill="#fff" />

      {/* Dây tua rua (Tassel) */}
      <path
        d="M50 31 Q68 34 78 48 Q82 54 84 64"
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Chùm tua rua ở đuôi dây */}
      <polygon
        points="81,64 87,64 89,74 79,74"
        fill={color}
      />
    </svg>
  )
}

/**
 * Họa tiết hoa văn góc cổ điển ở mũi nhọn vạt sash (Corner Flourish)
 */
export function CornerFlourish({
  color = "var(--gold, #e5ba42)",
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
      <path d="M42 30 C34 22, 28 18, 16 18" strokeWidth="0.8" opacity="0.7" />
      
      {/* Cuộn hoa văn bên phải (đối xứng) */}
      <path d="M60 42 C66 34, 74 28, 84 28 C94 28, 100 34, 106 30 C110 27, 108 22, 102 22 C94 22, 88 30, 78 34" />
      <path d="M78 30 C86 22, 92 18, 104 18" strokeWidth="0.8" opacity="0.7" />

      {/* Mũi nhọn trung tâm */}
      <polygon points="60,46 58,40 60,37 62,40" fill={color} stroke="none" />
      <circle cx="60" cy="33" r="1.8" fill={color} stroke="none" />
      <circle cx="50" cy="36" r="1.2" fill={color} stroke="none" />
      <circle cx="70" cy="36" r="1.2" fill={color} stroke="none" />
    </svg>
  )
}

