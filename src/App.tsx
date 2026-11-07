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

/**
 * Tác phẩm vector vạt trái:
 * Logo biểu tượng IUH -> Vạch kim cương -> NỀN TRỐNG ĐỒNG ĐÔNG SƠN NGỌC LŨ THỰC TẾ -> Bướm bay nghệ thuật -> Mũ cử nhân mini trên đỉnh số 2 -> Cụm số 2026 nghiêng thanh thoát & CLASS OF -> Ngôi sao lấp lánh -> Graduation thư pháp -> Hoa văn góc nhọn
 */
function LeftSashArtwork() {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Nội dung vạt trái">
      {/* Top: Biểu tượng IUH thu nhỏ thanh nhã, không có chữ ở dưới theo yêu cầu */}
      <image
        href={IUH_EMBLEM_ORIGINAL}
        x="53"
        y="22"
        width="34"
        height="38"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Đường vạch phân cách kim cương thanh mảnh dưới logo IUH ở y=68 */}
      <line x1="38" y1="68" x2="102" y2="68" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      <polygon points="70,65.5 72.5,68 70,70.5 67.5,68" fill="#fff4d0" />
      <circle cx="63" cy="68" r="0.8" fill="#fff4d0" />
      <circle cx="77" cy="68" r="0.8" fill="#fff4d0" />

      {/* Nền Trống đồng Đông Sơn Ngọc Lũ thực tế phóng to bao quát, chìm mờ thanh thoát */}
      <DongSonDrum x={-70} y={125} size={280} opacity={0.17} />

      {/* Họa tiết bướm bay nghệ thuật góc trên bên trái */}
      <ButterflyIcon x={30} y={126} size={24} color={GOLD} />

      {/* Mũ cử nhân mini đội nghiêng tự nhiên trên chóp số 2 lệch trái */}
      <MiniGraduationCap x={49} y={138} size={20} />

      {/* Ngôi sao lấp lánh trang trí quanh cụm số 2026 */}
      <SparkleStar cx={92} cy={168} r={4.5} color="#fff4d0" />
      <SparkleStar cx={38} cy={220} r={4} color={GOLD} />
      <SparkleStar cx={96} cy={280} r={4.5} color="#fff4d0" />
      <SparkleStar cx={46} cy={372} r={4} color={GOLD} />

      {/* Chữ CLASS OF chạy dọc cạnh số 2026 */}
      <g transform="rotate(90 34 266)">
        <text
          x="34"
          y="266"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#dfb143"
          fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
          fontWeight="700"
          fontSize="8.2"
          letterSpacing="3.5"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
        >
          CLASS OF
        </text>
      </g>

      {/* Cụm 4 số 2 - 0 - 2 - 6 xếp xéo nhau (diagonally staggered) và nối nhau nghệ thuật (Interlocking Ribbon) */}
      <g id="connected-year-2026">
        {/* Dải lụa nối uốn lượn từ chân số 2 (trái) sang đỉnh số 0 (phải) */}
        <path
          d="M 54 192 C 68 196, 78 206, 80 216"
          fill="none"
          stroke="#f3db83"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
        />

        {/* Dải lụa nối uốn lượn từ chân số 0 (phải) sang đầu số 2 thứ hai (trái) */}
        <path
          d="M 80 258 C 76 266, 68 266, 60 268"
          fill="none"
          stroke="#f3db83"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
        />

        {/* Dải lụa uốn lượn từ chân số 2 thứ hai nối và bao quanh số 6 */}
        <path
          d="M 52 292 C 72 298, 86 308, 80 318"
          fill="none"
          stroke="#f3db83"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
        />
        <path
          d="M 72 356 C 88 362, 92 374, 84 384 C 76 392, 66 396, 74 402"
          fill="none"
          stroke="#f3db83"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.9"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
        />

        {/* 4 chữ số 2 - 0 - 2 - 6 thư pháp: XẾP XÉO NHAU (2 trái -> 0 phải -> 2 trái -> 6 phải) */}
        <g
          fontFamily="'Charm', 'Alex Brush', cursive"
          fontWeight="700"
          fill="#f3db83"
          textAnchor="middle"
        >
          {/* Số 2 thứ nhất (lệch trái) */}
          <text x="60" y="188" fontSize="56" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))">
            2
          </text>
          {/* Số 0 (xếp xéo sang phải) */}
          <text x="80" y="238" fontSize="50" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))">
            0
          </text>
          {/* Số 2 thứ hai (xếp xéo sang trái) */}
          <text x="60" y="288" fontSize="56" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))">
            2
          </text>
          {/* Số 6 (xếp xéo sang phải với đuôi cong uốn lượn) */}
          <text x="80" y="338" fontSize="52" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))">
            6
          </text>
        </g>
      </g>

      {/* Ngôi sao lấp lánh trung tâm dưới số 2026 */}
      <SparkleStar cx={70} cy={416} r={5} color="#f3db83" />

      {/* Chữ Graduation thư pháp uốn lượn (căn tại y=468, bằng ngang trung tâm tuyệt đối với K18) */}
      <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))">
        <SparkleStar cx={24} cy={468} r={3} color={GOLD} />
        <SparkleStar cx={116} cy={468} r={3} color={GOLD} />
        <text
          x="70"
          y="468"
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
function RightSashArtwork({ fontStyle = "script-charm" }: { fontStyle?: NameFontStyle }) {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Nội dung vạt phải">
      {/* Top: Mũ cử nhân tốt nghiệp hoàng gia 3D sắc nét */}
      <g transform="translate(45, 14)">
        <GraduationCapIcon size={50} />
      </g>

      {/* Tên trường bằng tiếng Anh trang trọng dưới mũ cử nhân theo đúng yêu cầu */}
      <text
        x="70"
        y="68"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#dfb143"
        fontFamily="'Cinzel', Georgia, serif"
        fontWeight="800"
        fontSize="7.2"
        letterSpacing="1.6"
        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.85))"
      >
        INDUSTRIAL UNIVERSITY
      </text>
      <text
        x="70"
        y="79"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff4d0"
        fontFamily="'Cinzel', Georgia, serif"
        fontWeight="700"
        fontSize="6.6"
        letterSpacing="1.8"
        filter="drop-shadow(0 1px 2px rgba(0,0,0,0.85))"
      >
        OF HO CHI MINH CITY
      </text>

      {/* Đường phân cách trên có họa tiết kim cương ở y=92 */}
      <line x1="34" y1="92" x2="106" y2="92" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      <polygon points="70,89.5 72.5,92 70,94.5 67.5,92" fill="#fff4d0" />
      <circle cx="63" cy="92" r="0.8" fill="#fff4d0" />
      <circle cx="77" cy="92" r="0.8" fill="#fff4d0" />

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
            fill="#fff4d0"
            fontFamily="'Great Vibes', cursive"
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

      {/* K18 (chuẩn Roman Serif Cinzel, căn chính xác tuyệt đối trung tâm x=70, y=468, màu vàng gold quý phái) */}
      <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))">
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

