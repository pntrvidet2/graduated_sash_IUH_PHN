import { useState } from "react"
import PrintStudio, { PrintSheets } from "./PrintStudio"
import { IUH_LOGO_WHITE, IUH_LOGO_HEADER, IUH_EMBLEM_ORIGINAL } from "./assets/logoData"
import {
  DongSonDrum,
  GraduationCapIcon,
  CornerFlourish,
  ButterflyIcon,
  SparkleStar,
  MiniGraduationCap,
} from "./DongSonDrum"

type ViewMode = "all" | "front" | "back" | "print"

const GOLD = "#e5ba42"

function sashOutlinePoints(side: "left" | "right", d: number): string {
  const yTopLeft = side === "left" ? 18 + d * 0.9 : d * 0.9
  const yTopRight = side === "left" ? d * 0.9 : 18 + d * 0.9
  const dy = 60
  const dx = 70
  const hyp = Math.sqrt(dx * dx + dy * dy)
  const sinA = dx / hyp
  const cosA = dy / hyp
  const yTip = 576 - d / sinA
  const yShoulder = 516 - (d * (1 - cosA)) / sinA
  return [
    `${d},${Math.round(yTopLeft * 10) / 10}`,
    `${140 - d},${Math.round(yTopRight * 10) / 10}`,
    `${140 - d},${Math.round(yShoulder * 10) / 10}`,
    `70,${Math.round(yTip * 10) / 10}`,
    `${d},${Math.round(yShoulder * 10) / 10}`,
  ].join(" ")
}

/* Khung viền chỉ vàng satin hoàng gia tinh tế, giải phóng không gian thoáng đãng bên trong */
function SashFrame({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className="sash-frame"
      viewBox="0 0 140 580"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Sọc viền ngoài thanh lịch */}
      <polygon
        points={sashOutlinePoints(side, 2.5)}
        fill="none"
        stroke={GOLD}
        strokeWidth="1.0"
        strokeLinejoin="miter"
      />
      {/* Đường chỉ mảnh viền trong cách 3px tạo khoảng thở */}
      <polygon
        points={sashOutlinePoints(side, 5.5)}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.5"
        strokeLinejoin="miter"
        opacity="0.8"
      />
    </svg>
  )
}

export type Year2026Style =
  | "royal-interlocking"
  | "seamless-ribbon"
  | "classic-italic"

/**
 * Tác phẩm vector vạt trái:
 * Logo biểu tượng IUH -> Vạch kim cương (y=82) -> NỀN TRỐNG ĐỒNG ĐÔNG SƠN NGỌC LŨ THỰC TẾ ->
 * Bướm bay nghệ thuật -> Mũ cử nhân mini trên đỉnh số 2 ->
 * Cụm số 2026 ĐẲNG CẤP VÀNG ÁNH KIM 3D & CLASS OF -> Ngôi sao lấp lánh -> Graduation thư pháp -> Hoa văn góc nhọn
 */
