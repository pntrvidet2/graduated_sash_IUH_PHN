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

/* Khung sọc viền kép / viền ba sang trọng chạy dọc toàn bộ biên dải sash */
function SashFrame({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className="sash-frame"
      viewBox="0 0 140 580"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Line 1: Sọc viền ngoài */}
      <polygon
        points={sashOutlinePoints(side, 3.5)}
        fill="none"
        stroke={GOLD}
        strokeWidth="1.2"
        strokeLinejoin="miter"
      />
      {/* Line 2: Sọc viền giữa (tạo dải sọc song song sắc nét) */}
      <polygon
        points={sashOutlinePoints(side, 7)}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.8"
        strokeLinejoin="miter"
        opacity="0.9"
      />
      {/* Line 3: Đường chỉ mảnh viền trong */}
      <polygon
        points={sashOutlinePoints(side, 10.5)}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.5"
        strokeLinejoin="miter"
        opacity="0.65"
      />
    </svg>
  )
}

/**
 * Tác phẩm vector vạt trái:
 * Logo biểu tượng IUH -> Vạch kim cương -> Bướm bay nghệ thuật -> Mũ cử nhân mini trên đỉnh số 2 -> Cụm số 2026 xếp dọc & CLASS OF -> Ngôi sao lấp lánh -> Graduation thư pháp -> Hoa văn góc nhọn
 */
function LeftSashArtwork() {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Nội dung vạt trái">
      {/* Top: Biểu tượng IUH riêng biệt, phóng to, dời xuống vừa tầm in */}
      <image
        href={IUH_EMBLEM_ORIGINAL}
        x="47"
        y="36"
        width="46"
        height="54"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Đường vạch phân cách trên có họa tiết kim cương (đồng bộ tuyệt đối với vạt phải ở y=106) */}
      <line x1="34" y1="106" x2="106" y2="106" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      <polygon points="70,103.5 72.5,106 70,108.5 67.5,106" fill="#fff4d0" />
      <circle cx="63" cy="106" r="0.8" fill="#fff4d0" />
      <circle cx="77" cy="106" r="0.8" fill="#fff4d0" />

      {/* Họa tiết bướm bay nghệ thuật (Butterfly Line-art) */}
      <ButterflyIcon x={28} y={150} size={28} color={GOLD} />

      {/* Mũ cử nhân mini đội nghiêng trên đỉnh số 2 */}
      <MiniGraduationCap x={58} y={158} size={22} />

      {/* Ngôi sao lấp lánh trang trí quanh số 2026 */}
      <SparkleStar cx={98} cy={145} r={5.5} color="#fff4d0" />
      <SparkleStar cx={38} cy={232} r={4.5} color={GOLD} />
      <SparkleStar cx={98} cy={335} r={5} color="#fff4d0" />
      <SparkleStar cx={48} cy={395} r={4} color={GOLD} />

      {/* Chữ CLASS OF chạy dọc cạnh số 2026 */}
      <g transform="rotate(90 40 290)">
        <text
          x="40"
          y="290"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff4d0"
          fontFamily="'Noto Serif Display', Georgia, serif"
          fontWeight="700"
          fontSize="9.5"
          letterSpacing="4.5"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.7))"
        >
          CLASS OF
        </text>
      </g>

      {/* Cụm 4 số 2 - 0 - 2 - 6 xếp dọc nghệ thuật */}
      <g
        fontFamily="'Noto Serif Display', 'Playfair Display', Georgia, serif"
        fontStyle="italic"
        fontWeight="800"
        fontSize="52"
        fill="#fff4d0"
        textAnchor="middle"
      >
        <text x="76" y="204" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
          2
        </text>
        <text x="76" y="262" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
          0
        </text>
        <text x="76" y="320" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
          2
        </text>
        <text x="76" y="378" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">
          6
        </text>
      </g>

      {/* Ngôi sao lấp lánh trung tâm dưới số 2026 */}
      <SparkleStar cx={70} cy={430} r={6} color="#fff4d0" />

      {/* Chữ Graduation thư pháp uốn lượn tuyệt đẹp */}
      <text
        x="70"
        y="470"
        textAnchor="middle"
        fill="#fff4d0"
        fontFamily="'Alex Brush', 'Great Vibes', 'Allura', cursive"
        fontSize="28"
        letterSpacing="1"
        filter="drop-shadow(0 1px 3px rgba(0,0,0,0.75))"
      >
        Graduation
      </text>

      {/* Hoa văn góc nhọn ở đáy vạt */}
      <g transform="translate(25, 510)">
        <CornerFlourish color={GOLD} />
      </g>
    </svg>
  )
}

