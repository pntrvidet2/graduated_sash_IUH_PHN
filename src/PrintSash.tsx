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

          {/* ========================================================
              SPOT 1: BIỂU TƯỢNG NGÂN HÀNG HOÀNG GIA & VÒNG NGUYỆT QUẾ
              (Neoclassical Bank Facade · Laurel Wreath · Banking & Finance)
             ======================================================== */}
          <g id="spot1-banking-crest">
            {/* Vòng Nguyệt Quế Hoàng Gia ôm trọn trụ sở ngân hàng */}
            <g stroke={`url(#goldFoil-${uid})`} fill={`url(#goldFoil-${uid})`} opacity="0.9">
              <path d="M 50 914 C 42 908, 42 896, 52 890" fill="none" strokeWidth="0.9" strokeLinecap="round" />
              <ellipse cx="44" cy="907" rx="2.5" ry="1.2" transform="rotate(-30 44 907)" />
              <ellipse cx="43" cy="899" rx="2.5" ry="1.2" transform="rotate(-60 43 899)" />
              <ellipse cx="48" cy="892" rx="2.2" ry="1.1" transform="rotate(-85 48 892)" />

              <path d="M 90 914 C 98 908, 98 896, 88 890" fill="none" strokeWidth="0.9" strokeLinecap="round" />
              <ellipse cx="96" cy="907" rx="2.5" ry="1.2" transform="rotate(30 96 907)" />
              <ellipse cx="97" cy="899" rx="2.5" ry="1.2" transform="rotate(60 97 899)" />
              <ellipse cx="92" cy="892" rx="2.2" ry="1.1" transform="rotate(85 92 892)" />
            </g>

            {/* Trụ sở Ngân hàng Tân Cổ Điển 3D Ánh Kim (4 Trụ Cột Corinthian & Mái Vòm Tam Giác) */}
            <g transform="translate(70, 903) scale(0.8)">
              <polygon points="0,-16 22,-6 -22,-6" fill={`url(#goldFoil-${uid})`} stroke="#fff8df" strokeWidth="0.5" />
              <polygon points="0,-11.5 0.7,-9.5 2.5,-9 0.7,-8.5 0,-6.5 -0.7,-8.5 -2.5,-9 -0.7,-9.5" fill="#fff8df" />
              <rect x="-22" y="-6" width="44" height="2.5" rx="0.4" fill={`url(#goldFoil-${uid})`} stroke="#fff8df" strokeWidth="0.3" />
              <rect x="-17" y="-3.5" width="4.5" height="15" rx="0.6" fill={`url(#goldFoil-${uid})`} />
              <rect x="-7.5" y="-3.5" width="4.5" height="15" rx="0.6" fill={`url(#goldFoil-${uid})`} />
              <rect x="3" y="-3.5" width="4.5" height="15" rx="0.6" fill={`url(#goldFoil-${uid})`} />
              <rect x="12.5" y="-3.5" width="4.5" height="15" rx="0.6" fill={`url(#goldFoil-${uid})`} />
              <line x1="-14.75" y1="-2" x2="-14.75" y2="10" stroke="#fff8df" strokeWidth="0.6" opacity="0.8" />
              <line x1="-5.25" y1="-2" x2="-5.25" y2="10" stroke="#fff8df" strokeWidth="0.6" opacity="0.8" />
              <line x1="5.25" y1="-2" x2="5.25" y2="10" stroke="#fff8df" strokeWidth="0.6" opacity="0.8" />
              <line x1="14.75" y1="-2" x2="14.75" y2="10" stroke="#fff8df" strokeWidth="0.6" opacity="0.8" />
              <rect x="-20" y="11.5" width="40" height="2" rx="0.4" fill={`url(#goldFoil-${uid})`} />
              <rect x="-23" y="13.5" width="46" height="2" rx="0.4" fill={`url(#goldFoil-${uid})`} opacity="0.9" />
            </g>

            {/* Dòng chữ: BANKING & FINANCE */}
            <text
              x="70"
              y="926"
              textAnchor="middle"
              fill={`url(#goldFoil-${uid})`}
              fontFamily="'Cinzel', Georgia, serif"
              fontWeight="800"
              fontSize="5.6"
              letterSpacing="1.2"
            >
              BANKING &amp; FINANCE
            </text>
          </g>

          {/* Họa tiết bướm bay nghệ thuật bên trái nối nhịp uyển chuyển */}
          <ButterflyIcon x={16} y={930} size={20} color={GOLD} />

          {/* Mũ cử nhân mini đội chuẩn xác trên đỉnh đầu số 2 (xích qua trái theo yêu cầu) */}
          <g transform="translate(36, 948) rotate(-14) scale(0.68)">
            <polygon points="22,4 42,13 22,22 2,13" fill={`url(#goldFoil-${uid})`} stroke="#fff8dd" strokeWidth="0.8" />
            <path d="M 12 17 V 23 C 12 27, 32 27, 32 23 V 17 Z" fill="#9e7115" />
            <path d="M 22 13 C 22 17, 34 19, 34 25" stroke="#fff8dd" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <circle cx="34" cy="26" r="1.5" fill="#fff8dd" />
          </g>

          {/* CONSTELATION OF STARDUST & SPARKLE STARS AROUND 2026 (Hạ +20px đồng bộ) */}
          <g>
            {/* Chòm sao góc trên bên phải của số 2 */}
            <SparkleStar cx={98} cy={964} r={4.5} color="#fff8df" />
            <circle cx={108} cy={978} r={0.9} fill="#fced9d" />
            <circle cx={92} cy={982} r={0.75} fill="#fff8df" />

            {/* Chòm sao khoảng giữa bên trái (cạnh CLASS OF) */}
            <SparkleStar cx={22} cy={1002} r={3.6} color="#fced9d" />
            <circle cx={20} cy={1046} r={0.8} fill="#fff8df" />

            {/* Chòm sao khoảng giữa bên phải (cạnh số 0 và số 2) */}
            <SparkleStar cx={106} cy={1056} r={4.5} color="#fff8df" />
            <circle cx={102} cy={1092} r={0.85} fill="#fced9d" />

            {/* Chòm sao góc dưới bên trái (cạnh đuôi số 2 thứ hai) */}
            <SparkleStar cx={22} cy={1120} r={3.6} color="#fced9d" />

            {/* Chòm sao trung tâm dưới số 6 */}
            <SparkleStar cx={70} cy={1164} r={4.2} color="#fff8df" />
            <circle cx={58} cy={1164} r={0.8} fill="#fced9d" />
            <circle cx={82} cy={1164} r={0.8} fill="#fced9d" />
          </g>

          {/* DÒNG CHỮ CLASS OF XẾP DỌC HOÀNG GIA (C L A S S  O F) - Hạ +20px */}
          <g
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontWeight="800"
            fontSize="8.2"
            fill={`url(#goldFoil-${uid})`}
            textAnchor="middle"
            letterSpacing="0.6"
          >
            <text x="28" y="1016">C</text>
            <text x="28" y="1030">L</text>
            <text x="28" y="1044">A</text>
            <text x="28" y="1058">S</text>
            <text x="28" y="1072">S</text>
            <text x="28" y="1094">O</text>
            <text x="28" y="1108">F</text>
          </g>

          {/* ========================================================
              TRUNG TÂM NGHỆ THUẬT: CỤM SỐ 2 0 2 6 HOÀNG GIA ĐẲNG CẤP
              Hạ +20px đưa toàn bộ cụm số vào trung tâm đĩa mặt trời Đông Sơn
              1. royal-interlocking (Mặc định · Didone Lồng Khối Vàng Ánh Kim 3D)
              2. seamless-ribbon (Thư Pháp Dải Ruy Băng Vàng Liền Mạch)
              3. classic-italic (Thư Pháp Cổ Điển Tinh Giản)
             ======================================================== */}
          {yearStyle === "royal-interlocking" && (
            <g id="masterpiece-2026">
              {/* Nét uốn lượn liên hoàn kết nối mượt mà giữa các con số */}
              <path
                d="M 70 1004 C 77 1004, 80 1006, 80 1016"
                fill="none"
                stroke={`url(#goldFoil-${uid})`}
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <path
                d="M 79 1050 C 76 1058, 68 1056, 62 1060"
                fill="none"
                stroke={`url(#goldFoil-${uid})`}
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <path
                d="M 70 1084 C 77 1084, 80 1088, 80 1098"
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
                {/* Số 2 thứ nhất: x=60, y=1004 */}
                <text x="60" y="1004" fontSize="70">
                  2
                </text>
                {/* Số 0: x=80, y=1044 */}
                <text x="80" y="1044" fontSize="64">
                  0
                </text>
                {/* Số 2 thứ hai: x=60, y=1084 */}
                <text x="60" y="1084" fontSize="70">
                  2
                </text>
                {/* Số 6: x=80, y=1124 */}
                <text x="80" y="1124" fontSize="66">
                  6
                </text>
              </g>
            </g>
          )}

          {yearStyle === "seamless-ribbon" && (
            <g id="seamless-ribbon-2026" fill={`url(#goldFoil-${uid})`} transform="translate(0, 20)">
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
                <text x="60" y="1006" fontSize="68">
                  2
                </text>
                <text x="80" y="1048" fontSize="62">
                  0
                </text>
                <text x="60" y="1090" fontSize="68">
                  2
                </text>
                <text x="80" y="1132" fontSize="64">
                  6
                </text>
              </g>
              <path d="M 70 1006 C 77 1006, 80 1009, 80 1018" fill="none" stroke={`url(#goldFoil-${uid})`} strokeWidth="2.0" strokeLinecap="round" />
              <path d="M 78 1054 C 75 1062, 65 1062, 61 1066" fill="none" stroke={`url(#goldFoil-${uid})`} strokeWidth="2.0" strokeLinecap="round" />
              <path d="M 70 1090 C 77 1090, 80 1094, 80 1104" fill="none" stroke={`url(#goldFoil-${uid})`} strokeWidth="2.0" strokeLinecap="round" />
            </g>
          )}

          {/* ========================================================
              SPOT 2: CÁN CÂN TÀI CHÍNH & HUY HIỆU KIM TIỀN HOÀNG GIA
              (Golden Scales of Financial Balance · Equity · Mint Coin Medallion)
             ======================================================== */}
          <g id="spot2-banking-scales">
            {/* Cán cân tài chính cân bằng hoàn hảo (Scales of Fiscal Equilibrium) */}
            <g transform="translate(70, 1168) scale(0.85)">
              <line x1="0" y1="-9" x2="0" y2="10" stroke={`url(#goldFoil-${uid})`} strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="0" cy="-9" r="1.6" fill="#fff8df" />
              <polygon points="-5,10 5,10 3,8 -3,8" fill={`url(#goldFoil-${uid})`} />
              <line x1="-16" y1="-6" x2="16" y2="-6" stroke={`url(#goldFoil-${uid})`} strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="-16" cy="-6" r="1.1" fill="#fff8df" />
              <circle cx="16" cy="-6" r="1.1" fill="#fff8df" />
              {/* Đĩa cân trái & dây treo kim loại */}
              <line x1="-16" y1="-6" x2="-21" y2="3.5" stroke="#fced9d" strokeWidth="0.6" />
              <line x1="-16" y1="-6" x2="-11" y2="3.5" stroke="#fced9d" strokeWidth="0.6" />
              <path d="M -22 3.5 C -22 7.5, -10 7.5, -10 3.5 Z" fill={`url(#goldFoil-${uid})`} stroke="#fff8df" strokeWidth="0.5" />
              {/* Đĩa cân phải & dây treo kim loại */}
              <line x1="16" y1="-6" x2="11" y2="3.5" stroke="#fced9d" strokeWidth="0.6" />
              <line x1="16" y1="-6" x2="21" y2="3.5" stroke="#fced9d" strokeWidth="0.6" />
              <path d="M 10 3.5 C 10 7.5, 22 7.5, 22 3.5 Z" fill={`url(#goldFoil-${uid})`} stroke="#fff8df" strokeWidth="0.5" />
            </g>

            {/* Khẩu hiệu triết lý tài chính ngân hàng: EQUITY · CAPITAL · ASSETS */}
            <text
              x="70"
              y="1189"
              textAnchor="middle"
              fill="#fced9d"
              fontFamily="'Cinzel', Georgia, serif"
              fontWeight="700"
              fontSize="4.6"
              letterSpacing="1.2"
            >
              EQUITY · CAPITAL · ASSETS
            </text>

            {/* Vạch phân cách & Huy hiệu Kim Tiền Hoàng Gia (Imperial Mint Coin Medallion at y=1214) */}
            <line x1="28" y1="1214" x2="56" y2="1214" stroke={`url(#goldFoil-${uid})`} strokeWidth="0.75" opacity="0.9" />
            <line x1="84" y1="1214" x2="112" y2="1214" stroke={`url(#goldFoil-${uid})`} strokeWidth="0.75" opacity="0.9" />
            <g transform="translate(70, 1214)">
              <circle cx="0" cy="0" r="7.5" fill="#0b172a" stroke={`url(#goldFoil-${uid})`} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="5.8" fill="none" stroke="#fced9d" strokeWidth="0.5" strokeDasharray="1.2,1.2" />
              <polygon points="0,-3.5 1,-1 3.5,0 1,1 0,3.5 -1,1 -3.5,0 -1,-1" fill="#fff8df" />
              <circle cx="-10" cy="0" r="0.8" fill="#fff8df" />
              <circle cx="10" cy="0" r="0.8" fill="#fff8df" />
            </g>

            {/* Ngôi sao lấp lánh tầng dưới */}
            <SparkleStar cx={46} cy={1238} r={2.8} color={GOLD} />
            <SparkleStar cx={94} cy={1238} r={2.8} color={GOLD} />
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
                fill={`url(#goldFoil-${uid})`}
                fontFamily="'Great Vibes', 'Charm', cursive"
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