function LeftSashArtwork({ yearStyle = "royal-interlocking" }: { yearStyle?: Year2026Style }) {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Nội dung vạt trái">
      <defs>
        {/* Luxury Gold Foil Metallic Gradient (Ánh kim vàng 5 tầng hoàng gia) */}
        <linearGradient id="sashGoldFoil" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#fffce8" />
          <stop offset="18%" stopColor="#fced9d" />
          <stop offset="42%" stopColor="#dfa832" />
          <stop offset="68%" stopColor="#fdf0b0" />
          <stop offset="88%" stopColor="#c99120" />
          <stop offset="100%" stopColor="#9a6912" />
        </linearGradient>

        <linearGradient id="sashGoldAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dfa832" />
          <stop offset="50%" stopColor="#fff8df" />
          <stop offset="100%" stopColor="#dfa832" />
        </linearGradient>

        {/* Deep Luxury Embossed Shadow */}
        <filter id="sashRoyalShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.95" />
          <feDropShadow dx="0" dy="3.5" stdDeviation="4.0" floodColor="#000000" floodOpacity="0.65" />
        </filter>

        {/* Subtle Inner Gold Glow & 3D Shimmer */}
        <filter id="sashGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#fff4d0" floodOpacity="0.35" />
          <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.9" />
        </filter>
      </defs>

      {/* Top: Biểu tượng IUH thu nhỏ thanh nhã, căn chuẩn cân đối với vạt phải */}
      <image
        href={IUH_EMBLEM_ORIGINAL}
        x="50"
        y="22"
        width="40"
        height="44"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Đường vạch phân cách kim cương và ngôi sao lấp lánh dưới logo IUH ở y=82 (đồng mức tuyệt đối với vạt phải) */}
      <line x1="38" y1="82" x2="102" y2="82" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      <polygon points="70,79.5 72.5,82 70,84.5 67.5,82" fill="#fff4d0" />
      <circle cx="63" cy="82" r="0.8" fill="#fff4d0" />
      <circle cx="77" cy="82" r="0.8" fill="#fff4d0" />
      <SparkleStar cx={36} cy={82} r={2.2} color={GOLD} />
      <SparkleStar cx={104} cy={82} r={2.2} color={GOLD} />

      {/* Nền Trống đồng Đông Sơn Ngọc Lũ thực tế phóng to bao quát, chìm mờ thanh thoát */}
      <DongSonDrum x={-70} y={125} size={280} opacity={0.17} />

      {/* Họa tiết bướm bay nghệ thuật góc trên bên trái */}
      <ButterflyIcon x={30} y={118} size={24} color={GOLD} />

      {/* Mũ cử nhân mini đội nghiêng tự nhiên trên chóp số 2 lệch trái */}
      <g transform="translate(42, 126) rotate(-14) scale(0.88)" filter="url(#sashRoyalShadow)">
        <polygon points="50,11 90,28 50,44 10,28" fill="url(#sashGoldFoil)" stroke="#fff8dd" strokeWidth="0.8" />
        <path d="M 28 34 V 44 C 28 52, 72 52, 72 44 V 34 Z" fill="#9e7115" />
        <path d="M 50 28 C 50 34, 76 38, 76 46" stroke="#fff8dd" strokeWidth="1.2" fill="none" />
        <circle cx="76" cy="48" r="1.8" fill="#fff8dd" />
      </g>

      {/* Ngôi sao lấp lánh trang trí quanh cụm số 2026 chuẩn theo mẫu ảnh thực tế */}
      <g filter="url(#sashRoyalShadow)">
        <SparkleStar cx={90} cy={150} r={4.5} color="#fff8df" />
        <SparkleStar cx={26} cy={187} r={3.8} color="#fced9d" />
        <SparkleStar cx={100} cy={245} r={4.5} color="#fff8df" />
        <SparkleStar cx={28} cy={300} r={3.5} color="#fced9d" />
        <SparkleStar cx={70} cy={348} r={4.0} color="#fff8df" />
      </g>

      {/* DÒNG CHỮ CLASS OF XẾP DỌC HOÀNG GIA (C L A S S  O F) */}
      <g
        fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
        fontWeight="800"
        fontSize="8.2"
        fill="url(#sashGoldFoil)"
        textAnchor="middle"
        letterSpacing="0.6"
        filter="url(#sashRoyalShadow)"
      >
        <text x="32" y="196">C</text>
        <text x="32" y="210">L</text>
        <text x="32" y="224">A</text>
        <text x="32" y="238">S</text>
        <text x="32" y="252">S</text>
        <text x="32" y="274">O</text>
        <text x="32" y="288">F</text>
      </g>

      {/* ========================================================
          TRUNG TÂM NGHỆ THUẬT: CỤM SỐ 2 0 2 6 HOÀNG GIA ĐẲNG CẤP
          Hỗ trợ 3 phong cách thiết kế tinh tế:
          1. royal-interlocking (Mặc định · Didone Lồng Khối Vàng Ánh Kim 3D)
          2. seamless-ribbon (Thư Pháp Dải Ruy Băng Vàng Liền Mạch)
          3. classic-italic (Thư Pháp Cổ Điển Tinh Giản)
         ======================================================== */}
      {yearStyle === "royal-interlocking" && (
        <g id="masterpiece-2026" filter="url(#sashGoldGlow)">
          {/* Nét uốn lượn liên hoàn kết nối mượt mà giữa các con số */}
          {/* 2 -> 0: đuôi số 2 thứ nhất lượn cong vươn sang và nối vào đỉnh số 0 */}
          <path
            d="M 64 184 C 71 184, 76 186, 76 196"
            fill="none"
            stroke="url(#sashGoldFoil)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* 0 -> 2: đáy cong số 0 lượn nhẹ nối vào đỉnh số 2 thứ hai */}
          <path
            d="M 75 230 C 72 238, 62 236, 56 240"
            fill="none"
            stroke="url(#sashGoldFoil)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* 2 -> 6: đuôi số 2 thứ hai lượn cong vươn sang và nối vào cổ số 6 */}
          <path
            d="M 64 264 C 71 264, 76 268, 76 278"
            fill="none"
            stroke="url(#sashGoldFoil)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <g
            fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic"
            fontWeight="900"
            fill="url(#sashGoldFoil)"
            textAnchor="middle"
          >
            {/* Số 2 thứ nhất (54, 184) */}
            <text x="54" y="184" fontSize="72">
              2
            </text>
            {/* Số 0 (76, 224) */}
            <text x="76" y="224" fontSize="65">
              0
            </text>
            {/* Số 2 thứ hai (54, 264) */}
            <text x="54" y="264" fontSize="72">
              2
            </text>
            {/* Số 6 (76, 304) */}
            <text x="76" y="304" fontSize="68">
              6
            </text>
          </g>
        </g>
      )}

      {yearStyle === "seamless-ribbon" && (
        <g id="seamless-ribbon-2026" filter="url(#sashGoldGlow)" fill="url(#sashGoldFoil)">
          {/* Số 2 thứ nhất đúc vector nguyên khối với dải lụa nối sang 0 */}
          <path d="M 44 148 C 44 141, 52 135, 62 135 C 72 135, 78 142, 78 151 C 78 162, 70 171, 61 180 C 51 190, 44 198, 42 204 L 70 204 C 78 204, 84 207, 85 216 C 85 218, 83 218, 80 215 C 75 210, 68 209, 60 209 L 40 209 C 36 209, 36 204, 39 200 C 43 193, 52 183, 62 172 C 70 163, 73 157, 73 150 C 73 145, 68 140, 61 140 C 54 140, 49 144, 49 149 Z" />

          {/* Số 0 thanh nhã */}
          <path d="M 84 216 C 92 219, 98 228, 98 241 C 98 258, 88 268, 76 268 C 67 268, 62 261, 62 250 C 62 235, 72 221, 84 216 Z M 79 223 C 72 226, 68 236, 68 248 C 68 258, 72 263, 76 263 C 83 263, 91 254, 91 240 C 91 229, 85 223, 79 223 Z" />

          {/* Dải lụa nối 0 sang số 2 thứ hai */}
          <path d="M 73 266 C 68 274, 58 272, 54 276 C 52 278, 54 280, 57 278 C 62 275, 69 274, 75 268 Z" />

          {/* Số 2 thứ hai */}
          <path d="M 44 268 C 44 261, 52 255, 62 255 C 72 255, 78 262, 78 271 C 78 282, 70 291, 61 300 C 51 310, 44 318, 42 324 L 70 324 C 78 324, 84 327, 85 336 C 85 338, 83 338, 80 335 C 75 330, 68 329, 60 329 L 40 329 C 36 329, 36 324, 39 320 C 43 313, 52 303, 62 292 C 70 283, 73 277, 73 270 C 73 265, 68 260, 61 260 C 54 260, 49 264, 49 269 Z" />

          {/* Dải lụa nối 2 sang 6 */}
          <path d="M 83 334 C 87 338, 88 345, 87 353 L 82 352 C 83 346, 82 341, 79 337 Z" />

          {/* Số 6 uốn lượn hoàn mỹ */}
          <path d="M 87 348 C 87 340, 83 333, 75 333 C 65 333, 58 344, 58 361 C 58 377, 68 388, 80 388 C 91 388, 98 377, 98 364 C 98 353, 91 345, 80 345 C 73 345, 67 350, 64 356 C 65 345, 71 338, 78 338 C 83 338, 85 342, 85 348 Z M 78 350 C 86 350, 91 356, 91 365 C 91 374, 86 383, 78 383 C 71 383, 64 375, 64 365 C 64 356, 71 350, 78 350 Z" />
        </g>
      )}

      {yearStyle === "classic-italic" && (
        <g id="classic-italic-2026" filter="url(#sashGoldGlow)">
          <g
            fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic"
            fontWeight="700"
            fill="url(#sashGoldFoil)"
            textAnchor="middle"
          >
            <text x="56" y="186" fontSize="68">
              2
            </text>
            <text x="76" y="228" fontSize="62">
              0
            </text>
            <text x="56" y="270" fontSize="68">
              2
            </text>
            <text x="76" y="312" fontSize="64">
              6
            </text>
          </g>
          {/* Nét lụa vàng liên kết thanh mảnh */}
          <path d="M 64 186 C 71 186, 76 189, 76 198" fill="none" stroke="url(#sashGoldFoil)" strokeWidth="2.0" strokeLinecap="round" />
          <path d="M 74 234 C 71 242, 61 242, 57 246" fill="none" stroke="url(#sashGoldFoil)" strokeWidth="2.0" strokeLinecap="round" />
          <path d="M 64 270 C 71 270, 76 274, 76 284" fill="none" stroke="url(#sashGoldFoil)" strokeWidth="2.0" strokeLinecap="round" />
        </g>
      )}

      {/* Đường gạch ngang hoàng gia decor và chùm ngôi sao lấp lánh (Bridging Divider & Stardust) */}
      <g filter="url(#sashRoyalShadow)">
        {/* Chùm sao lấp lánh tầng trên */}
        <SparkleStar cx={70} cy={392} r={5} color="#fced9d" />
        <SparkleStar cx={48} cy={388} r={3} color="#fff8df" />
        <SparkleStar cx={92} cy={388} r={3} color="#fff8df" />

        {/* Đường gạch ngang hoàng gia tinh xảo */}
        <line x1="36" y1="414" x2="62" y2="414" stroke="url(#sashGoldAccent)" strokeWidth="0.7" strokeLinecap="round" opacity="0.9" />
        <line x1="78" y1="414" x2="104" y2="414" stroke="url(#sashGoldAccent)" strokeWidth="0.7" strokeLinecap="round" opacity="0.9" />
        <polygon points="70,411.5 72.5,414 70,416.5 67.5,414" fill="#fff8df" />
        <circle cx="65" cy="414" r="0.8" fill="#dfa832" />
        <circle cx="75" cy="414" r="0.8" fill="#dfa832" />
        <circle cx="58" cy="414" r="0.6" fill="#fff8df" />
        <circle cx="82" cy="414" r="0.6" fill="#fff8df" />
        <SparkleStar cx={34} cy={414} r={2.8} color="#dfa832" />
        <SparkleStar cx={106} cy={414} r={2.8} color="#dfa832" />

        {/* Sao lấp lánh tầng dưới */}
        <SparkleStar cx={46} cy={438} r={2.8} color="#dfa832" />
        <SparkleStar cx={94} cy={438} r={2.8} color="#dfa832" />
      </g>

      {/* Chữ Graduation thư pháp uốn lượn (căn tại y=468, bằng ngang trung tâm tuyệt đối với K18) */}
      <g filter="url(#sashRoyalShadow)">
        <SparkleStar cx={24} cy={468} r={3} color="#dfa832" />
        <SparkleStar cx={116} cy={468} r={3} color="#dfa832" />
        <text
          x="70"
          y="468"
          textAnchor="middle"
          dominantBaseline="central"
          fill="url(#sashGoldFoil)"
          fontFamily="'Great Vibes', 'Charm', cursive"
          fontSize="28"
          letterSpacing="1"
        >
          Graduation
        </text>
      </g>

      {/* Hoa văn góc nhọn ở đáy vạt */}
      <g transform="translate(25, 510)">
        <CornerFlourish color={GOLD} />
      </g>
    </svg>
  )
}

