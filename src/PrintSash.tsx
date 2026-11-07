// Print-ready sash artwork drawn in real millimetres (1 SVG unit = 1 mm).
import { IUH_LOGO_WHITE, IUH_EMBLEM_ORIGINAL } from "./assets/logoData"
import {
  DongSonDrum,
  GraduationCapIcon,
  CornerFlourish,
  ButterflyIcon,
  SparkleStar,
  MiniGraduationCap,
} from "./DongSonDrum"
import type { NameFontStyle } from "./App"

export type Side = "left" | "right"

export const SASH_W = 140
export const SASH_L = 1500
export const BLEED = 3
const SLANT = 20 // slanted neck end
const V = 70 // depth of the pointed end

const NAVY = "#0b1b3e"
const GOLD = "#e5ba42"
const IVORY = "#f1e7cf"

const SANS = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'Noto Serif Display', Georgia, serif"
const SCRIPT = "Cherish, cursive"

const tipTop = (side: Side) => (side === "left" ? [SLANT, 0] : [0, SLANT])

/** Outline of the sash, inset by d millimetres (d = 0 is the cut line). */
function outline(side: Side, d: number): [number, number][] {
  const [yl, yr] = tipTop(side)
  const k = Math.sqrt(1 + (SLANT / SASH_W) ** 2)
  const yTop = (x: number) => yl + ((yr - yl) / SASH_W) * x + d * k
  const shoulder = SASH_L - V + d - d * Math.SQRT2
  return [
    [d, yTop(d)],
    [SASH_W - d, yTop(SASH_W - d)],
    [SASH_W - d, shoulder],
    [SASH_W / 2, SASH_L - d * Math.SQRT2],
    [d, shoulder],
  ]
}

const pts = (p: [number, number][]) => p.map(([x, y]) => `${x},${y}`).join(" ")

function StepLines({ y }: { y: number }) {
  return (
    <path
      d={`M62 ${y}H78M54 ${y + 6}H86M46 ${y + 12}H94`}
      fill="none"
      stroke={GOLD}
      strokeWidth="0.5"
    />
  )
}

function Label({
  y,
  children,
  color = IVORY,
  size = 3.8,
}: {
  y: number
  children: string
  color?: string
  size?: number
}) {
  return (
    <text
      x="70"
      y={y}
      textAnchor="middle"
      fill={color}
      fontFamily={SANS}
      fontWeight="500"
      fontSize={size}
      letterSpacing={size * 0.32}
    >
      {children}
    </text>
  )
}

type VerticalTextProps = {
  cy: number
  children: string
}

function VerticalText({ cy, children }: VerticalTextProps) {
  return (
    <g>
      <text
        x="70"
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={GOLD}
        fontFamily={SERIF}
        fontWeight="700"
        fontSize="10.5"
        letterSpacing="3"
        transform={`rotate(90 70 ${cy})`}
      >
        {children}
      </text>
      <path
        d={`M70 ${cy - 160}V${cy - 120}M70 ${cy + 120}V${cy + 160}`}
        stroke={GOLD}
        strokeWidth="0.6"
      />
    </g>
  )
}

