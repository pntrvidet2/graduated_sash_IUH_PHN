// Print-ready sash artwork drawn in real millimetres (1 SVG unit = 1 mm).
import defaultLogoWhite from "./assets/iuh-logo-white.png"

export type Side = "left" | "right"

export const SASH_W = 140
export const SASH_L = 1500
export const BLEED = 3
const SLANT = 20 // slanted neck end
const V = 70 // depth of the pointed end

const NAVY = "#0f2a66"
const GOLD = "#c9a55f"
const IVORY = "#f1e7cf"
const YEAR = "#d9bd7e"

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

function ClassBlock() {
  return (
    <g>
      <path d="M48 1318H92" stroke={GOLD} strokeWidth="0.5" />
      <Label y={1338}>CLASS OF</Label>
      <text
        x="70"
        y={1378}
        textAnchor="middle"
        fill={YEAR}
        fontFamily={SERIF}
        fontWeight="600"
        fontSize="30"
      >
        2026
      </text>
    </g>
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
  logoSrc = defaultLogoWhite,
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
  const nameHalf = 116 // half the rendered width of the name at 42mm

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={viewBox}
      {...(mm
        ? { width: `${SASH_W + BLEED * 2}mm`, height: `${total}mm` }
        : {})}
      role="img"
      aria-label={
        side === "left"
          ? "Vạt trái, kích thước thật"
          : "Vạt phải, kích thước thật"
      }
    >
      <defs>{fontCss ? <style>{fontCss}</style> : null}</defs>

      {/* Gold edge band (bleeds past the cut line) and navy body */}
      <polygon points={pts(outline(side, -BLEED))} fill={GOLD} />
      <polygon points={pts(outline(side, 4.2))} fill={NAVY} />

      {/* Double straight-line frame */}
      <polygon
        points={pts(outline(side, 9))}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.5"
        strokeLinejoin="miter"
      />
      <polygon
        points={pts(outline(side, 12))}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.3"
        opacity="0.5"
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
          <image
            href={logoSrc}
            xlinkHref={logoSrc}
            x="20"
            y="845"
            width="100"
            height={(100 * 291) / 1024}
          />
          <StepLines y={930} />
          <Label y={985} color={GOLD}>
            KHOA
          </Label>
          <text
            x="70"
            textAnchor="middle"
            fill={IVORY}
            fontFamily={SERIF}
            fontWeight="500"
            fontSize="12"
            letterSpacing="0.9"
          >
            <tspan x="70" y="1030">
              TÀI CHÍNH
            </tspan>
            <tspan x="70" y="1052">
              NGÂN HÀNG
            </tspan>
          </text>
          <path
            d="M46 1096H94M54 1102H86M62 1108H78"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.5"
          />
          <ClassBlock />
        </g>
      ) : (
        <g id="front-right">
          <StepLines y={850} />
          <Label y={892}>CỬ NHÂN</Label>
          <g transform="rotate(90 70 1075)">
            <text
              x="70"
              y="1075"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#f0d996"
              fontFamily={SCRIPT}
              fontSize="42"
            >
              Phạm Hữu Nghĩa
            </text>
            <path
              d={`M${70 - nameHalf - 38} 1075H${70 - nameHalf - 12}M${70 - nameHalf - 38} 1080H${70 - nameHalf - 12}M${70 + nameHalf + 12} 1075H${70 + nameHalf + 38}M${70 + nameHalf + 12} 1080H${70 + nameHalf + 38}`}
              stroke={YEAR}
              strokeWidth="0.5"
            />
          </g>
          <ClassBlock />
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
