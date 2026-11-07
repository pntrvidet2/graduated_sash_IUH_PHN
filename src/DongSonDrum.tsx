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
 * Biểu tượng Mũ Cử Nhân Hoàng Gia (Royal Academic Graduation Cap)
 * Thiết kế đồ họa vector 3D ánh kim sang trọng, trang trọng chuẩn lễ tốt nghiệp:
 * - Tấm mortarboard đa diện vát cạnh 3D sắc nét
 * - Đai nón (skullcap) uốn cong có chiều sâu đổ bóng thực tế
 * - Dây tua rua lụa (silk tassel) rủ mềm mại với khuyên vàng và nếp sợi tinh tế
 * - Dải màu chuyển tiếp nhũ vàng ánh kim (metallic gold foil luster) quý phái
 */
export function GraduationCapIcon({
  size = 54,
  color = "#dfb143",
  className = "",
}: {
  size?: number | string
  color?: string
  className?: string
}) {
  const numSize = typeof size === "number" ? size : parseFloat(size) || 54
  return (
    <svg
      viewBox="0 0 100 80"
      width={numSize}
      height={(numSize * 80) / 100}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient mặt trên nón cử nhân */}
        <linearGradient id="cap-foil-top" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#fff6d2" />
          <stop offset="25%" stopColor="#f3cb62" />
          <stop offset="60%" stopColor="#d59e2b" />
          <stop offset="100%" stopColor="#ffe99b" />
        </linearGradient>

        {/* Gradient vát mép trước (bevel rim 3D) */}
        <linearGradient id="cap-bevel-left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9a6e12" />
          <stop offset="100%" stopColor="#b6841b" />
        </linearGradient>
        <linearGradient id="cap-bevel-right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0b23f" />
          <stop offset="100%" stopColor="#9a6e12" />
        </linearGradient>

        {/* Gradient thân nón đội đầu (skull cap) */}
        <linearGradient id="cap-skull-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8d6411" />
          <stop offset="35%" stopColor="#e2b542" />
          <stop offset="70%" stopColor="#f2cb63" />
          <stop offset="100%" stopColor="#7a550a" />
        </linearGradient>

        {/* Gradient dây tua rua */}
        <linearGradient id="cap-tassel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8dd" />
          <stop offset="40%" stopColor="#e5bb47" />
          <stop offset="85%" stopColor="#9e7115" />
        </linearGradient>
      </defs>

      {/* 1. Phần vòm nón đội đầu (Skull Cap Base) */}
      <path
        d="M 28 34 V 44 C 28 54, 72 54, 72 44 V 34 C 62 37, 38 37, 28 34 Z"
        fill="url(#cap-skull-grad)"
      />
      {/* Vành ôm gáy dưới nón */}
      <path
        d="M 33 44 C 33 50.5, 67 50.5, 67 44"
        stroke="#ffd878"
        strokeWidth="0.8"
        fill="none"
        opacity="0.8"
      />

      {/* 2. Mép vát 3D dưới đáy mặt nón (Bevel edges tạo độ dày kim loại) */}
      {/* Mép vát bên trái (trong bóng râm) */}
      <polygon
        points="10,28 50,44 50,47 10,31"
        fill="url(#cap-bevel-left)"
      />
      {/* Mép vát bên phải (bắt sáng) */}
      <polygon
        points="50,44 90,28 90,31 50,47"
        fill="url(#cap-bevel-right)"
      />

      {/* 3. Tấm hình thoi mặt trên nón cử nhân (Mortarboard Top) */}
      <polygon
        points="50,11 90,28 50,44 10,28"
        fill="url(#cap-foil-top)"
      />

      {/* Đường gân ánh kim vát chéo tinh xảo trên mặt nón */}
      <polyline
        points="10,28 50,11 90,28"
        stroke="#ffffff"
        strokeWidth="0.75"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="50"
        y1="11"
        x2="50"
        y2="44"
        stroke="#ffffff"
        strokeWidth="0.45"
        opacity="0.4"
      />
      <line
        x1="10"
        y1="28"
        x2="90"
        y2="28"
        stroke="#9a6e12"
        strokeWidth="0.4"
        opacity="0.35"
      />

      {/* 4. Khuy tròn đính tâm nón (Central Button Stud) */}
      <circle cx="50" cy="27.5" r="3.2" fill="#88600d" />
      <circle cx="50" cy="27" r="2.5" fill="url(#cap-foil-top)" />
      <circle cx="49" cy="26" r="0.8" fill="#ffffff" />

      {/* 5. Dây tua rua học thuật (Academic Tassel) */}
      {/* Dây lụa rủ từ đỉnh sang mép phải */}
      <path
        d="M 50 27 Q 66 29, 75 37 Q 81 44, 83 52"
        stroke="url(#cap-tassel-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Khuyên kim loại giữ chùm tua (Tassel Ferrule Band) */}
      <rect
        x="80.5"
        y="52"
        width="5"
        height="3"
        rx="0.9"
        fill="#ffe290"
        stroke="#8d6411"
        strokeWidth="0.5"
      />
      {/* Chùm sợi tua rua xòe tự nhiên (Tassel Skirt / Fringe) */}
      <path
        d="M 81 55 L 78.5 71.5 C 78.5 73, 87.5 73, 87.5 71.5 L 85 55 Z"
        fill="url(#cap-tassel-grad)"
      />
      {/* Các sợi tua rua óng ánh */}
      <line x1="80.5" y1="56" x2="79.5" y2="71" stroke="#fff8dd" strokeWidth="0.5" opacity="0.8" />
      <line x1="83" y1="56" x2="83" y2="72" stroke="#9a6e12" strokeWidth="0.5" opacity="0.6" />
      <line x1="85.5" y1="56" x2="86.5" y2="71" stroke="#fff8dd" strokeWidth="0.5" opacity="0.8" />
    </svg>
  )
}

