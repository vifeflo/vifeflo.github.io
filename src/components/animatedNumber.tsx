import { useEffect, useRef, useState } from "react"

type AnimatedNumberProps = {
  value: string
}

const ANIMATION_DURATION = 1200
const OBSERVER_THRESHOLD = 0.5

export default function AnimatedNumber({ value }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const element = ref.current
    const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/)

    if (!element || !match) {
      setDisplayValue(value)
      return
    }

    const [, prefix, numericText, suffix] = match
    const target = Number(numericText.replaceAll(".", ""))

    const formatValue = (current: number) => {
      const rounded = Math.round(current)
      const formattedNumber = numericText.includes(".")
        ? rounded.toLocaleString("pt-BR")
        : String(rounded)

      return `${prefix}${formattedNumber}${suffix}`
    }

    let frame = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(frame)

        if (!entry.isIntersecting) {
          setDisplayValue(formatValue(0))
          return
        }

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setDisplayValue(value)
          return
        }

        const startedAt = performance.now()

        const animate = (now: number) => {
          const progress = Math.min(
            (now - startedAt) / ANIMATION_DURATION,
            1,
          )
          const eased = 1 - Math.pow(1 - progress, 3)

          setDisplayValue(formatValue(target * eased))

          if (progress < 1) {
            frame = requestAnimationFrame(animate)
          }
        }

        frame = requestAnimationFrame(animate)
      },
      { threshold: OBSERVER_THRESHOLD },
    )

    observer.observe(element)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [value])

  return <span ref={ref}>{displayValue}</span>
}