export default function DashedDivider() {
  // Configuração do divisor
  const dash = 6
  const gap = 12
  const thickness = 1
  const color = "#ababab"
  const opacity = 0.3

  return (
    <div
      aria-hidden="true"
      className="w-full"
      style={{
        height: `${thickness}px`,
        opacity,
        backgroundImage: `repeating-linear-gradient(
          to right,
          ${color} 0,
          ${color} ${dash}px,
          transparent ${dash}px,
          transparent ${dash + gap}px
        )`,
      }}
    />
  )
}