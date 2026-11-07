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
import type { NameFontStyle, Year2026Style } from "./App"

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
  yearStyle = "royal-interlocking",
}: {
  side: Side
  uid?: string
  mm?: boolean
  crop?: boolean
  logoSrc?: string
  fontCss?: string
  fontStyle?: NameFontStyle
  yearStyle?: Year2026Style
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
        <linearGradient id={`goldFoil-${uid}`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#fffce8" />
          <stop offset="18%" stopColor="#fced9d" />
          <stop offset="42%" stopColor="#dfa832" />
          <stop offset="68%" stopColor="#fdf0b0" />
          <stop offset="88%" stopColor="#c99120" />
          <stop offset="100%" stopColor="#9a6912" />
        </linearGradient>
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
          <ButterflyIcon x={30} y={918} size={24} color={GOLD} />

          {/* Mũ cử nhân mini đội nghiêng tự nhiên trên chóp số 2 lệch trái */}
          <g transform="translate(42, 926) rotate(-14) scale(0.88)">
            <polygon points="50,11 90,28 50,44 10,28" fill={`url(#goldFoil-${uid})`} stroke="#fff8dd" strokeWidth="0.8" />
            <path d="M 28 34 V 44 C 28 52, 72 52, 72 44 V 34 Z" fill="#9e7115" />
            <path d="M 50 28 C 50 34, 76 38, 76 46" stroke="#fff8dd" strokeWidth="1.2" fill="none" />
            <circle cx="76" cy="48" r="1.8" fill="#fff8dd" />
          </g>

          {/* Ngôi sao lấp lánh trang trí quanh số 2026 chuẩn theo mẫu thực tế */}
          <SparkleStar cx={90} cy={950} r={4.5} color="#fff8df" />
          <SparkleStar cx={26} cy={987} r={3.8} color="#fced9d" />
          <SparkleStar cx={100} cy={1045} r={4.5} color="#fff8df" />
          <SparkleStar cx={28} cy={1100} r={3.5} color="#fced9d" />
          <SparkleStar cx={70} cy={1148} r={4.0} color="#fff8df" />

          {/* DÒNG CHỮ CLASS OF XẾP DỌC HOÀNG GIA (C L A S S  O F) */}
          <g
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontWeight="800"
            fontSize="8.2"
            fill={`url(#goldFoil-${uid})`}
            textAnchor="middle"
            letterSpacing="0.6"
          >
            <text x="32" y="996">C</text>
            <text x="32" y="1010">L</text>
            <text x="32" y="1024">A</text>
            <text x="32" y="1038">S</text>
            <text x="32" y="1052">S</text>
            <text x="32" y="1074">O</text>
            <text x="32" y="1088">F</text>
          </g>

          {/* ========================================================
              TRUNG TÂM NGHỆ THUẬT: CỤM SỐ 2 0 2 6 HOÀNG GIA ĐẲNG CẤP
              Hỗ trợ 3 phong cách thiết kế tinh tế:
              1. royal-interlocking (Mặc định · Didone Lồng Khối Vàng Ánh Kim 3D)
              2. seamless-ribbon (Thư Pháp Dải Ruy Băng Vàng Liền Mạch)
              3. classic-italic (Thư Pháp Cổ Điển Tinh Giản)
             ======================================================== */}
          {yearStyle === "royal-interlocking" && (
            <g id="masterpiece-2026">
              {/* Nét uốn lượn liên hoàn kết nối mượt mà giữa các con số */}
              <path
                d="M 64 984 C 71 984, 76 986, 76 996"
                fill="none"
                stroke={`url(#goldFoil-${uid})`}
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M 75 1030 C 72 1038, 62 1036, 56 1040"
                fill="none"
                stroke={`url(#goldFoil-${uid})`}
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M 64 1064 C 71 1064, 76 1068, 76 1078"
                fill="none"
                stroke={`url(#goldFoil-${uid})`}
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              <g
                fontFamily="'Playfair Display', Georgia, serif"
                fontStyle="italic"
                fontWeight="900"
                fill={`url(#goldFoil-${uid})`}
                textAnchor="middle"
              >
                <text x="54" y="984" fontSize="72">
                  2
                </text>
                <text x="76" y="1024" fontSize="65">
                  0
                </text>
                <text x="54" y="1064" fontSize="72">
                  2
                </text>
                <text x="76" y="1104" fontSize="68">
                  6
                </text>
              </g>
            </g>
          )}

          {yearStyle === "seamless-ribbon" && (
            <g id="seamless-ribbon-2026" fill={`url(#goldFoil-${uid})`}>
              <path d="M 44 948 C 44 941, 52 935, 62 935 C 72 935, 78 942, 78 951 C 78 962, 70 971, 61 980 C 51 990, 44 998, 42 1004 L 70 1004 C 78 1004, 84 1007, 85 1016 C 85 1018, 83 1018, 80 1015 C 75 1010, 68 1009, 60 1009 L 40 1009 C 36 1009, 36 1004, 39 1000 C 43 993, 52 983, 62 972 C 70 963, 73 957, 73 950 C 73 945, 68 940, 61 940 C 54 940, 49 944, 49 949 Z" />
              <path d="M 84 1016 C 92 1019, 98 1028, 98 1041 C 98 1058, 88 1068, 76 1068 C 67 1068, 62 1061, 62 1050 C 62 1035, 72 1021, 84 1016 Z M 79 1023 C 72 1026, 68 1036, 68 1048 C 68 1058, 72 1063, 76 1063 C 83 1063, 91 1054, 91 1040 C 91 1029, 85 1023, 79 1023 Z" />
              <path d="M 73 1066 C 68 1074, 58 1072, 54 1076 C 52 1078, 54 1080, 57 1078 C 62 1075, 69 1074, 75 1068 Z" />
              <path d="M 44 1068 C 44 1061, 52 1055, 62 1055 C 72 1055, 78 1062, 78 1071 C 78 1082, 70 1091, 61 1100 C 51 1110, 44 1118, 42 1124 L 70 1124 C 78 1124, 84 1127, 85 1136 C 85 1138, 83 1138, 80 1135 C 75 1130, 68 1129, 60 1129 L 40 1129 C 36 1129, 36 1124, 39 1120 C 43 1113, 52 1103, 62 1092 C 70 1083, 73 1077, 73 1070 C 73 1065, 68 1060, 61 1060 C 54 1060, 49 1064, 49 1069 Z" />
              <path d="M 83 1134 C 87 1138, 88 1145, 87 1153 L 82 1152 C 83 1146, 82 1141, 79 1137 Z" />
              <path d="M 87 1148 C 87 1140, 83 1133, 75 1133 C 65 1133, 58 1144, 58 1161 C 58 1177, 68 1188, 80 1188 C 91 1188, 98 1177, 98 1164 C 98 1153, 91 1145, 80 1145 C 73 1145, 67 1150, 64 1156 C 65 1145, 71 1138, 78 1138 C 83 1138, 85 1142, 85 1148 Z M 78 1150 C 86 1150, 91 1156, 91 1165 C 91 1174, 86 1183, 78 1183 C 71 1183, 64 1175, 64 1165 C 64 1156, 71 1150, 78 1150 Z" />
            </g>
          )}

          {yearStyle === "classic-italic" && (
            <g id="classic-italic-2026">
              <g
                fontFamily="'Playfair Display', Georgia, serif"
                fontStyle="italic"
                fontWeight="700"
                fill={`url(#goldFoil-${uid})`}
                textAnchor="middle"
              >
                <text x="56" y="986" fontSize="68">
                  2
                </text>
                <text x="76" y="1028" fontSize="62">
                  0
                </text>
                <text x="56" y="1070" fontSize="68">
                  2
                </text>
                <text x="76" y="1112" fontSize="64">
                  6
                </text>
              </g>
              <path d="M 64 986 C 71 986, 76 989, 76 998" fill="none" stroke={`url(#goldFoil-${uid})`} strokeWidth="2.0" strokeLinecap="round" />
              <path d="M 74 1034 C 71 1042, 61 1042, 57 1046" fill="none" stroke={`url(#goldFoil-${uid})`} strokeWidth="2.0" strokeLinecap="round" />
              <path d="M 64 1070 C 71 1070, 76 1074, 76 1084" fill="none" stroke={`url(#goldFoil-${uid})`} strokeWidth="2.0" strokeLinecap="round" />
            </g>
          )}

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
              fill={`url(#goldFoil-${uid})`}
              fontFamily="'Great Vibes', 'Charm', cursive"
              fontSize="28"
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
