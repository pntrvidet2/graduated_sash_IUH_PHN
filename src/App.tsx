import { useState } from "react"
import PrintStudio, { PrintSheets } from "./PrintStudio"
import { IUH_LOGO_WHITE, IUH_LOGO_HEADER } from "./assets/logoData"
import { DongSonDrum, GraduationCapIcon, CornerFlourish } from "./DongSonDrum"

type ViewMode = "all" | "front" | "back" | "print"

const GOLD = "#e5ba42"

function IuhLogo() {
  return (
    <div className="iuh-logo">
      <img
        src={IUH_LOGO_WHITE}
        alt="Biểu trưng Industrial University of Ho Chi Minh City"
      />
    </div>
  )
}

/* Double straight-line frame that follows the sash outline */
function SashFrame({ side }: { side: "left" | "right" }) {
  const base: [number, number][] =
    side === "left"
      ? [
          [0, 3.2],
          [100, 0],
          [100, 88.8],
          [50, 99.6],
          [0, 88.8],
        ]
      : [
          [0, 0],
          [100, 3.2],
          [100, 88.8],
          [50, 99.6],
          [0, 88.8],
        ]
  const scale = (sx: number, sy: number) =>
    base
      .map(([x, y]) => `${50 + (x - 50) * sx},${50 + (y - 50) * sy}`)
      .join(" ")
  return (
    <svg
      className="sash-frame"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon points={scale(0.92, 0.98)} />
      <polygon points={scale(0.86, 0.96)} className="frame-inner" />
    </svg>
  )
}

function FrontSash() {
  return (
    <div className="sash-set front-sash" aria-label="Thiết kế mặt trước sash">
      {/* Vạt Trái (chữ I - U - H lớn trên nền trống đồng Đông Sơn) */}
      <article className="sash-panel sash-left">
        <div className="sash-inner">
          <SashFrame side="left" />

          {/* Top: Chỉ để Logo IUH gọn gàng (đã có sẵn biểu tượng & chữ IUH) */}
          <div className="sash-top-zone">
            <IuhLogo />
            <span className="accent-separator" />
          </div>

          {/* Mid: Trống đồng Đông Sơn to, sắc nét, rực rỡ + chữ I - U - H lớn */}
          <div className="dongson-body-zone">
            <div className="dongson-watermark">
              <DongSonDrum size={280} color="#f5d485" opacity={0.48} />
            </div>
            <div className="monogram-iuh-vertical">
              <span>I</span>
              <span>U</span>
              <span>H</span>
            </div>
          </div>

          {/* Bottom: Class of 2026 + Hoa văn góc nhọn */}
          <div className="sash-bottom-zone">
            <span className="accent-separator" />
            <div className="class-box-inline">
              <span className="script-class-word">Class of</span>
              <strong className="year-dongson">2026</strong>
            </div>
            <div className="corner-flourish-wrap">
              <CornerFlourish />
            </div>
          </div>
        </div>
      </article>

      {/* Vạt Phải (Mũ tốt nghiệp, Họ tên dọc & Viện song song, K18) */}
      <article className="sash-panel sash-right">
        <div className="sash-inner">
          <SashFrame side="right" />

          {/* Top: Mũ cử nhân + Chữ — Graduation — riêng biệt */}
          <div className="sash-top-zone">
            <GraduationCapIcon size={56} />
            <div className="graduation-label">
              <span className="flourish-line" />
              <em>Graduation</em>
              <span className="flourish-line" />
            </div>
            <span className="accent-separator" />
          </div>

          {/* Mid: Họ tên chạy dọc + Viện song song nằm gọn gàng, không bị đè */}
          <div className="name-zone-dongson">
            <div className="vertical-columns-container">
              <h2 className="student-name-script">Phạm Hữu Nghĩa</h2>
              <span className="divider-vertical-line" />
              <span className="faculty-name-text">VIỆN TÀI CHÍNH KẾ TOÁN</span>
            </div>
          </div>

          {/* Bottom: K18 riêng biệt + Hoa văn góc nhọn */}
          <div className="sash-bottom-zone">
            <span className="accent-separator" />
            <div className="k18-badge-dongson">K18</div>
            <div className="corner-flourish-wrap">
              <CornerFlourish />
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

function BackSash() {
  return (
    <div className="back-wrap" aria-label="Thiết kế mặt sau sash">
      <div className="sash-set back-sash">
        <article className="sash-panel sash-left">
          <div className="sash-inner">
            <SashFrame side="left" />
            <div className="sash-mid">
              <div className="dongson-watermark" style={{ opacity: 0.18 }}>
                <DongSonDrum size={240} color="#f5d485" />
              </div>
              <span className="line-v" />
              <p className="vertical-copy">INDUSTRIAL UNIVERSITY</p>
              <span className="line-v" />
            </div>
            <div className="sash-bottom-zone">
              <div className="corner-flourish-wrap">
                <CornerFlourish />
              </div>
            </div>
          </div>
        </article>
        <article className="sash-panel sash-right">
          <div className="sash-inner">
            <SashFrame side="right" />
            <div className="sash-mid">
              <div className="dongson-watermark" style={{ opacity: 0.18 }}>
                <DongSonDrum size={240} color="#f5d485" />
              </div>
              <span className="line-v" />
              <p className="vertical-copy">HO CHI MINH CITY · 2026</p>
              <span className="line-v" />
            </div>
            <div className="sash-bottom-zone">
              <div className="corner-flourish-wrap">
                <CornerFlourish />
              </div>
            </div>
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

      {view === "print" ? (
        <PrintStudio />
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
              <FrontSash />
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
