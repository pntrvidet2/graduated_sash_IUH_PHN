// Print-ready sash artwork drawn in real millimetres (1 SVG unit = 1 mm).
import { IUH_LOGO_WHITE, IUH_EMBLEM_ORIGINAL } from "./assets/logoData"
import { DongSonDrum, GraduationCapIcon, CornerFlourish } from "./DongSonDrum"

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
        fontSize="6"
        letterSpacing="2.2"
        transform={`rotate(90 70 ${cy})`}
      >
        {children}
      </text>
      <path
        d={`M70 ${cy - 140}V${cy - 95}M70 ${cy + 95}V${cy + 140}`}
        stroke={GOLD}
        strokeWidth="0.5"
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
}: {
  side: Side
  uid?: string
  mm?: boolean
  crop?: boolean
  logoSrc?: string
  fontCss?: string
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
        <VerticalText cy={470}>
          {side === "left"
            ? "INDUSTRIAL UNIVERSITY"
            : "HO CHI MINH CITY · 2026"}
        </VerticalText>
      </g>

      {/* Front, hanging end */}
      {side === "left" ? (
        <g id="front-left">
          {/* Logo biểu tượng IUH phóng to & dời xuống */}
          <image
            href={IUH_EMBLEM_ORIGINAL}
            xlinkHref={IUH_EMBLEM_ORIGINAL}
            x="47"
            y="850"
            width="46"
            height="54"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Tên trường đặt ngay dưới biểu tượng logo */}
          <g fontFamily={SERIF} fontWeight="600" fontSize="5.2" textAnchor="middle">
            <text x="70" y="916" fill="#fff4d0" letterSpacing="0.9">
              INDUSTRIAL UNIVERSITY OF
            </text>
            <text x="70" y="925" fill={GOLD} letterSpacing="1.2">
              HO CHI MINH CITY
            </text>
          </g>

          {/* Separator rule */}
          <line x1="42" y1="936" x2="98" y2="936" stroke={GOLD} strokeWidth="0.4" opacity="0.6" />

          {/* Dong Son Drum Watermark Background (centered at y=1075) */}
          <g transform="translate(-30, 875)">
            <DongSonDrum size={200} color={GOLD} opacity={0.45} />
          </g>

          {/* Monogram I - U - H Vertical (Serif Bold) */}
          <g id="monogram-iuh" fontFamily={SERIF} fontWeight="700" fontSize="58" fill="#fff4d0">
            <text x="70" y="995" textAnchor="middle">I</text>
            <text x="70" y="1080" textAnchor="middle">U</text>
            <text x="70" y="1165" textAnchor="middle">H</text>
          </g>

          {/* Separator rule */}
          <line x1="48" y1="1265" x2="92" y2="1265" stroke={GOLD} strokeWidth="0.4" opacity="0.6" />

          {/* Class of 2026 */}
          <g id="class-of-2026" transform="translate(0, 1285)">
            <text x="66" y="18" textAnchor="end" fill={GOLD} fontFamily={SCRIPT} fontSize="17">
              Class of
            </text>
            <text x="74" y="20" fill="#fff4d0" fontFamily={SERIF} fontWeight="700" fontSize="24" letterSpacing="1">
              2026
            </text>
          </g>

          {/* Corner flourish ornament at tip */}
          <g transform="translate(25, 1430)">
            <CornerFlourish color={GOLD} />
          </g>
        </g>
      ) : (
        <g id="front-right">
          {/* Top: Graduation Cap icon */}
          <g transform="translate(43, 846)">
            <GraduationCapIcon size={54} color={GOLD} />
          </g>

          {/* "— Graduation —" */}
          <g id="graduation-script-label" transform="translate(0, 918)">
            <line x1="24" y1="0" x2="38" y2="0" stroke={GOLD} strokeWidth="0.5" opacity="0.8" />
            <circle cx="41" cy="0" r="1" fill="#fff4d0" />
            <text
              x="70"
              y="3"
              textAnchor="middle"
              fill="#fff4d0"
              fontFamily={SERIF}
              fontWeight="600"
              fontSize="12.5"
              letterSpacing="2.5"
            >
              Graduation
            </text>
            <circle cx="99" cy="0" r="1" fill="#fff4d0" />
            <line x1="102" y1="0" x2="116" y2="0" stroke={GOLD} strokeWidth="0.5" opacity="0.8" />
          </g>

          {/* Separator rule */}
          <line x1="42" y1="936" x2="98" y2="936" stroke={GOLD} strokeWidth="0.4" opacity="0.6" />

          {/* Vertical name & Faculty / Institute with vertical divider */}
          <g transform="rotate(90 48 1085)">
            <text
              x="48"
              y="1085"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff4d0"
              fontFamily={SCRIPT}
              fontSize="50"
            >
              Phạm Hữu Nghĩa
            </text>
          </g>

          {/* Vertical divider line */}
          <line x1="68" y1="960" x2="68" y2="1210" stroke={GOLD} strokeWidth="0.4" opacity="0.6" />

          {/* Khoa Tài Chính - Kế Toán (bold, large) */}
          <g transform="rotate(90 84 1085)">
            <text
              x="84"
              y="1085"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff4d0"
              fontFamily={SERIF}
              fontWeight="700"
              fontSize="11.5"
              letterSpacing="1.8"
            >
              KHOA TÀI CHÍNH - KẾ TOÁN
            </text>
          </g>

          {/* Viện Tài Chính Kế Toán */}
          <g transform="rotate(90 100 1085)">
            <text
              x="100"
              y="1085"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={GOLD}
              fontFamily={SERIF}
              fontWeight="600"
              fontSize="9.8"
              letterSpacing="1.5"
            >
              VIỆN TÀI CHÍNH KẾ TOÁN
            </text>
          </g>

          {/* Separator rule */}
          <line x1="48" y1="1265" x2="92" y2="1265" stroke={GOLD} strokeWidth="0.4" opacity="0.6" />

          {/* Cohort K18 */}
          <text
            x="70"
            y="1312"
            textAnchor="middle"
            fill="#fff4d0"
            fontFamily={SERIF}
            fontWeight="700"
            fontSize="26"
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
