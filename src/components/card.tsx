import { useRef, type PointerEvent as ReactPointerEvent } from "react"

const assetPathPrefix = "/assets"

export type Project = {
  id: string
  image: string
  tags: string
  title: string
  description: string
  wide?: boolean
}

type CardProps = {
  onOpen?: () => void
  project: Project
  delay: number
  underConstruction?: boolean
}

export default function Card({
  onOpen,
  project,
  delay,
  underConstruction = false,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const card = cardRef.current

    if (
      !card ||
      event.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return
    }

    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const rotateX = (0.5 - y) * 5
    const rotateY = (x - 0.5) * 5

    // O reflexo se desloca conforme a inclinação do card.
    const lightX = Math.min(100, Math.max(0, 50 - rotateY * 16))
    const lightY = Math.min(100, Math.max(0, 50 + rotateX * 16))

    card.style.setProperty("--rotate-x", `${rotateX}deg`)
    card.style.setProperty("--rotate-y", `${rotateY}deg`)
    card.style.setProperty("--light-x", `${lightX}%`)
    card.style.setProperty("--light-y", `${lightY}%`)
    card.style.setProperty("--card-scale", "1.01")
  }

  const handlePointerLeave = () => {
    const card = cardRef.current
    if (!card) return

    card.style.setProperty("--light-x", "50%")
    card.style.setProperty("--light-y", "50%")
    card.style.setProperty("--rotate-x", "0deg")
    card.style.setProperty("--rotate-y", "0deg")
    card.style.setProperty("--card-scale", "1")
  }

  return (
    <button
      type="button"
      id={project.id}
      aria-disabled={underConstruction}
      aria-label={
        underConstruction
          ? `${project.title}, projeto em construção`
          : project.title
      }
      className={`scroll-reveal block w-full text-left ${project.wide ? "col-span-2 max-md:col-span-1" : ""
        } ${underConstruction ? "cursor-not-allowed" : ""}`}
      onClick={(event) => {
        if (underConstruction) {
          event.preventDefault()
          event.stopPropagation()
          return
        }

        onOpen?.()
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        ref={cardRef}
        className="holographic-shine relative block overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.12)]"
      >
        <img
          className={`block w-full object-cover ${project.wide ? "aspect-[3840/1319]" : "aspect-[1200/412]"
            }`}
          src={`${assetPathPrefix}/${project.image}`}
          alt=""
        />

        <div className="flex flex-col gap-3 bg-gradient-to-b from-[#242424] to-[#262626] p-3">
          <p className="font-['IBM_Plex_Mono:Medium'] text-xs text-[#ababab]">
            {project.tags}
          </p>

          <h3 className="font-['Satoshi_Variable:Regular'] text-xl text-[#faf9f6]">
            {project.title}
          </h3>

          <p className="font-['Satoshi_Variable:Regular'] text-base text-[#c4c4c4]">
            {project.description}
          </p>
        </div>

        {underConstruction && (
          <div
            role="status"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#1c1c1c]/85"
          >
            <img
              src={`${assetPathPrefix}/cone.png`}
              alt=""
              aria-hidden="true"
              className="size-10 shrink-0 object-contain max-sm:size-8"
            />

            <span className="text-center font-['IBM_Plex_Mono:SemiBold'] text-sm text-[#faf9f6] max-sm:text-xs">
              EM CONSTRUÇÃO
            </span>
          </div>
        )}
      </div>
    </button>
  )
}