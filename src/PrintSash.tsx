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
const SERIF = "'Playfair Display', 'Noto Serif Display', Georgia, serif"
const SCRIPT = "'Great Vibes', 'Alex Brush', cursive"

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
  fontStyle = "script-greatvibes",
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
        {/* Nền Trống đồng Đông Sơn cổ truyền thực tế phóng to bao quát */}
        <g transform="translate(-55, 335)">
          <DongSonDrum size={250} opacity={0.20} />
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
          {/* Top: Biểu tượng IUH thu nhỏ thanh nhã, không có chữ bên dưới theo yêu cầu */}
          <image
            href={IUH_EMBLEM_ORIGINAL}
            xlinkHref={IUH_EMBLEM_ORIGINAL}
            x="53"
            y="826"
            width="34"
            height="38"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Đường vạch phân cách kim cương thanh mảnh dưới logo IUH ở y=872 */}
          <line x1="38" y1="872" x2="102" y2="872" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
          <polygon points="70,869.5 72.5,872 70,874.5 67.5,872" fill="#fff4d0" />
          <circle cx="63" cy="872" r="0.8" fill="#fff4d0" />
          <circle cx="77" cy="872" r="0.8" fill="#fff4d0" />

          {/* Nền Trống đồng Đông Sơn Ngọc Lũ thực tế phóng to bao quát, in chìm tinh tế */}
          <g transform="translate(-70, 915)">
            <DongSonDrum size={280} opacity={0.17} />
          </g>

          {/* Họa tiết bướm bay nghệ thuật */}
          <ButterflyIcon x={30} y={918} size={24} color={GOLD} />

          {/* Mũ cử nhân mini đội nghiêng trên đỉnh số 2 lệch trái */}
          <MiniGraduationCap x={49} y={930} size={20} />

          {/* Ngôi sao lấp lánh trang trí quanh số 2026 */}
          <SparkleStar cx={92} cy={960} r={4.5} color="#fff4d0" />
          <SparkleStar cx={38} cy={1012} r={4} color={GOLD} />
          <SparkleStar cx={96} cy={1072} r={4.5} color="#fff4d0" />
          <SparkleStar cx={46} cy={1164} r={4} color={GOLD} />

          {/* Chữ CLASS OF chạy dọc cạnh số 2026 */}
          <g transform="rotate(90 34 1058)">
            <text
              x="34"
              y="1058"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={GOLD}
              fontFamily="'Cinzel', Georgia, serif"
              fontWeight="700"
              fontSize="8.2"
              letterSpacing="3.5"
            >
              CLASS OF
            </text>
          </g>

          {/* Cụm 4 số 2 - 0 - 2 - 6 xếp xéo nhau và nối nhau nghệ thuật (Interlocking Ribbon Script) */}
          <g id="connected-year-2026">
            {/* Dải lụa nối uốn lượn từ chân số 2 sang đỉnh số 0 */}
            <path
              d="M 54 984 C 68 988, 78 998, 80 1008"
              fill="none"
              stroke="#f3db83"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Dải lụa nối từ chân số 0 sang đầu số 2 thứ hai */}
            <path
              d="M 80 1050 C 76 1058, 68 1058, 60 1060"
              fill="none"
              stroke="#f3db83"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Dải lụa uốn lượn từ chân số 2 thứ hai nối và bao quanh số 6 */}
            <path
              d="M 52 1084 C 72 1090, 86 1100, 80 1110"
              fill="none"
              stroke="#f3db83"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 72 1148 C 88 1154, 92 1166, 84 1176 C 76 1184, 66 1188, 74 1194"
              fill="none"
              stroke="#f3db83"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* 4 chữ số 2 - 0 - 2 - 6 thư pháp xếp xéo nhau (2 trái -> 0 phải -> 2 trái -> 6 phải) */}
            <g
              fontFamily="'Charm', 'Alex Brush', cursive"
              fontWeight="700"
              fill="#f3db83"
              textAnchor="middle"
            >
              <text x="60" y="980" fontSize="56">
                2
              </text>
              <text x="80" y="1030" fontSize="50">
                0
              </text>
              <text x="60" y="1080" fontSize="56">
                2
              </text>
              <text x="80" y="1130" fontSize="52">
                6
              </text>
            </g>
          </g>

          {/* Ngôi sao lấp lánh trung tâm dưới số 2026 */}
          <SparkleStar cx={70} cy={1208} r={5} color="#f3db83" />

          {/* Chữ Graduation thư pháp uốn lượn (căn tại y=1260, bằng ngang tuyệt đối với K18) */}
          <g>
            <SparkleStar cx={24} cy={1260} r={3} color={GOLD} />
            <SparkleStar cx={116} cy={1260} r={3} color={GOLD} />
            <text
              x="70"
              y="1260"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#f3db83"
              fontFamily="'Great Vibes', 'Charm', cursive"
              fontSize="27"
              letterSpacing="1"
            >
              Graduation
            </text>
          </g>

          {/* Corner flourish ornament at tip */}
          <g transform="translate(25, 1430)">
            <CornerFlourish color={GOLD} />
          </g>
        </g>
      ) : (
        <g id="front-right">
          {/* Top: Mũ cử nhân hoàng gia */}
          <g transform="translate(45, 804)">
            <GraduationCapIcon size={50} color={GOLD} />
          </g>

          {/* Tên trường tiếng Anh trang trọng dưới mũ cử nhân */}
          <text
            x="70"
            y="858"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#dfb143"
            fontFamily="'Cinzel', Georgia, serif"
            fontWeight="800"
            fontSize="7.2"
            letterSpacing="1.6"
          >
            INDUSTRIAL UNIVERSITY
          </text>
          <text
            x="70"
            y="869"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff4d0"
            fontFamily="'Cinzel', Georgia, serif"
            fontWeight="700"
            fontSize="6.6"
            letterSpacing="1.8"
          >
            OF HO CHI MINH CITY
          </text>

          {/* Đường phân cách trên có họa tiết kim cương ở y=882 */}
          <line x1="34" y1="882" x2="106" y2="882" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
          <polygon points="70,879.5 72.5,882 70,884.5 67.5,882" fill="#fff4d0" />
          <circle cx="63" cy="882" r="0.8" fill="#fff4d0" />
          <circle cx="77" cy="882" r="0.8" fill="#fff4d0" />

          {/* Nền Trống đồng Đông Sơn cổ truyền thực tế phóng to bao quát */}
          <g transform="translate(-70, 915)">
            <DongSonDrum size={280} opacity={0.17} />
          </g>

          {/* CỘT 1 (x=33): KHOA TÀI CHÍNH - NGÂN HÀNG (ĐÃ ĐỔI VỊ TRÍ, SIZE 9.5PX, MÀU VÀNG GOLD QUÝ PHÁI) */}
          <g transform="rotate(90 33 1058)">
            <text
              x="33"
              y="1058"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#dfb143"
              fontFamily={SERIF}
              fontWeight="700"
              fontSize="9.5"
              letterSpacing="1.0"
            >
              KHOA TÀI CHÍNH - NGÂN HÀNG
            </text>
          </g>

          {/* CỘT 2 (x=51): VIỆN TÀI CHÍNH - KẾ TOÁN (ĐÃ ĐỔI VỊ TRÍ SÁT CẠNH TÊN, SIZE LỚN 11.5PX, MÀU TRẮNG NGỌC NỔI BẬT) */}
          <g transform="rotate(90 51 1058)">
            <text
              x="51"
              y="1058"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#ffffff"
              fontFamily={SERIF}
              fontWeight="800"
              fontSize="11.5"
              letterSpacing="1.2"
            >
              VIỆN TÀI CHÍNH - KẾ TOÁN
            </text>
          </g>

          {/* CỘT 3 (x=88): DÒNG TÊN SINH VIÊN (PHẠM HỮU NGHĨA - THANH THOÁT, KÉO DÀI) */}
          <g transform="rotate(90 88 1058)">
            {fontStyle === "script-charm" && (
              <text
                x="88"
                y="1058"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily="'Charm', 'Alex Brush', cursive"
                fontWeight="600"
                fontSize="36"
                letterSpacing="2.2"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "script-greatvibes" && (
              <text
                x="88"
                y="1058"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily="'Great Vibes', cursive"
                fontSize="38"
                letterSpacing="1.5"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "script-alexbrush" && (
              <text
                x="88"
                y="1058"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily="'Alex Brush', cursive"
                fontSize="37"
                letterSpacing="1.5"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "script-dancing" && (
              <text
                x="88"
                y="1058"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily="'Dancing Script', cursive"
                fontWeight="700"
                fontSize="33"
                letterSpacing="1.6"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "serif-italic" && (
              <text
                x="88"
                y="1058"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily={SERIF}
                fontStyle="italic"
                fontWeight="800"
                fontSize="26"
                letterSpacing="1.8"
              >
                Phạm Hữu Nghĩa
              </text>
            )}
            {fontStyle === "serif-caps" && (
              <text
                x="88"
                y="1058"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff4d0"
                fontFamily={SERIF}
                fontWeight="800"
                fontSize="21"
                letterSpacing="3.0"
              >
                PHẠM HỮU NGHĨA
              </text>
            )}
          </g>

          {/* Cohort K18 (chuẩn Roman Serif Cinzel, căn chính xác trung tâm x=70, y=1260, màu vàng gold quý phái) */}
          <g>
            <text
              x="70"
              y="1260"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#dfb143"
              fontFamily="'Cinzel', 'Noto Serif Display', 'Times New Roman', Georgia, serif"
              fontWeight="800"
              fontSize="28"
              letterSpacing="1.5"
            >
              K18
            </text>
          </g>

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
