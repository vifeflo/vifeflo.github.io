import type { ReactNode } from "react"

type DropdownProps = {
  children: ReactNode
  label: string
  isOpen: boolean
  onToggle: () => void
}

export default function Dropdown({
  children,
  label,
  isOpen,
  onToggle,
}: DropdownProps) {
  return (
    <div className="relative">
      <button
        className="nav-button"
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {label}

        <span
          aria-hidden="true"
          className={`font-['IBM_Plex_Mono:Light'] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-menu absolute top-[calc(100%+12px)] right-0 z-10 flex w-max flex-col gap-3 bg-[#242424] p-4 shadow-xl">
          {children}
        </div>
      )}
    </div>
  )
}