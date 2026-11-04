import { useState } from "react"
import PrintStudio, { PrintSheets } from "./PrintStudio"
import { IUH_LOGO_WHITE, IUH_LOGO_HEADER, IUH_EMBLEM_ORIGINAL } from "./assets/logoData"
import { DongSonDrum, GraduationCapIcon, CornerFlourish } from "./DongSonDrum"

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
 * Logo biểu tượng IUH phóng to & dời xuống cân đối -> Tên trường 2 dòng -> Trống đồng Đông Sơn to rõ -> Monogram I - U - H dập nổi -> Class of 2026 -> Hoa văn góc nhọn
 */
function LeftSashArtwork() {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Nội dung vạt trái">
      {/* Top: Biểu tượng IUH riêng biệt, phóng to, dời xuống vừa tầm in */}
      <image
        href={IUH_EMBLEM_ORIGINAL}
        x="47"
        y="38"
        width="46"
        height="54"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Tên trường đặt ngay dưới biểu tượng logo */}
      <g fontFamily="'Noto Serif Display', Georgia, serif" fontWeight="600" fontSize="5.2" textAnchor="middle">
        <text x="70" y="104" fill="#fff4d0" letterSpacing="0.9">
          INDUSTRIAL UNIVERSITY OF
        </text>
        <text x="70" y="113" fill={GOLD} letterSpacing="1.2">
          HO CHI MINH CITY
        </text>
      </g>

      {/* Đường vạch phân cách trên */}
      <line x1="42" y1="124" x2="98" y2="124" stroke={GOLD} strokeWidth="0.6" opacity="0.6" />

      {/* Trống đồng Đông Sơn to, tròn, sắc nét ở tâm (70, 280) */}
      <svg x="-45" y="165" width="230" height="230" viewBox="0 0 400 400">
        <DongSonDrum size="100%" color="#f5d485" opacity={0.48} />
      </svg>

      {/* 3 chữ I - U - H lớn dập nổi vàng gold */}
      <g fontFamily="'Noto Serif Display', Georgia, serif" fontWeight="700" fontSize="56" fill="#fff4d0">
        <text x="70" y="215" textAnchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.75))">
          I
        </text>
        <text x="70" y="288" textAnchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.75))">
          U
        </text>
        <text x="70" y="360" textAnchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.75))">
          H
        </text>
      </g>

      {/* Đường vạch phân cách dưới */}
      <line x1="42" y1="435" x2="98" y2="435" stroke={GOLD} strokeWidth="0.6" opacity="0.6" />

      {/* Class of 2026 (2026 xuống dòng bên dưới Class of) */}
      <g id="class-of-2026">
        <text
          x="70"
          y="462"
          textAnchor="middle"
          fill={GOLD}
          fontFamily="Cherish, cursive"
          fontSize="26"
          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.6))"
        >
          Class of
        </text>
        <text
          x="70"
          y="492"
          textAnchor="middle"
          fill="#fff4d0"
          fontFamily="'Noto Serif Display', serif"
          fontWeight="700"
          fontSize="30"
          letterSpacing="1.8"
          filter="drop-shadow(0 2px 4px rgba(0,0,0,0.7))"
        >
          2026
        </text>
      </g>

      {/* Hoa văn góc nhọn ở đáy vạt (tái hiện chính xác theo ảnh thực tế) */}
      <g transform="translate(25, 510)">
        <CornerFlourish color={GOLD} />
      </g>
    </svg>
  )
}

export type NameFontStyle = "serif-caps" | "serif-title" | "sans-bold" | "cherish"

/**
 * Tác phẩm vector vạt phải:
 * Mũ cử nhân & Graduation dời xuống cân đối -> Trống đồng mờ nhẹ -> Tên Phạm Hữu Nghĩa (tùy biến font rõ ràng, sang trọng) | Viện & Khoa -> K18 -> Hoa văn góc nhọn
 */
