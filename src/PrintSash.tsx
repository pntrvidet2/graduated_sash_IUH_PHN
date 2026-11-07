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
          {/* Top: Biểu tượng IUH thu nhỏ thanh nhã, căn chuẩn cân đối với vạt phải */}
          <image
            href={IUH_EMBLEM_ORIGINAL}
            xlinkHref={IUH_EMBLEM_ORIGINAL}
            x="50"
            y="822"
            width="40"
            height="44"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Đường vạch phân cách kim cương và ngôi sao lấp lánh dưới logo IUH ở y=882 (đồng mức tuyệt đối với vạt phải) */}
          <line x1="38" y1="882" x2="102" y2="882" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
          <polygon points="70,879.5 72.5,882 70,884.5 67.5,882" fill="#fff4d0" />
          <circle cx="63" cy="882" r="0.8" fill="#fff4d0" />
          <circle cx="77" cy="882" r="0.8" fill="#fff4d0" />
          <SparkleStar cx={36} cy={882} r={2.2} color={GOLD} />
          <SparkleStar cx={104} cy={882} r={2.2} color={GOLD} />

          {/* Nền Trống đồng Đông Sơn Ngọc Lũ thực tế phóng to bao quát, in chìm tinh tế */}
          <g transform="translate(-70, 915)">
            <DongSonDrum size={280} opacity={0.17} />
          </g>

          {/* Họa tiết bướm bay nghệ thuật */}
          <ButterflyIcon x={30} y={916} size={24} color={GOLD} />

          {/* Mũ cử nhân mini đội nghiêng trên đỉnh số 2 lệch trái */}
          <MiniGraduationCap x={46} y={928} size={22} />

          {/* Ngôi sao lấp lánh trang trí quanh số 2026 chuẩn theo mẫu thực tế */}
          <SparkleStar cx={88} cy={958} r={4.5} color="#fff4d0" />
          <SparkleStar cx={32} cy={998} r={3.8} color="#f3db83" />
          <SparkleStar cx={98} cy={1066} r={4.5} color="#fff4d0" />
          <SparkleStar cx={70} cy={1164} r={3.5} color="#f3db83" />

          {/* DÒNG CHỮ CLASS OF XẾP DỌC TỪNG KÝ TỰ (C L A S S  O F) */}
          <g
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontWeight="800"
            fontSize="7.8"
            fill={GOLD}
            textAnchor="middle"
          >
            <text x="32" y="1014">C</text>
            <text x="32" y="1027">L</text>
            <text x="32" y="1040">A</text>
            <text x="32" y="1053">S</text>
            <text x="32" y="1066">S</text>
            <text x="32" y="1086">O</text>
            <text x="32" y="1099">F</text>
          </g>

          {/* CỤM 4 SỐ 2 - 0 - 2 - 6 NỐI NHAU LIỀN MẠCH, THANH THOÁT, CHUẨN THIẾT KẾ THỰC TẾ
              Nét uốn lượn mềm mại liên kết chân 2 sang 0, đáy 0 sang 2, và chân 2 sang cổ 6 */}
          <g id="connected-year-2026">
            {/* Nét uốn lượn nối chân số 2 thứ nhất sang đỉnh số 0 */}
            <path
              d="M 64 991 C 71 991, 75.5 994, 75.5 1004"
              fill="none"
              stroke="#f3db83"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            {/* Nét uốn lượn nối đáy số 0 sang đỉnh số 2 thứ hai */}
            <path
              d="M 74 1046 C 71 1054, 61 1054, 57 1058"
              fill="none"
              stroke="#f3db83"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            {/* Nét uốn lượn nối chân số 2 thứ hai sang cổ số 6 */}
            <path
              d="M 64 1083 C 71 1083, 76 1088, 76 1100"
              fill="none"
              stroke="#f3db83"
              strokeWidth="2.6"
              strokeLinecap="round"
            />

            <g
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
              fontWeight="700"
              fill="#f3db83"
              textAnchor="middle"
            >
              {/* Số 2 thứ nhất (lệch trái, chóp đội mũ cử nhân mini) */}
              <text x="56" y="992" fontSize="68">
                2
              </text>

              {/* Số 0 (thon dài thanh thoát, xếp xéo sang phải, nối từ đuôi số 2) */}
              <text x="76" y="1038" fontSize="62">
                0
              </text>

              {/* Số 2 thứ hai (xếp xéo lồng vào trong lòng số 0, nối tiếp sang số 6) */}
              <text x="56" y="1084" fontSize="68">
                2
              </text>

              {/* Số 6 (xếp xéo sang phải, cổ số cong dài đón chân số 2) */}
              <text x="76" y="1134" fontSize="64">
                6
              </text>
            </g>
          </g>

          {/* Đường gạch ngang hoàng gia decor và chùm ngôi sao lấp lánh (Bridging Divider & Stardust) */}
          <g>
            <SparkleStar cx={70} cy={1182} r={5} color="#f3db83" />
            <SparkleStar cx={48} cy={1178} r={3} color="#fff4d0" />
            <SparkleStar cx={92} cy={1178} r={3} color="#fff4d0" />

            <line x1="36" y1="1204" x2="62" y2="1204" stroke={GOLD} strokeWidth="0.65" strokeLinecap="round" opacity="0.85" />
            <line x1="78" y1="1204" x2="104" y2="1204" stroke={GOLD} strokeWidth="0.65" strokeLinecap="round" opacity="0.85" />
            <polygon points="70,1201.5 72.5,1204 70,1206.5 67.5,1204" fill="#fff4d0" />
            <circle cx="65" cy="1204" r="0.8" fill={GOLD} />
            <circle cx="75" cy="1204" r="0.8" fill={GOLD} />
            <circle cx="58" cy="1204" r="0.6" fill="#fff4d0" />
            <circle cx="82" cy="1204" r="0.6" fill="#fff4d0" />
            <SparkleStar cx={34} cy={1204} r={2.8} color={GOLD} />
            <SparkleStar cx={106} cy={1204} r={2.8} color={GOLD} />

            <SparkleStar cx={46} cy={1228} r={2.8} color={GOLD} />
            <SparkleStar cx={94} cy={1228} r={2.8} color={GOLD} />
          </g>

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
          <g transform="translate(48, 814)">
            <GraduationCapIcon size={44} color={GOLD} />
          </g>

          {/* Tên trường tiếng Anh thu nhỏ thanh nhã cân xứng với vạt trái */}
          <text
            x="70"
            y="862"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#dfb143"
            fontFamily="'Cinzel', Georgia, serif"
            fontWeight="800"
            fontSize="5.2"
            letterSpacing="1.1"
          >
            INDUSTRIAL UNIVERSITY
          </text>
          <text
            x="70"
            y="871"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff4d0"
            fontFamily="'Cinzel', Georgia, serif"
            fontWeight="700"
            fontSize="4.7"
            letterSpacing="1.2"
          >
            OF HO CHI MINH CITY
          </text>

          {/* Đường phân cách trên có họa tiết kim cương và ngôi sao ở y=882 (đồng mức tuyệt đối với vạt trái) */}
          <line x1="38" y1="882" x2="102" y2="882" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
          <polygon points="70,879.5 72.5,882 70,884.5 67.5,882" fill="#fff4d0" />
          <circle cx="63" cy="882" r="0.8" fill="#fff4d0" />
          <circle cx="77" cy="882" r="0.8" fill="#fff4d0" />
          <SparkleStar cx={36} cy={882} r={2.2} color={GOLD} />
          <SparkleStar cx={104} cy={882} r={2.2} color={GOLD} />

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

          {/* Đường gạch ngang hoàng gia decor và chùm ngôi sao lấp lánh (Bridging Divider & Stardust) */}
          <g>
            <SparkleStar cx={70} cy={1182} r={5} color="#f3db83" />
            <SparkleStar cx={48} cy={1178} r={3} color="#fff4d0" />
            <SparkleStar cx={92} cy={1178} r={3} color="#fff4d0" />

            <line x1="36" y1="1204" x2="62" y2="1204" stroke={GOLD} strokeWidth="0.65" strokeLinecap="round" opacity="0.85" />
            <line x1="78" y1="1204" x2="104" y2="1204" stroke={GOLD} strokeWidth="0.65" strokeLinecap="round" opacity="0.85" />
            <polygon points="70,1201.5 72.5,1204 70,1206.5 67.5,1204" fill="#fff4d0" />
            <circle cx="65" cy="1204" r="0.8" fill={GOLD} />
            <circle cx="75" cy="1204" r="0.8" fill={GOLD} />
            <circle cx="58" cy="1204" r="0.6" fill="#fff4d0" />
            <circle cx="82" cy="1204" r="0.6" fill="#fff4d0" />
            <SparkleStar cx={34} cy={1204} r={2.8} color={GOLD} />
            <SparkleStar cx={106} cy={1204} r={2.8} color={GOLD} />

            <SparkleStar cx={46} cy={1228} r={2.8} color={GOLD} />
            <SparkleStar cx={94} cy={1228} r={2.8} color={GOLD} />
          </g>

          {/* Cohort K18 (chuẩn Roman Serif Cinzel, căn chính xác trung tâm x=70, y=1260, màu vàng gold quý phái) */}
          <g>
            <SparkleStar cx={24} cy={1260} r={3} color={GOLD} />
            <SparkleStar cx={116} cy={1260} r={3} color={GOLD} />
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
