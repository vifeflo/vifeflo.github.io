import type { ReactNode } from "react"

type ArrowLinkProps = {
  children: ReactNode
  className?: string
  href: string
}

export default function ArrowLink({
  children,
  className = "",
  href,
}: ArrowLinkProps) {
  return (
    <a
      className={`group flex items-center gap-1 font-['IBM_Plex_Mono:SemiBold'] text-sm whitespace-nowrap text-[#ababab] transition-colors hover:text-[#faf9f6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf9f6] ${className}`}
      href={href}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      {children}

      <span
        aria-hidden="true"
        className="font-['IBM_Plex_Mono:Light'] transition-transform group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </a>
  )
}