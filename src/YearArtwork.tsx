type YearArtworkProps = {
  fill: string
  yOffset?: number
  filter?: string
}

export default function YearArtwork({ fill, yOffset = 0, filter }: YearArtworkProps) {
  return (
    <g transform={`translate(0 ${yOffset})`}>
      <g id="masterpiece-2026" filter={filter} fill={fill}
        fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic"
        fontWeight="900" fontSize="62" textAnchor="middle">
        <text x="70" y="204">2</text>
        <text x="70" y="248">0</text>
        <text x="70" y="292">2</text>
        <text x="70" y="343" fontSize="56">6</text>
      </g>
      <g fill="none" stroke="#d8bd7b" strokeWidth="0.7" opacity="0.85" aria-hidden="true">
        <path d="M104 202 V323" />
        <path d="M104 196 l3 3 -3 3 -3 -3 Z M104 323 l3 3 -3 3 -3 -3 Z" />
      </g>
    </g>
  )
}