export default function PrintSash({
  side,
  uid = "a",
  mm = false,
  crop = false,
  logoSrc = IUH_LOGO_WHITE,
  fontCss,
  fontStyle = "script-slanted",
}: {
  side: Side
  uid?: string
  mm?: boolean
  crop?: boolean
  logoSrc?: string
  fontCss?: string
  fontStyle?: NameFontStyle
}) {
  const total = SASH_L + BLEED * 2
  const viewBox = crop
    ? `${-BLEED} 800 ${SASH_W + BLEED * 2} ${SASH_L + BLEED - 800}`
    : `${-BLEED} ${-BLEED} ${SASH_W + BLEED * 2} ${total}`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={viewBox}
      width={mm ? `${SASH_W + BLEED * 2}mm` : "100%"}
      height={
        mm
          ? crop
            ? `${SASH_L + BLEED - 800}mm`
            : `${total}mm`
          : "auto"
      }
      className={`print-sash print-sash-${side}`}
    >
      <defs>
        {fontCss && (
          <style
            dangerouslySetInnerHTML={{
              __html: `\n/* <![CDATA[ */\n${fontCss}\n/* ]]> */\n`,
            }}
          />
        )}
        <clipPath id={`clip-${uid}`}>
          <polygon points={pts(outline(side, -BLEED))} />
        </clipPath>
      </defs>

      {/* Solid Navy fabric fill */}
      <polygon
        points={pts(outline(side, -BLEED))}
        fill={NAVY}
        clipPath={`url(#clip-${uid})`}
      />

      {/* Outer thick gold border */}
      <polygon
        points={pts(outline(side, 3))}
        fill="none"
        stroke={GOLD}
        strokeWidth="2.5"
        strokeLinejoin="miter"
      />

      {/* Inner thin accent line */}
      <polygon
        points={pts(outline(side, 6.5))}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.7"
        opacity="0.85"
        strokeLinejoin="miter"
      />

      {/* Third fine gold pinstripe */}
      <polygon
        points={pts(outline(side, 9.5))}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.45"
        opacity="0.65"
        strokeLinejoin="miter"
      />

      {/* Neck end (back of the sash) */}
      <g id="neck-end">
        <StepLines y={150} />
        {side === "left" ? (
          <text
            x="70"
            y={190}
            textAnchor="middle"
            fill={IVORY}
            fontFamily={SANS}
            fontWeight="700"
            fontSize="5.4"
            letterSpacing="2"
          >
            FINANCE
          </text>
        ) : (
          <Label y={190}>CLASS OF 2026</Label>
        )}
        {/* Nền Trống đồng Đông Sơn cổ truyền thực tế in chìm */}
        <g transform="translate(-30, 370)">
          <DongSonDrum size={200} opacity={0.34} />
        </g>
        <VerticalText cy={470}>
          {side === "left"
            ? "INDUSTRIAL UNIVERSITY"
            : "HO CHI MINH CITY · 2026"}
        </VerticalText>
      </g>

      {/* Front, hanging end */}
      {side === "left" ? (
        <g id="front-left">
          {/* Top: Biểu tượng IUH riêng biệt */}
          <image
            href={IUH_EMBLEM_ORIGINAL}
            xlinkHref={IUH_EMBLEM_ORIGINAL}
            x="47"
            y="840"
            width="46"
            height="54"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Đường vạch phân cách trên có họa tiết kim cương (đồng bộ tuyệt đối với vạt phải ở y=910) */}
          <line x1="34" y1="910" x2="106" y2="910" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
          <polygon points="70,907.5 72.5,910 70,912.5 67.5,910" fill="#fff4d0" />
          <circle cx="63" cy="910" r="0.8" fill="#fff4d0" />
          <circle cx="77" cy="910" r="0.8" fill="#fff4d0" />

          {/* Họa tiết bướm bay nghệ thuật (Butterfly Line-art) */}
          <ButterflyIcon x={28} y={950} size={28} color={GOLD} />

          {/* Mũ cử nhân mini đội nghiêng trên đỉnh số 2 */}
          <MiniGraduationCap x={58} y={958} size={22} />

          {/* Ngôi sao lấp lánh trang trí quanh số 2026 */}
          <SparkleStar cx={98} cy={945} r={5.5} color="#fff4d0" />
          <SparkleStar cx={38} cy={1032} r={4.5} color={GOLD} />
          <SparkleStar cx={98} cy={1135} r={5} color="#fff4d0" />
          <SparkleStar cx={48} cy={1195} r={4} color={GOLD} />

          {/* Chữ CLASS OF chạy dọc cạnh số 2026 */}
          <g transform="rotate(90 40 1090)">
            <text
              x="40"
              y="1090"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff4d0"
              fontFamily={SERIF}
              fontWeight="700"
              fontSize="9.5"
              letterSpacing="4.5"
            >
              CLASS OF
            </text>
          </g>

          {/* Cụm 4 số 2 - 0 - 2 - 6 xếp dọc nghệ thuật */}
          <g
            fontFamily={SERIF}
            fontStyle="italic"
            fontWeight="800"
            fontSize="52"
            fill="#fff4d0"
            textAnchor="middle"
          >
            <text x="76" y="1004">2</text>
            <text x="76" y="1062">0</text>
            <text x="76" y="1120">2</text>
            <text x="76" y="1178">6</text>
          </g>

          {/* Ngôi sao lấp lánh trung tâm dưới số 2026 */}
          <SparkleStar cx={70} cy={1230} r={6} color="#fff4d0" />

          {/* Chữ Graduation thư pháp uốn lượn */}
          <text
            x="70"
            y="1270"
            textAnchor="middle"
            fill="#fff4d0"
            fontFamily="'Alex Brush', 'Great Vibes', 'Allura', cursive"
            fontSize="28"
            letterSpacing="1"
          >
            Graduation
          </text>

          {/* Corner flourish ornament at tip */}
          <g transform="translate(25, 1430)">
            <CornerFlourish color={GOLD} />
          </g>
        </g>
      ) : (
        <g id="front-right">
          {/* Top: Graduation Cap icon */}
          <g transform="translate(45, 834)">
            <GraduationCapIcon size={50} color={GOLD} />
          </g>

          {/* Chữ IUH in hoa đậm nét nằm ngay dưới mũ cử nhân */}
          <text
            x="70"
            y="890"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff4d0"
            fontFamily={SERIF}
            fontWeight="800"
            fontSize="16"
            letterSpacing="4"
          >
            IUH
          </text>

          {/* Đường phân cách trên có họa tiết kim cương (đồng bộ tuyệt đối với vạt trái ở y=910) */}
          <line x1="34" y1="910" x2="106" y2="910" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
          <polygon points="70,907.5 72.5,910 70,912.5 67.5,910" fill="#fff4d0" />
          <circle cx="63" cy="910" r="0.8" fill="#fff4d0" />
          <circle cx="77" cy="910" r="0.8" fill="#fff4d0" />

          {/* Nền Trống đồng Đông Sơn cổ truyền thực tế in chìm tinh tế */}
          <g transform="translate(-30, 986)">
            <DongSonDrum size={200} opacity={0.16} />
          </g>

          {/* CỘT TRÁI: VIỆN ĐIỀN TRÊN, KHOA ĐIỀN DƯỚI, SIZE CHỮ TO RÕ RÀNG */}
          {/* 1. Viện Tài Chính - Kế Toán */}
          <g transform="rotate(90 44 1010)">
            <text
              x="44"
              y="1010"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff4d0"
              fontFamily={SERIF}
              fontWeight="800"
              fontSize="12.5"
              letterSpacing="1.8"
            >
              VIỆN TÀI CHÍNH - KẾ TOÁN
            </text>
          </g>

          {/* Hạt kim cương phân cách giữa Viện và Khoa */}
          <g>
            <circle cx="44" cy="1078" r="0.8" fill={GOLD} />
            <polygon points="44,1083.5 46.5,1086 44,1088.5 41.5,1086" fill="#fff4d0" />
            <circle cx="44" cy="1094" r="0.8" fill={GOLD} />
          </g>

          {/* 2. Khoa Tài Chính - Ngân Hàng */}
          <g transform="rotate(90 44 1165)">
            <text
              x="44"
              y="1165"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff4d0"
              fontFamily={SERIF}
              fontWeight="700"
              fontSize="12"
              letterSpacing="1.6"
            >
              KHOA TÀI CHÍNH - NGÂN HÀNG
            </text>
          </g>

          {/* CỘT PHẢI: DÒNG TÊN SINH VIÊN (PHẠM HỮU NGHĨA) */}
          <g transform="rotate(90 86 1086)">
            {fontStyle === "script-slanted" && (
              <text
                x="86"
                y="1086"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily="'Alex Brush', 'Great Vibes', 'Allura', cursive"
                fontSize="42"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "script-vibes" && (
              <text
                x="86"
                y="1086"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily="'Great Vibes', cursive"
                fontSize="38"
                letterSpacing="1"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "script-allura" && (
              <text
                x="86"
                y="1086"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily="'Allura', cursive"
                fontSize="44"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "serif-caps" && (
              <text
                x="86"
                y="1086"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily={SERIF}
                fontWeight="800"
                fontSize="22"
                letterSpacing="2.8"
              >
                PHẠM HỮU NGHĨA
              </text>
            )}
            {fontStyle === "serif-title" && (
              <text
                x="86"
                y="1086"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily={SERIF}
                fontWeight="700"
                fontSize="25"
                letterSpacing="1.8"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "sans-bold" && (
              <text
                x="86"
                y="1086"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily={SANS}
                fontWeight="800"
                fontSize="20"
                letterSpacing="3"
              >
                PHẠM HỮU NGHĨA
              </text>
            )}
          </g>

          {/* Cohort K18 */}
          <text
            x="70"
            y="1276"
            textAnchor="middle"
            fill="#fff4d0"
            fontFamily={SERIF}
            fontWeight="800"
            fontSize="28"
            letterSpacing="1.5"
          >
            K18
          </text>

          {/* Corner flourish ornament at tip */}
          <g transform="translate(25, 1430)">
            <CornerFlourish color={GOLD} />
          </g>
        </g>
      )}

      {/* Die cut line: hidden when printing, kept as its own layer in SVG */}
      <polygon
        id="cut-line"
        className="cut-line"
        points={pts(outline(side, 0))}
        fill="none"
        stroke="#e0218a"
        strokeWidth="0.3"
        strokeDasharray="2 1.5"
      />
    </svg>
  )
}