export type NameFontStyle =
  | "script-charm"
  | "script-greatvibes"
  | "script-dancing"
  | "serif-italic"
  | "script-alexbrush"
  | "serif-caps"

/**
 * Tác phẩm vector vạt phải:
 * Mũ cử nhân tốt nghiệp -> Chữ IUH ngay dưới mũ -> Vạch kim cương ->
 * NỀN TRỐNG ĐỒNG ĐÔNG SƠN NGỌC LŨ THỰC TẾ ->
 * Viện trên & Khoa dưới (tách bạch rõ ràng, KHÔNG chạm K18) | Tên sinh viên thư pháp chuẩn mẫu thực tế ->
 * Khoảng thở 64px -> Khóa K18 -> Hoa văn góc nhọn
 */
function RightSashArtwork({ fontStyle = "script-greatvibes" }: { fontStyle?: NameFontStyle }) {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Nội dung vạt phải">
      <defs>
        <linearGradient id="sashRightGoldFoil" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#fffce8" />
          <stop offset="18%" stopColor="#fced9d" />
          <stop offset="42%" stopColor="#dfa832" />
          <stop offset="68%" stopColor="#fdf0b0" />
          <stop offset="88%" stopColor="#c99120" />
          <stop offset="100%" stopColor="#9a6912" />
        </linearGradient>
      </defs>

      {/* Top: Mũ cử nhân tốt nghiệp hoàng gia 3D sắc nét */}
      <g transform="translate(48, 14)">
        <GraduationCapIcon size={44} />
      </g>

      {/* Tên trường tiếng Anh thu nhỏ thanh nhã, cân xứng hoàn hảo với logo IUH bên vạt trái */}
      <text
        x="70"
        y="62"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#dfb143"
        fontFamily="'Cinzel', Georgia, serif"
        fontWeight="800"
        fontSize="5.2"
        letterSpacing="1.1"
        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.85))"
      >
        INDUSTRIAL UNIVERSITY
      </text>
      <text
        x="70"
        y="71"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff4d0"
        fontFamily="'Cinzel', Georgia, serif"
        fontWeight="700"
        fontSize="4.7"
        letterSpacing="1.2"
        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.85))"
      >
        OF HO CHI MINH CITY
      </text>

      {/* Đường phân cách trên có họa tiết kim cương và ngôi sao ở y=82 (đồng mức tuyệt đối với vạt trái) */}
      <line x1="38" y1="82" x2="102" y2="82" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      <polygon points="70,79.5 72.5,82 70,84.5 67.5,82" fill="#fff4d0" />
      <circle cx="63" cy="82" r="0.8" fill="#fff4d0" />
      <circle cx="77" cy="82" r="0.8" fill="#fff4d0" />
      <SparkleStar cx={36} cy={82} r={2.2} color={GOLD} />
      <SparkleStar cx={104} cy={82} r={2.2} color={GOLD} />

      {/* Nền Trống đồng Đông Sơn Ngọc Lũ thực tế phóng to bao quát, chìm mờ thanh thoát */}
      <DongSonDrum x={-70} y={125} size={280} opacity={0.17} />

      {/* CỘT 1 (x=33): KHOA TÀI CHÍNH - NGÂN HÀNG (ĐÃ ĐỔI VỊ TRÍ, SIZE 9.5PX, MÀU VÀNG GOLD QUÝ PHÁI) */}
      <g transform="rotate(90 33 268)">
        <text
          x="33"
          y="268"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#dfb143"
          fontFamily="'Playfair Display', 'Noto Serif Display', Georgia, serif"
          fontWeight="700"
          fontSize="9.5"
          letterSpacing="1.0"
          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.85))"
        >
          KHOA TÀI CHÍNH - NGÂN HÀNG
        </text>
      </g>

      {/* CỘT 2 (x=51): VIỆN TÀI CHÍNH - KẾ TOÁN (ĐÃ ĐỔI VỊ TRÍ SÁT CẠNH TÊN, SIZE LỚN 11.5PX, MÀU TRẮNG NGỌC NỔI BẬT) */}
      <g transform="rotate(90 51 268)">
        <text
          x="51"
          y="268"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#ffffff"
          fontFamily="'Playfair Display', 'Noto Serif Display', Georgia, serif"
          fontWeight="800"
          fontSize="11.5"
          letterSpacing="1.2"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.95))"
        >
          VIỆN TÀI CHÍNH - KẾ TOÁN
        </text>
      </g>

      {/* CỘT 3 (x=88): DÒNG TÊN SINH VIÊN (PHẠM HỮU NGHĨA - THƯ PHÁP THANH THOÁT, KÉO DÀI TRANG TRỌNG) */}
      <g transform="rotate(90 88 268)">
        {fontStyle === "script-charm" && (
          <text
            x="88"
            y="268"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Charm', 'Alex Brush', cursive"
            fontWeight="600"
            fontSize="36"
            letterSpacing="2.2"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "script-greatvibes" && (
          <text
            x="88"
            y="268"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="url(#sashRightGoldFoil)"
            fontFamily="'Great Vibes', 'Charm', cursive"
            fontSize="38"
            letterSpacing="1.5"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "script-dancing" && (
          <text
            x="88"
            y="268"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Dancing Script', cursive"
            fontWeight="700"
            fontSize="33"
            letterSpacing="1.6"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "serif-italic" && (
          <text
            x="88"
            y="268"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Playfair Display', Georgia, serif"
            fontStyle="italic"
            fontWeight="800"
            fontSize="26"
            letterSpacing="1.8"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "script-alexbrush" && (
          <text
            x="88"
            y="268"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Alex Brush', cursive"
            fontSize="37"
            letterSpacing="1.5"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "serif-caps" && (
          <text
            x="88"
            y="268"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="800"
            fontSize="21"
            letterSpacing="3.0"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            PHẠM HỮU NGHĨA
          </text>
        )}
      </g>

      {/* Đường gạch ngang hoàng gia decor và chùm ngôi sao lấp lánh (Bridging Divider & Stardust) */}
      <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))">
        {/* Chùm sao lấp lánh tầng trên */}
        <SparkleStar cx={70} cy={392} r={5} color="#f3db83" />
        <SparkleStar cx={48} cy={388} r={3} color="#fff4d0" />
        <SparkleStar cx={92} cy={388} r={3} color="#fff4d0" />

        {/* Đường gạch ngang hoàng gia tinh xảo */}
        <line x1="36" y1="414" x2="62" y2="414" stroke={GOLD} strokeWidth="0.65" strokeLinecap="round" opacity="0.85" />
        <line x1="78" y1="414" x2="104" y2="414" stroke={GOLD} strokeWidth="0.65" strokeLinecap="round" opacity="0.85" />
        <polygon points="70,411.5 72.5,414 70,416.5 67.5,414" fill="#fff4d0" />
        <circle cx="65" cy="414" r="0.8" fill={GOLD} />
        <circle cx="75" cy="414" r="0.8" fill={GOLD} />
        <circle cx="58" cy="414" r="0.6" fill="#fff4d0" />
        <circle cx="82" cy="414" r="0.6" fill="#fff4d0" />
        <SparkleStar cx={34} cy={414} r={2.8} color={GOLD} />
        <SparkleStar cx={106} cy={414} r={2.8} color={GOLD} />

        {/* Sao lấp lánh tầng dưới */}
        <SparkleStar cx={46} cy={438} r={2.8} color={GOLD} />
        <SparkleStar cx={94} cy={438} r={2.8} color={GOLD} />
      </g>

      {/* K18 (chuẩn Roman Serif Cinzel, căn chính xác tuyệt đối trung tâm x=70, y=468, màu vàng gold quý phái) */}
      <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))">
        <SparkleStar cx={24} cy={468} r={3} color={GOLD} />
        <SparkleStar cx={116} cy={468} r={3} color={GOLD} />
        <text
          x="70"
          y="468"
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

      {/* Hoa văn góc nhọn ở đáy vạt */}
      <g transform="translate(25, 510)">
        <CornerFlourish color={GOLD} />
      </g>
    </svg>
  )
}

