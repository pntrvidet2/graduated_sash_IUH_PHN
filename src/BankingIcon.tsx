export default function BankingIcon({ y, gold }: { y: number; gold: string }) {
  return (
    <g transform={`translate(70 ${y})`} aria-label="Biểu tượng ngân hàng">
      <path d="M-20-5 L0-14 L20-5 Z" fill={gold} />
      <path d="M-20-3 H20 M-17 9 H17 M-20 12 H20" fill="none"
        stroke={gold} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M-14-2 V8 M-5-2 V8 M5-2 V8 M14-2 V8" fill="none"
        stroke={gold} strokeWidth="2.4" />
      <circle cx="0" cy="-7" r="1" fill="#fff8df" />
    </g>
  )
}