/**
 * Họa tiết hoa văn góc nhọn ở đáy vạt sash (Victorian / Baroque Filigree Corner Flourish)
 * Tái hiện chính xác theo ảnh thực tế dải sash IUH:
 * - Không có đường viền thẳng chồng lấn lên border của sash
 * - Độ dốc đáy chuẩn xác theo góc nhọn chữ V của vạt (tỷ lệ 60/70)
 * - Hoa văn Baroque thanh thoát, quý phái với ngọn giáo trung tâm, vòng cuộn dây leo và hạt ngọc
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
      viewBox="0 0 90 40"
      width="90"
      height="40"
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* 1. Mũi giáo & lá trung tâm vút nhọn */}
      <path
        d="M 45 6 C 43.5 12, 43.5 22, 45 28 C 46.5 22, 46.5 12, 45 6 Z"
        fill="#fff4d0"
        stroke="none"
      />
      <circle cx="45" cy="4" r="1.2" fill="#fff4d0" stroke="none" />
      <circle cx="45" cy="31" r="1" fill={color} stroke="none" />
      <circle cx="45" cy="34" r="0.75" fill={color} stroke="none" />

      {/* 2. Nhánh hoa văn cuộn Baroque bên trái */}
      <path
        d="M 45 24 C 39 23, 29 19, 23 14 C 19 11, 20 7, 24 6 C 28 5, 30 9, 27 12 C 24 14, 19 13, 16 9"
        stroke={color}
        strokeWidth="0.9"
        fill="none"
      />
      <path
        d="M 45 28 C 41 29, 34 26, 29 21 C 24 16, 22 12, 23 10"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M 37 20 C 32 17, 29 12, 31 8"
        stroke={color}
        strokeWidth="0.65"
        fill="none"
        opacity="0.7"
      />
      {/* Lá phụ bên trái */}
      <path d="M 22 11 C 18 9, 16 6, 18 4 C 20 4, 23 7, 24 9 Z" fill={color} stroke="none" />
      <path d="M 32 16 C 29 14, 27 12, 28 10 C 30 10, 33 13, 34 15 Z" fill={color} stroke="none" />
      {/* Chuỗi hạt ngọc bên trái */}
      <circle cx="40" cy="23" r="0.95" fill="#fff4d0" stroke="none" />
      <circle cx="32" cy="18" r="0.9" fill="#fff4d0" stroke="none" />
      <circle cx="24" cy="12" r="0.8" fill="#fff4d0" stroke="none" />
      <circle cx="17" cy="6" r="0.75" fill="#fff4d0" stroke="none" />

      {/* 3. Nhánh hoa văn cuộn Baroque bên phải (đối xứng hoàn hảo) */}
      <path
        d="M 45 24 C 51 23, 61 19, 67 14 C 71 11, 70 7, 66 6 C 62 5, 60 9, 63 12 C 66 14, 71 13, 74 9"
        stroke={color}
        strokeWidth="0.9"
        fill="none"
      />
      <path
        d="M 45 28 C 49 29, 56 26, 61 21 C 66 16, 68 12, 67 10"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M 53 20 C 58 17, 61 12, 59 8"
        stroke={color}
        strokeWidth="0.65"
        fill="none"
        opacity="0.7"
      />
      {/* Lá phụ bên phải */}
      <path d="M 68 11 C 72 9, 74 6, 72 4 C 70 4, 67 7, 66 9 Z" fill={color} stroke="none" />
      <path d="M 58 16 C 61 14, 63 12, 62 10 C 60 10, 57 13, 56 15 Z" fill={color} stroke="none" />
      {/* Chuỗi hạt ngọc bên phải */}
      <circle cx="50" cy="23" r="0.95" fill="#fff4d0" stroke="none" />
      <circle cx="58" cy="18" r="0.9" fill="#fff4d0" stroke="none" />
      <circle cx="66" cy="12" r="0.8" fill="#fff4d0" stroke="none" />
      <circle cx="73" cy="6" r="0.75" fill="#fff4d0" stroke="none" />

      {/* 4. Vòng cung vương miện trên liên kết 2 cánh */}
      <path d="M 37 8 Q 45 3 53 8" stroke={color} strokeWidth="0.7" fill="none" opacity="0.8" />
      <polygon points="45,1 46.2,3 45,5 43.8,3" fill="#fff4d0" stroke="none" />
    </svg>
  )
}