function FrontSash({
  fontStyle = "script-greatvibes",
  yearStyle = "royal-interlocking",
}: {
  fontStyle?: NameFontStyle
  yearStyle?: Year2026Style
}) {
  return (
    <div className="sash-set front-sash" aria-label="Thiết kế mặt trước sash">
      {/* Vạt Trái */}
      <article className="sash-panel sash-left">
        <div className="sash-inner">
          <SashFrame side="left" />
          <LeftSashArtwork yearStyle={yearStyle} />
        </div>
      </article>

      {/* Vạt Phải */}
      <article className="sash-panel sash-right">
        <div className="sash-inner">
          <SashFrame side="right" />
          <RightSashArtwork fontStyle={fontStyle} />
        </div>
      </article>
    </div>
  )
}

/**
 * Tác phẩm vector vạt trái mặt sau:
 * Đường kẻ trên -> Trống đồng Đông Sơn in chìm -> Chữ INDUSTRIAL UNIVERSITY lớn, đậm nét -> Hoa văn góc nhọn
 */
function BackLeftSashArtwork() {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Mặt sau vạt trái">
      {/* Vạch kẻ chỉ vàng phía trên với hạt ngọc trang trí */}
      <line x1="70" y1="45" x2="70" y2="120" stroke={GOLD} strokeWidth="0.8" opacity="0.8" />
      <circle cx="70" cy="123" r="1.2" fill="#fff4d0" />

      {/* Trống đồng Đông Sơn cổ truyền thực tế in chìm sắc nét, phóng to thanh thoát ở tâm */}
      <DongSonDrum x={-70} y={145} size={280} opacity={0.18} />

      {/* DÒNG CHỮ: INDUSTRIAL UNIVERSITY (phóng to rõ ràng, đậm nét, xoay dọc ở x=70, tâm y=285) */}
      <g transform="rotate(90 70 285)">
        <text
          x="70"
          y="285"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff4d0"
          fontFamily="'Noto Serif Display', Georgia, serif"
          fontWeight="700"
          fontSize="20"
          letterSpacing="2.8"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.75))"
        >
          INDUSTRIAL UNIVERSITY
        </text>
      </g>

      {/* Hoa văn góc nhọn ở đáy vạt */}
      <g transform="translate(25, 510)">
        <CornerFlourish color={GOLD} />
      </g>
    </svg>
  )
}