function RightSashArtwork({ fontStyle = "serif-caps" }: { fontStyle?: NameFontStyle }) {
  return (
    <svg viewBox="0 0 140 580" className="sash-artwork-svg" aria-label="Nội dung vạt phải">
      {/* Top: Mũ cử nhân tốt nghiệp hoàng gia 3D sang trọng */}
      <g transform="translate(43, 36)">
        <GraduationCapIcon size={54} />
      </g>

      {/* Dòng chữ — Graduation — phong cách Học thuật Trang trọng (Academic Serif) */}
      <g id="graduation-label">
        <line x1="24" y1="104" x2="38" y2="104" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
        <circle cx="41" cy="104" r="1.1" fill="#fff4d0" />
        <text
          x="70"
          y="107.5"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#fff4d0"
          fontFamily="'Noto Serif Display', Georgia, serif"
          fontWeight="600"
          fontSize="12.5"
          letterSpacing="2.5"
          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))"
        >
          Graduation
        </text>
        <circle cx="99" cy="104" r="1.1" fill="#fff4d0" />
        <line x1="102" y1="104" x2="116" y2="104" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      </g>

      {/* Đường phân cách trên (ngang bằng chính xác với vạt trái ở y=124) */}
      <line x1="42" y1="124" x2="98" y2="124" stroke={GOLD} strokeWidth="0.6" opacity="0.6" />

      {/* Nền Trống đồng Đông Sơn in chìm đối xứng */}
      <svg x="-45" y="165" width="230" height="230" viewBox="0 0 400 400">
        <DongSonDrum size="100%" color="#f5d485" opacity={0.16} />
      </svg>

      {/* DÒNG TÊN: PHẠM HỮU NGHĨA (dễ nhìn, rõ nét, sang trọng, mặc định Serif Hoàng Gia in hoa chuẩn thực tế IUH) */}
      <g transform="rotate(90 48 278)">
        {fontStyle === "serif-caps" && (
          <text
            x="48"
            y="278"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Noto Serif Display', Georgia, serif"
            fontWeight="800"
            fontSize="23"
            letterSpacing="2.8"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            PHẠM HỮU NGHĨA
          </text>
        )}
        {fontStyle === "serif-title" && (
          <text
            x="48"
            y="278"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="'Noto Serif Display', Georgia, serif"
            fontWeight="700"
            fontSize="26"
            letterSpacing="1.8"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
        {fontStyle === "sans-bold" && (
          <text
            x="48"
            y="278"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="Inter, 'Segoe UI', Arial, sans-serif"
            fontWeight="800"
            fontSize="21"
            letterSpacing="3"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.85))"
          >
            PHẠM HỮU NGHĨA
          </text>
        )}
        {fontStyle === "cherish" && (
          <text
            x="48"
            y="278"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff4d0"
            fontFamily="Cherish, cursive"
            fontSize="50"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.75))"
          >
            Phạm Hữu Nghĩa
          </text>
        )}
      </g>

      {/* ĐƯỜNG KẺ CHỈ DỌC PHÂN CÁCH (ở x=68, từ y=155 đến y=400) */}
      <line x1="68" y1="155" x2="68" y2="400" stroke={GOLD} strokeWidth="0.6" opacity="0.6" />

      {/* TÊN VIỆN: VIỆN TÀI CHÍNH - KẾ TOÁN (phóng to đậm nét, dễ đọc, ở x=84) */}
      <g transform="rotate(90 84 278)">
        <text
          x="84"
          y="278"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff4d0"
          fontFamily="'Noto Serif Display', serif"
          fontWeight="700"
          fontSize="11.5"
          letterSpacing="1.8"
          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))"
        >
          VIỆN TÀI CHÍNH - KẾ TOÁN
        </text>
      </g>

      {/* TÊN KHOA: KHOA TÀI CHÍNH - NGÂN HÀNG (song song, sắc nét ở x=100) */}
      <g transform="rotate(90 100 278)">
        <text
          x="100"
          y="278"
          textAnchor="middle"
          dominantBaseline="middle"
          fill={GOLD}
          fontFamily="'Noto Serif Display', serif"
          fontWeight="700"
          fontSize="10.8"
          letterSpacing="1.6"
          filter="drop-shadow(0 1px 3px rgba(0,0,0,0.6))"
        >
          KHOA TÀI CHÍNH - NGÂN HÀNG
        </text>
      </g>

      {/* Đường phân cách dưới (ngang bằng chính xác với vạt trái ở y=435) */}
      <line x1="42" y1="435" x2="98" y2="435" stroke={GOLD} strokeWidth="0.6" opacity="0.6" />

      {/* K18 (ngang hàng chuẩn xác với Class of 2026 ở y=475) */}
      <text
        x="70"
        y="475"
        textAnchor="middle"
        fill="#fff4d0"
        fontFamily="'Noto Serif Display', serif"
        fontWeight="700"
        fontSize="28"
        letterSpacing="1"
      >
        K18
      </text>

      {/* Hoa văn góc nhọn ở đáy vạt (tái hiện chính xác theo ảnh thực tế) */}
      <g transform="translate(25, 510)">
        <CornerFlourish color={GOLD} />
      </g>
    </svg>
  )
}

function FrontSash({ fontStyle = "serif-caps" }: { fontStyle?: NameFontStyle }) {
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

      {/* Trống đồng Đông Sơn in chìm sắc nét ở tâm */}
      <svg x="-45" y="165" width="230" height="230" viewBox="0 0 400 400">
        <DongSonDrum size="100%" color="#f5d485" opacity={0.22} />
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

      {/* Trống đồng Đông Sơn in chìm sắc nét ở tâm */}
      <svg x="-45" y="165" width="230" height="230" viewBox="0 0 400 400">
        <DongSonDrum size="100%" color="#f5d485" opacity={0.22} />
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
  const [fontStyle, setFontStyle] = useState<NameFontStyle>("serif-caps")

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
            Mẫu sash nghi lễ đặc trưng IUH kết hợp hoa văn Trống đồng Đông Sơn in chìm sắc nét,
            chữ IUH nguyên khối, biểu tượng mũ cử nhân và nhận diện khóa K18.
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
        <span className="font-toolbar-title">CHỌN FONT CHỮ TÊN (PHẠM HỮU NGHĨA):</span>
        <div className="font-options">
          <button
            type="button"
            className={fontStyle === "serif-caps" ? "active" : ""}
            onClick={() => setFontStyle("serif-caps")}
          >
            ★ Serif Hoàng Gia (In hoa · Chuẩn mẫu IUH dễ nhìn nhất)
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
          <button
            type="button"
            className={fontStyle === "cherish" ? "active" : ""}
            onClick={() => setFontStyle("cherish")}
          >
            Thư Pháp Cũ (Cherish Cursive)
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
            tôn vinh thông tin họ tên và Viện Tài chính Kế toán.
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
