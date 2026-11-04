import { useState } from "react"
import PrintStudio, { PrintSheets } from "./PrintStudio"

type ViewMode = "all" | "front" | "back" | "print"

const GOLD = "#d8ad4b"

function IuhLogo() {
  return (
    <div className="iuh-logo">
      <img
        src={`${import.meta.env.BASE_URL}assets/iuh-logo-full.png`}
        alt="Biểu trưng Industrial University of Ho Chi Minh City"
      />
    </div>
  )
}

/* Three straight lines stacked like a stepped pyramid */
function StepLines() {
  return (
    <svg className="step-lines" viewBox="0 0 48 12" aria-hidden="true">
      <path d="M17 1.5H31M9 6H39M1 10.5H47" />
    </svg>
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
      <polygon points={scale(0.9, 0.975)} />
      <polygon points={scale(0.86, 0.96)} className="frame-inner" />
    </svg>
  )
}

function FinanceEmblem() {
  return (
    <div className="finance-emblem">
      <StepLines />
      <p>FINANCE</p>
      <small>CLASS OF 2022</small>
    </div>
  )
}

function FrontSash() {
  return (
    <div className="sash-set front-sash" aria-label="Thiết kế mặt trước sash">
      <article className="sash-panel sash-left">
        <div className="sash-inner">
          <SashFrame side="left" />
          <div className="sash-top">
            <IuhLogo />
          </div>
          <div className="sash-mid">
            <StepLines />
            <span className="label">KHOA</span>
            <b className="faculty">
              TÀI CHÍNH
              <br />
              NGÂN HÀNG
            </b>
          </div>
          <div className="sash-bottom">
            <span className="rule-h" />
            <span className="label label-ivory">CLASS OF</span>
            <strong className="year">2022</strong>
          </div>
        </div>
      </article>

      <article className="sash-panel sash-right">
        <div className="sash-inner">
          <SashFrame side="right" />
          <div className="sash-top">
            <StepLines />
            <span className="label label-ivory">CỬ NHÂN</span>
          </div>
          <div className="name-zone">
            <h2 className="student-name">Phạm Hữu Nghĩa</h2>
          </div>
          <div className="sash-bottom">
            <span className="rule-h" />
            <span className="label label-ivory">CLASS OF</span>
            <strong className="year">2022</strong>
          </div>
        </div>
      </article>
    </div>
  )
}

function BackSash() {
  return (
    <div className="back-wrap" aria-label="Thiết kế mặt sau sash">
      <div className="back-collar">
        <FinanceEmblem />
      </div>
      <div className="sash-set back-sash">
        <article className="sash-panel sash-left">
          <div className="sash-inner">
            <SashFrame side="left" />
            <div className="sash-mid">
              <span className="line-v" />
              <p className="vertical-copy">INDUSTRIAL UNIVERSITY</p>
              <span className="line-v" />
            </div>
          </div>
        </article>
        <article className="sash-panel sash-right">
          <div className="sash-inner">
            <SashFrame side="right" />
            <div className="sash-mid">
              <span className="line-v" />
              <p className="vertical-copy">HO CHI MINH CITY · 2022</p>
              <span className="line-v" />
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
          <span className="brand-monogram">IUH</span>
          <span className="brand-rule" />
          <div>
            <b>GRADUATION STOLE</b>
            <small>DESIGN CONCEPT · 2022</small>
          </div>
        </div>
        <p>PHẠM HỮU NGHĨA</p>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="section-kicker">THE FINANCE EDITION</p>
          <h1>
            Dấu ấn
            <br />
            <em>ngày tốt nghiệp.</em>
          </h1>
        </div>
        <div className="hero-note">
          <span>01</span>
          <p>
            Một thiết kế sash mang tinh thần học thuật, tiết chế và trang trọng
            — dành riêng cho cột mốc 2022.
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
          <p className="section-kicker">DESIGN LANGUAGE</p>
          <h2>
            Tinh giản để
            <br />
            tạo nên <em>khí chất.</em>
          </h2>
        </div>
        <div className="option-list">
          <OptionCard number="01" title="Typography nghi lễ">
            Bodoni Moda Italic cho họ tên với nét tương phản cao; Noto Serif
            Display cho thông tin khoa và niên khóa.
          </OptionCard>
          <OptionCard number="02" title="Họa tiết đường thẳng">
            Khung kép chạy theo đúng hình vạt và bậc ba nét gợi kim tự tháp Ai
            Cập, đối xứng, dễ thêu hoặc ép nhũ.
          </OptionCard>
          <OptionCard number="03" title="Navy & champagne gold">
            Nền navy sâu phối vàng champagne trầm, chỉ dùng một tông vàng và
            ivory cho chữ để mặt sash sạch và dễ nhìn.
          </OptionCard>
        </div>
      </section>

      <footer>
        <p>IUH · GRADUATION 2022</p>
        <div className="palette">
          <span />
          <span style={{ background: GOLD }} />
          <span style={{ background: "#f1ecdf" }} />
          <b>NAVY / ANTIQUE GOLD / IVORY</b>
        </div>
        <small>
          BẢN THIẾT KẾ Ý TƯỞNG · CHỐT KỸ THUẬT THÊU VỚI ĐƠN VỊ SẢN XUẤT
        </small>
      </footer>
    </main>
  )
}