/**
 * Tác phẩm vector vạt phải mặt sau:
 * Đường kẻ trên -> Trống đồng Đông Sơn in chìm -> Chữ HO CHI MINH CITY · 2026 lớn, đậm nét -> Hoa văn góc nhọn
 */
function BackRightSashArtwork() {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Mặt sau vạt phải">
      {/* Vạch kẻ chỉ vàng phía trên với hạt ngọc trang trí */}
      <line x1="70" y1="45" x2="70" y2="120" stroke={GOLD} strokeWidth="0.8" opacity="0.8" />
      <circle cx="70" cy="123" r="1.2" fill="#fff4d0" />

      {/* Trống đồng Đông Sơn cổ truyền thực tế in chìm sắc nét, phóng to thanh thoát ở tâm */}
      <DongSonDrum x={-70} y={145} size={280} opacity={0.18} />

      {/* DÒNG CHỮ: HO CHI MINH CITY · 2026 (phóng to rõ ràng, đậm nét, xoay dọc ở x=70, tâm y=285) */}
      <g transform="rotate(90 70 285)">
        <text
          x="70"
          y="285"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff4d0"
          fontFamily="'Noto Serif Display', Georgia, serif"
          fontWeight="700"
          fontSize="18.5"
          letterSpacing="2.5"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.75))"
        >
          HO CHI MINH CITY · 2026
        </text>
      </g>

      {/* Hoa văn góc nhọn ở đáy vạt */}
      <g transform="translate(25, 510)">
        <CornerFlourish color={GOLD} />
      </g>
    </svg>
  )
}