function FrontSash({ fontStyle = "script-greatvibes" }: { fontStyle?: NameFontStyle }) {
  return (
    <div className="sash-set front-sash" aria-label="Thiết kế mặt trước sash">
      {/* Vạt Trái */}
      <article className="sash-panel sash-left">
        <div className="sash-inner">
          <SashFrame side="left" />
          <LeftSashArtwork />
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
  const [fontStyle, setFontStyle] = useState<NameFontStyle>("script-charm")

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
            TAG <strong>v1.5.0</strong> · 2026 Xếp Xéo Nối Liền · K18 Căn Giữa Hoàng Kim · Tên Tiếng Anh IUH
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
            Mẫu sash nghi lễ đặc trưng IUH (v1.5.0): Logo IUH thu nhỏ thanh nhã không chữ dưới, mũ cử nhân có tên tiếng Anh "INDUSTRIAL UNIVERSITY OF HO CHI MINH CITY", cụm số 2026 xếp xéo uốn lượn nối liền nghệ thuật, Trống đồng phóng to 280px bề thế chìm mờ tinh tế, K18 chuẩn trung tâm hoàng kim sắc sảo.
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
            className={fontStyle === "script-charm" ? "active" : ""}
            onClick={() => setFontStyle("script-charm")}
          >
            ★ Thư Pháp Hoàng Gia (Charm · Chuẩn ảnh mẫu thực tế)
          </button>
          <button
            type="button"
            className={fontStyle === "script-greatvibes" ? "active" : ""}
            onClick={() => setFontStyle("script-greatvibes")}
          >
            Thư Pháp Bay Bổng (Great Vibes)
          </button>
          <button
            type="button"
            className={fontStyle === "script-dancing" ? "active" : ""}
            onClick={() => setFontStyle("script-dancing")}
          >
            Viết Tay Hiện Đại Rõ Nét (Dancing Script)
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
            className={fontStyle === "script-alexbrush" ? "active" : ""}
            onClick={() => setFontStyle("script-alexbrush")}
          >
            Thư Pháp Mềm Mại (Alex Brush)
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

      {view === "print" ? (
        <PrintStudio fontStyle={fontStyle} />
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
              <FrontSash fontStyle={fontStyle} />
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