/**
 * Họa tiết bướm bay nghệ thuật (Artistic Fluttering Butterfly)
 * Tái hiện chính xác theo ảnh thực tế dải sash IUH
 */
export function ButterflyIcon({
  x = 38,
  y = 175,
  size = 28,
  color = "#e5ba42",
}: {
  x?: number
  y?: number
  size?: number
  color?: string
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${size / 40}) rotate(-18)`} stroke={color} fill="none">
      {/* Cánh trên trái */}
      <path
        d="M 20 20 C 14 11, 4 8, 2 16 C 0 24, 14 26, 19 22"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Cánh dưới trái */}
      <path
        d="M 19 22 C 10 26, 6 34, 12 37 C 18 38, 20 29, 21 24"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Gân cánh trái */}
      <path d="M 12 18 Q 8 16 5 20" strokeWidth="0.6" opacity="0.75" />
      <path d="M 14 28 Q 10 32 12 34" strokeWidth="0.6" opacity="0.75" />

      {/* Cánh trên phải */}
      <path
        d="M 21 20 C 27 10, 37 8, 39 16 C 41 24, 27 26, 22 22"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Cánh dưới phải */}
      <path
        d="M 22 22 C 31 26, 35 34, 29 37 C 23 38, 21 29, 20 24"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Gân cánh phải */}
      <path d="M 29 18 Q 33 16 36 20" strokeWidth="0.6" opacity="0.75" />
      <path d="M 27 28 Q 31 32 29 34" strokeWidth="0.6" opacity="0.75" />

      {/* Thân bướm */}
      <path d="M 20.5 17 Q 20.5 24 20.5 27" strokeWidth="1.5" strokeLinecap="round" />

      {/* Râu bướm uốn lượn */}
      <path d="M 20.5 17 Q 17 12 14 13" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="13.5" cy="13.5" r="0.8" fill={color} stroke="none" />
      <path d="M 20.5 17 Q 24 12 27 13" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="27.5" cy="13.5" r="0.8" fill={color} stroke="none" />
    </g>
  )
}

/**
 * Ngôi sao 4 cánh lấp lánh (Sparkle Star ✦)
 */
export function SparkleStar({
  cx,
  cy,
  r = 6,
  color = "#fff4d0",
}: {
  cx: number
  cy: number
  r?: number
  color?: string
}) {
  const d = `
    M ${cx} ${cy - r}
    Q ${cx} ${cy} ${cx + r} ${cy}
    Q ${cx} ${cy} ${cx} ${cy + r}
    Q ${cx} ${cy} ${cx - r} ${cy}
    Q ${cx} ${cy} ${cx} ${cy - r}
    Z
  `
  return (
    <g>
      <path d={d} fill={color} />
      <circle cx={cx} cy={cy} r={r * 0.2} fill="#ffffff" />
    </g>
  )
}

/**
 * Mũ cử nhân mini đội trên đỉnh số 2
 */
export function MiniGraduationCap({
  x = 60,
  y = 175,
  size = 22,
}: {
  x?: number
  y?: number
  size?: number
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${size / 22}) rotate(-16)`}>
      {/* Tấm nón hình thoi vát 3D */}
      <polygon
        points="11,2 22,7.5 11,13 0,7.5"
        fill="#f3cb62"
        stroke="#e5ba42"
        strokeWidth="0.4"
      />
      <polygon points="0,7.5 11,13 11,14.5 0,9" fill="#9a6e12" />
      <polygon points="11,13 22,7.5 22,9 11,14.5" fill="#dfb143" />
      {/* Vành mũ dưới */}
      <path d="M 6.5 11 C 6.5 14.5, 15.5 14.5, 15.5 11" fill="#9a6e12" />
      {/* Khuy tròn */}
      <circle cx="11" cy="7.5" r="1.1" fill="#fff4d0" />
      {/* Dây tua rua */}
      <path d="M 11 7.5 Q 16.5 9.5, 19 15" stroke="#fff4d0" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <polygon points="17.5,15 20,15 20.5,19 17,19" fill="#dfb143" />
    </g>
  )
}