function BackSash() {
  return (
    <div className="back-wrap" aria-label="Thiết kế mặt sau sash">
      <div className="sash-set back-sash">
        <article className="sash-panel sash-left">
          <div className="sash-inner">
            <SashFrame side="left" />
            <BackLeftSashArtwork />
          </div>
        </article>
        <article className="sash-panel sash-right">
          <div className="sash-inner">
            <SashFrame side="right" />
            <BackRightSashArtwork />
          </div>
        </article>
      </div>
    </div>
  )
}

function OptionCard({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="option-card">
      <span>{number}</span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  )
}

export default function App() {
  const [view, setView] = useState<ViewMode>("all")
  const [fontStyle, setFontStyle] = useState<NameFontStyle>("script-greatvibes")
  const [yearStyle, setYearStyle] = useState<Year2026Style>("royal-interlocking")

  return (
    <main>
      <header className="site-header">
        <div className="header-brand">
          <img
            src={IUH_LOGO_HEADER}
            alt="IUH Logo"
            className="header-logo"
          />
          <span className="brand-rule" />
          <span className="brand-monogram">IUH · PHN</span>
          <span className="brand-rule" />
          <div>
            <b>GRADUATION SASH</b>
            <small>ĐÔNG SƠN HERITAGE EDITION · 2026</small>
          </div>
        </div>
        <div className="header-right">
          <span className="version-pill" title="Đã đánh tag git cho từng bản update">
            <span className="tag-dot" />
            TAG <strong>v1.10.0</strong> · Đồng Bộ Font Great Vibes Của Graduation Sang Tên Sinh Viên
          </span>
          <p className="header-student-name">PHẠM HỮU NGHĨA</p>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="section-kicker">HERITAGE EDITION · K18</p>
          <h1>
            Khí chất Đông Sơn,
            <br />
            <em>vinh danh ngày tốt nghiệp.</em>
          </h1>
        </div>
        <div className="hero-note">
          <span>01</span>
          <p>
            Mẫu sash nghi lễ đặc trưng IUH (v1.10.0): Tên sinh viên "Phạm Hữu Nghĩa" đã được chuyển đổi mặc định sang đúng phông thư pháp Great Vibes uốn lượn bay bổng của chữ "Graduation", mang lại sự đồng bộ mỹ thuật hoàn hảo giữa hai vạt sash.
          </p>
        </div>
      </section>

      <nav className="view-switcher" aria-label="Chọn mặt sash">
        {(["all", "front", "back", "print"] as ViewMode[]).map((mode) => {
          const label =
            mode === "all"
              ? "CẢ HAI MẶT"
              : mode === "front"
                ? "MẶT TRƯỚC"
                : mode === "back"
                  ? "MẶT SAU"
                  : "BẢN IN"
          return (
            <button
              key={mode}
              className={view === mode ? "active" : ""}
              onClick={() => setView(mode)}
              type="button"
            >
              {label}
            </button>
          )
        })}
      </nav>

      {/* Thanh công cụ tùy chỉnh font chữ tên sinh viên */}
      <div className="font-toolbar" aria-label="Tùy chọn kiểu chữ tên sinh viên">
        <span className="font-toolbar-title">FONT CHỮ TÊN (PHẠM HỮU NGHĨA):</span>
        <div className="font-options">
          <button
            type="button"
            className={fontStyle === "script-greatvibes" ? "active" : ""}
            onClick={() => setFontStyle("script-greatvibes")}
          >
            ★ Thư Pháp Graduation (Great Vibes · Đồng Bộ Mặc Định)
          </button>
          <button
            type="button"
            className={fontStyle === "script-charm" ? "active" : ""}
            onClick={() => setFontStyle("script-charm")}
          >
            Thư Pháp Hoàng Gia (Charm)
          </button>
          <button
            type="button"
            className={fontStyle === "script-alexbrush" ? "active" : ""}
            onClick={() => setFontStyle("script-alexbrush")}
          >
            Thư Pháp Mềm Mại (Alex Brush)
          </button>
          <button
            type="button"
            className={fontStyle === "script-dancing" ? "active" : ""}
            onClick={() => setFontStyle("script-dancing")}
          >
            Viết Tay Hiện Đại (Dancing Script)
          </button>
          <button
            type="button"
            className={fontStyle === "serif-italic" ? "active" : ""}
            onClick={() => setFontStyle("serif-italic")}
          >
            Serif Nghiêng Cổ Điển (Playfair Display)
          </button>
          <button
            type="button"
            className={fontStyle === "serif-caps" ? "active" : ""}
            onClick={() => setFontStyle("serif-caps")}
          >
            Serif Hoàng Gia (In hoa)
          </button>
        </div>
      </div>

      {/* Thanh công cụ tùy chỉnh kiểu thiết kế cụm số 2026 */}
      <div className="font-toolbar" style={{ marginTop: "-16px" }} aria-label="Tùy chọn kiểu thiết kế cụm số 2026">
        <span className="font-toolbar-title">THIẾT KẾ CỤM SỐ 2026:</span>
        <div className="font-options">
          <button
            type="button"
            className={yearStyle === "royal-interlocking" ? "active" : ""}
            onClick={() => setYearStyle("royal-interlocking")}
          >
            ★ Didone Hoàng Gia Lồng Khối · Vàng Ánh Kim 3D (Đẹp Nhất · Mặc Định)
          </button>
          <button
            type="button"
            className={yearStyle === "seamless-ribbon" ? "active" : ""}
            onClick={() => setYearStyle("seamless-ribbon")}
          >
            Thư Pháp Ruy Băng Vàng Liền Mạch (Seamless Ribbon)
          </button>
          <button
            type="button"
            className={yearStyle === "classic-italic" ? "active" : ""}
            onClick={() => setYearStyle("classic-italic")}
          >
            Thư Pháp Cổ Điển Tinh Giản (Classic Italic)
          </button>
        </div>
      </div>

      {view === "print" ? (
        <PrintStudio fontStyle={fontStyle} yearStyle={yearStyle} />
      ) : (
        <section className={`showcase view-${view}`}>
          {(view === "all" || view === "front") && (
            <div className="design-column">
              <div className="design-heading">
                <span>01</span>
                <div>
                  <p>THE FRONT</p>
                  <h2>Mặt trước</h2>
                </div>
              </div>
              <FrontSash fontStyle={fontStyle} yearStyle={yearStyle} />
            </div>
          )}

          {(view === "all" || view === "back") && (
            <div className="design-column">
              <div className="design-heading">
                <span>02</span>
                <div>
                  <p>THE BACK</p>
                  <h2>Mặt sau</h2>
                </div>
              </div>
              <BackSash />
            </div>
          )}
        </section>
      )}
      <PrintSheets />

      <section className="design-notes">
        <div className="notes-intro">
          <p className="section-kicker">HERITAGE DESIGN LANGUAGE</p>
          <h2>
            Bản sắc truyền thống &amp;
            <br />
            <em>tinh thần học thuật IUH.</em>
          </h2>
        </div>
        <div className="option-list">
          <OptionCard number="01" title="Nền Trống Đồng Đông Sơn">
            Hoa văn mặt trống đồng với ngôi sao 14 cánh, chim Lạc bay và răng cưa in chìm
            sắc sảo, tôn vinh chữ I - U - H lớn dập nổi vàng gold.
          </OptionCard>
          <OptionCard number="02" title="Mũ Cử Nhân &amp; Nhận diện K18">
            Đỉnh vạt phải khắc họa biểu tượng Mũ tốt nghiệp uy nghiêm cùng nhận diện
            khóa K18 và hoa văn góc hoàng gia ở mũi nhọn vạt.
          </OptionCard>
          <OptionCard number="03" title="Viền Đôi Vàng Gold Ánh Kim">
            Đường chỉ đôi chạy liền mạch suốt dải sash trên nền satin Navy sâu,
            tôn vinh thông tin họ tên, Viện Tài chính - Kế toán và Khoa Tài chính - Ngân hàng.
          </OptionCard>
        </div>
      </section>

      <footer>
        <p>IUH · GRADUATION 2026 · K18</p>
        <div className="palette">
          <span style={{ background: "#0b1b3e" }} />
          <span style={{ background: "#e5ba42" }} />
          <span style={{ background: "#f8f3e6" }} />
          <b>DEEP NAVY / BRONZE GOLD / IVORY</b>
        </div>
        <small>
          BẢN THIẾT KẾ Ý TƯỞNG · CHỐT KỸ THUẬT IN/THÊU VỚI ĐƠN VỊ SẢN XUẤT
        </small>
      </footer>
    </main>
  )
}
