import type { ReactNode } from "react"

type TitleProps = {
  eyebrow?: string
  children: ReactNode
}

export default function Title({
  eyebrow,
  children,
}: TitleProps) {
  return (
    <div className="flex flex-col gap-1">
      {eyebrow && (
        <p className="font-['IBM_Plex_Mono:Medium'] text-xs text-[#ababab]">
          {eyebrow}
        </p>
      )}

      <h2 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
        {children}
      </h2>
    </div>
  )
}