export type NameFontStyle =
  | "script-slanted"
  | "script-vibes"
  | "script-allura"
  | "serif-caps"
  | "serif-title"
  | "sans-bold"

/**
 * Tác phẩm vector vạt phải:
 * Mũ cử nhân tốt nghiệp -> Chữ IUH ngay dưới mũ -> Vạch kim cương -> Viện (trên) & Khoa (dưới) | Tên sinh viên (in nghiêng mẫu thực tế) -> Khóa K18 -> Hoa văn góc nhọn
 */
function RightSashArtwork({ fontStyle = "script-slanted" }: { fontStyle?: NameFontStyle }) {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Nội dung vạt phải">
      {/* Top: Mũ cử nhân tốt nghiệp hoàng gia 3D sang trọng */}
      <g transform="translate(45, 30)">
        <GraduationCapIcon size={50} />
      </g>

      {/* Chữ IUH in hoa đậm nét nằm ngay dưới mũ cử nhân */}
      <text
        x="70"
        y="86"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fff4d0"
        fontFamily="'Noto Serif Display', Georgia, serif"
        fontWeight="800"
        fontSize="16"
        letterSpacing="4"
        filter="drop-shadow(0 1px 3px rgba(0,0,0,0.8))"
      >
        IUH
      </text>

      {/* Đường phân cách trên có họa tiết kim cương (đồng bộ tuyệt đối với vạt trái ở y=106) */}
      <line x1="34" y1="106" x2="106" y2="106" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      <polygon points="70,103.5 72.5,106 70,108.5 67.5,106" fill="#fff4d0" />
      <circle cx="63" cy="106" r="0.8" fill="#fff4d0" />
      <circle cx="77" cy="106" r="0.8" fill="#fff4d0" />

      {/* Nền Trống đồng Đông Sơn cổ truyền thực tế in chìm tinh tế */}
      <svg x="-45" y="165" width="230" height="230" viewBox="0 0 400 400">
        <DongSonDrum size="100%" opacity={0.16} />
      </svg>

      {/* CỘT TRÁI: VIỆN ĐIỀN TRÊN, KHOA ĐIỀN DƯỚI, SIZE CHỮ TO RÕ RÀNG */}
      {/* 1. Viện Tài Chính - Kế Toán (Viện nằm ở phần trên) */}
      <g transform="rotate(90 44 205)">
        <text
          x="44"
          y="205"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff4d0"
          fontFamily="'Noto Serif Display', Georgia, serif"
          fontWeight="800"
          fontSize="12.5"
          letterSpacing="1.8"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.85))"
        >
          VIỆN TÀI CHÍNH - KẾ TOÁN
        </text>
      </g>

      {/* Hạt kim cương phân cách giữa Viện và Khoa */}
      <g>
        <circle cx="44" cy="274" r="0.8" fill={GOLD} />
        <polygon points="44,279.5 46.5,282 44,284.5 41.5,282" fill="#fff4d0" />
        <circle cx="44" cy="290" r="0.8" fill={GOLD} />
      </g>

      {/* 2. Khoa Tài Chính - Ngân Hàng (Khoa nằm ở phần dưới) */}
      <g transform="rotate(90 44 360)">
        <text
          x="44"
          y="360"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff4d0"
          fontFamily="'Noto Serif Display', Georgia, serif"
          fontWeight="700"
          fontSize="12"
          letterSpacing="1.6"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))"
        >
          KHOA TÀI CHÍNH - NGÂN HÀNG
        </text>
      </g>

      {/* CỘT PHẢI: DÒNG TÊN SINH VIÊN (PHẠM HỮU NGHĨA) */}
      <g transform="rotate(90 86 282)">
        {fontStyle === "script-slanted" && (
          <text
            x="86"
            y="282"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Alex Brush', 'Great Vibes', 'Allura', cursive"
            fontSize="42"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "script-vibes" && (
          <text
            x="86"
            y="282"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Great Vibes', cursive"
            fontSize="38"
            letterSpacing="1"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "script-allura" && (
          <text
            x="86"
            y="282"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Allura', cursive"
            fontSize="44"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "serif-caps" && (
          <text
            x="86"
            y="282"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Noto Serif Display', Georgia, serif"
            fontWeight="800"
            fontSize="22"
            letterSpacing="2.8"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            PHẠM HỮU NGHĨA
          </text>
        )}
        {fontStyle === "serif-title" && (
          <text
            x="86"
            y="282"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Noto Serif Display', Georgia, serif"
            fontWeight="700"
            fontSize="25"
            letterSpacing="1.8"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "sans-bold" && (
          <text
            x="86"
            y="282"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="Inter, 'Segoe UI', Arial, sans-serif"
            fontWeight="800"
            fontSize="20"
            letterSpacing="3"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            PHẠM HỮU NGHĨA
          </text>
        )}
      </g>

      {/* K18 (ngang hàng chuẩn xác với Graduation ở vạt trái) */}
      <text
        x="70"
        y="476"
        textAnchor="middle"
        fill="#fff4d0"
        fontFamily="'Noto Serif Display', Georgia, serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="1.5"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
      >
        K18
      </text>

      {/* Hoa văn góc nhọn ở đáy vạt */}
      <g transform="translate(25, 510)">
        <CornerFlourish color={GOLD} />
      </g>
    </svg>
  )
}

function FrontSash({ fontStyle = "script-slanted" }: { fontStyle?: NameFontStyle }) {
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

      {/* Trống đồng Đông Sơn cổ truyền thực tế in chìm sắc nét ở tâm */}
      <svg x="-45" y="165" width="230" height="230" viewBox="0 0 400 400">
        <DongSonDrum size="100%" opacity={0.34} />
      </svg>

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

      {/* Trống đồng Đông Sơn cổ truyền thực tế in chìm sắc nét ở tâm */}
      <svg x="-45" y="165" width="230" height="230" viewBox="0 0 400 400">
        <DongSonDrum size="100%" opacity={0.34} />
      </svg>

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
  const [fontStyle, setFontStyle] = useState<NameFontStyle>("script-slanted")

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
        <p>PHẠM HỮU NGHĨA</p>
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
            Mẫu sash nghi lễ đặc trưng IUH: Vạt trái số 2026 xếp dọc cùng bướm bay và mũ cử nhân mini,
            vạt phải mũ tốt nghiệp, logo IUH, Viện trên - Khoa dưới và tên sinh viên in nghiêng thư pháp.
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
            className={fontStyle === "script-slanted" ? "active" : ""}
            onClick={() => setFontStyle("script-slanted")}
          >
            ★ In Nghiêng Mẫu Thực Tế (Alex Brush · Chuẩn ảnh mẫu, nét đều rõ ràng)
          </button>
          <button
            type="button"
            className={fontStyle === "script-vibes" ? "active" : ""}
            onClick={() => setFontStyle("script-vibes")}
          >
            In Nghiêng Lượn (Great Vibes)
          </button>
          <button
            type="button"
            className={fontStyle === "script-allura" ? "active" : ""}
            onClick={() => setFontStyle("script-allura")}
          >
            In Nghiêng Mềm Mại (Allura)
          </button>
          <button
            type="button"
            className={fontStyle === "serif-caps" ? "active" : ""}
            onClick={() => setFontStyle("serif-caps")}
          >
            Serif Hoàng Gia (In hoa)
          </button>
          <button
            type="button"
            className={fontStyle === "serif-title" ? "active" : ""}
            onClick={() => setFontStyle("serif-title")}
          >
            Serif Cổ Điển (Viết hoa chữ đầu)
          </button>
          <button
            type="button"
            className={fontStyle === "sans-bold" ? "active" : ""}
            onClick={() => setFontStyle("sans-bold")}
          >
            Hiện Đại (Sans Bold)
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
