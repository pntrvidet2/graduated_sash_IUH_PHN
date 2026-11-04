import PrintSash, { type Side } from "./PrintSash"
import logoWhite from "./assets/iuh-logo-white.png"

const FONT_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Cherish&family=Inter:wght@500;700&family=Noto+Serif+Display:wght@500;600&display=swap"

function toDataUrl(url: string): Promise<string> {
  return fetch(url)
    .then((r) => r.blob())
    .then(
      (b) =>
        new Promise<string>((resolve, reject) => {
          const fr = new FileReader()
          fr.onload = () => resolve(String(fr.result))
          fr.onerror = reject
          fr.readAsDataURL(b)
        }),
    )
}

/** Fetches the Google font CSS and inlines every font file as base64. */
async function buildFontCss(): Promise<string> {
  const css = await (await fetch(FONT_CSS_URL)).text()
  const urls = [
    ...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1])),
  ]
  const data = await Promise.all(urls.map((u) => toDataUrl(u)))
  const inlined = urls.reduce((out, u, i) => out.split(u).join(data[i]), css)
  // Keep only the Latin and Vietnamese subsets to keep the SVG small.
  return inlined
    .split(/(?=\/\* [\w-]+ \*\/)/)
    .filter(
      (block) =>
        /^\/\* (latin|latin-ext|vietnamese) \*\//.test(block) ||
        !/^\/\* /.test(block),
    )
    .join("")
}

async function downloadSvg(side: Side) {
  let fontCss: string | undefined
  try {
    fontCss = await buildFontCss()
  } catch {
    fontCss = `@import url("${FONT_CSS_URL}");`
  }
  let logoSrc = logoWhite
  try {
    logoSrc = await toDataUrl(logoSrc)
  } catch {
    /* keep relative path */
  }
  const { renderToStaticMarkup } = await import("react-dom/server")
  const markup = renderToStaticMarkup(
    <PrintSash
      side={side}
      uid={`dl-${side}`}
      mm
      logoSrc={logoSrc}
      fontCss={fontCss}
    />,
  )
  const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${markup}`], {
    type: "image/svg+xml",
  })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = `sash-${side === "left" ? "trai" : "phai"}-140x1500mm.svg`
  a.click()
  URL.revokeObjectURL(a.href)
}

/** Hidden on screen; these are the pages the browser prints. */
export function PrintSheets() {
  return (
    <div className="print-sheets" aria-hidden="true">
      {(["left", "right"] as Side[]).map((side) => (
        <div className="print-sheet" key={side}>
          <PrintSash side={side} uid={`sheet-${side}`} mm />
        </div>
      ))}
    </div>
  )
}

export default function PrintStudio() {
  return (
    <section className="print-studio">
      <div className="print-intro">
        <p className="section-kicker">PRINT-READY</p>
        <h2>Bản in đúng kích thước thật</h2>
        <ul className="print-specs">
          <li>
            <b>140 × 1500 mm</b>
            <span>mỗi vạt, đầu nhọn 70 mm</span>
          </li>
          <li>
            <b>146 × 1506 mm</b>
            <span>khổ file, tràn lề 3 mm mỗi cạnh</span>
          </li>
          <li>
            <b>In thăng hoa</b>
            <span>vector, chữ giữ nguyên font</span>
          </li>
        </ul>
        <div className="print-actions">
          <button type="button" onClick={() => window.print()}>
            IN / LƯU PDF
          </button>
          <button type="button" onClick={() => downloadSvg("left")}>
            TẢI SVG VẠT TRÁI
          </button>
          <button type="button" onClick={() => downloadSvg("right")}>
            TẢI SVG VẠT PHẢI
          </button>
        </div>
        <ol className="print-steps">
          <li>Bấm IN / LƯU PDF, chọn máy in là Lưu thành PDF.</li>
          <li>Lề chọn Không có, bật Đồ họa nền, tỉ lệ 100%.</li>
          <li>
            Mỗi vạt là một trang. Đường nét hồng chỉ là đường cắt, sẽ không in
            ra.
          </li>
        </ol>
      </div>

      <div className="print-previews">
        {(["left", "right"] as Side[]).map((side) => (
          <figure key={side} className="print-preview">
            <div className="print-detail">
              <PrintSash side={side} uid={`detail-${side}`} crop />
            </div>
            <figcaption>
              {side === "left" ? "VẠT TRÁI" : "VẠT PHẢI"} · phần đầu rủ phóng to
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
