import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Dropdown from "./dropdown"

type HeaderProps = {
  onGoHome: () => void
  onOpenMovecta: () => void
  onOpenBasic: () => void
  onShowAbout: () => void
  onShowProjects: (projectId?: string) => void
}

type MenuName = "projects" | "contacts" | "language"
type OpenMenu = MenuName | null

const contacts = [
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/viniciusferreiraflorencio/",
  },
  {
    label: "EMAIL",
    href: "mailto:viniciusferreiraflorencio@live.com",
  },
  {
    label: "WHATSAPP",
    href: "https://wa.me/5513992024705",
  },
  {
    label: "CV",
    href: "https://1drv.ms/b/c/36d9a1f2622bc4f7/IQB-hqoOwoHYSr-GSILMZvxRAe68qrWIetjkFI3rP3nDdCU?e=jHMXmm",
  },
]

export default function Header({
  onGoHome,
  onOpenMovecta,
  onOpenBasic,
  onShowAbout,
}: HeaderProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<OpenMenu>(null)

  const projectsDropdownRef = useRef<HTMLDivElement>(null)
  const contactsDropdownRef = useRef<HTMLDivElement>(null)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setMobileSubmenu(null)
  }

  const navigateMobile = (action: () => void) => {
    closeMobileMenu()
    action()
  }

  const handleGoHome = () => {
    setOpenMenu(null)
    closeMobileMenu()
    onGoHome()

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, 0)
  }

  const toggleDesktopMenu = (menu: MenuName) => {
    setOpenMenu((current) => (current === menu ? null : menu))
  }

  const toggleMobileSubmenu = (menu: MenuName) => {
    setMobileSubmenu((current) => (current === menu ? null : menu))
  }

  // Fecha o dropdown quando o usuário clica fora dele ou pressiona Escape.
  useEffect(() => {
    if (!openMenu) return

    const activeDropdownRef =
      openMenu === "projects"
        ? projectsDropdownRef
        : openMenu === "contacts"
          ? contactsDropdownRef
          : languageDropdownRef

    const handlePointerDown = (event: Event) => {
      if (
        !(event.target instanceof Node) ||
        !activeDropdownRef.current?.contains(event.target)
      ) {
        setOpenMenu(null)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [openMenu])

  useEffect(() => {
    if (!mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false)
        setMobileSubmenu(null)
      }
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)")

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false)
        setMobileSubmenu(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    mediaQuery.addEventListener("change", handleBreakpointChange)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
      mediaQuery.removeEventListener("change", handleBreakpointChange)
    }
  }, [mobileOpen])

  return (
    <>
      {/* Cabeçalho e navegação desktop */}
      <header className="page-grid fixed inset-x-0 top-0 z-[99] items-center bg-gradient-to-b from-[#1c1c1c] via-[#1c1c1c]/60 to-[#1c1c1c]/0 pt-10 pb-16 max-md:pt-6">
        <button
          type="button"
          onClick={handleGoHome}
          className="fade-in col-start-2 col-end-5 text-left font-['Instrument_Serif'] text-xl whitespace-nowrap text-[#faf9f6] transition-colors hover:text-[#faf9f6]"
          style={{ animationDelay: "100ms" }}
        >
          Vinicius Florencio
        </button>

        <nav
          aria-label="Navegação principal"
          className="fade-in col-start-5 col-end-12 hidden items-center justify-self-end gap-10 font-['IBM_Plex_Mono:SemiBold'] text-sm text-[#ababab] md:flex"
          style={{ animationDelay: "240ms" }}
        >
          <div ref={projectsDropdownRef}>
            <Dropdown
              label="PROJETOS"
              isOpen={openMenu === "projects"}
              onToggle={() => toggleDesktopMenu("projects")}
            >
              <button
                type="button"
                className="dropdown-link text-left"
                onClick={() => {
                  setOpenMenu(null)
                  onOpenMovecta()
                }}
              >
                PORTAL DE AUTOATENDIMENTO MOVECTA
              </button>

              <button
                type="button"
                className="dropdown-link text-left"
                onClick={() => {
                  setOpenMenu(null)
                  onOpenBasic()
                }}
              >
                BASIC UI KIT V2.0
              </button>
            </Dropdown>
          </div>

          <button
            type="button"
            className="nav-button"
            onClick={() => {
              setOpenMenu(null)
              onShowAbout()
            }}
          >
            SOBRE MIM
          </button>

          <div ref={contactsDropdownRef}>
            <Dropdown
              label="CONTATOS"
              isOpen={openMenu === "contacts"}
              onToggle={() => toggleDesktopMenu("contacts")}
            >
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  className="dropdown-link"
                  href={contact.href}
                  target={
                    contact.href.startsWith("https://")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    contact.href.startsWith("https://")
                      ? "noreferrer"
                      : undefined
                  }
                >
                  {contact.label} ↗
                </a>
              ))}
            </Dropdown>
          </div>

          {/* Idioma temporariamente oculto */}
          <div ref={languageDropdownRef} className="hidden">
            <Dropdown
              label="IDIOMA"
              isOpen={openMenu === "language"}
              onToggle={() => toggleDesktopMenu("language")}
            >
              <button
                type="button"
                className="dropdown-link text-left"
                onClick={() => setOpenMenu(null)}
              >
                PORTUGUÊS
              </button>

              <button
                type="button"
                className="dropdown-link text-left"
                onClick={() => setOpenMenu(null)}
              >
                ENGLISH
              </button>
            </Dropdown>
          </div>
        </nav>
      </header>

      {/* Menu mobile renderizado diretamente no body */}
      {createPortal(
        <>
          {/* Hambúrguer: três linhas estáticas */}
          <button
            type="button"
            className={`fixed top-6 right-8 flex size-6 flex-col items-end justify-center gap-[5px] md:hidden ${mobileOpen ? "z-[2147483644]" : "z-[2147483647]"
              }`}
            aria-label={mobileOpen ? "Menu aberto" : "Abrir menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              if (!mobileOpen) {
                setMobileOpen(true)
                setMobileSubmenu(null)
              }
            }}
          >
            <span className="h-px w-6 bg-[#c4c4c4]" />
            <span className="h-px w-4 bg-[#c4c4c4]" />
            <span className="h-px w-5 bg-[#c4c4c4]" />
          </button>

          {/* Overlay: fecha o menu ao clicar fora do painel */}
          <div
            className={`fixed inset-0 z-[2147483645] transition-[visibility,opacity] duration-300 md:hidden ${mobileOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
              }`}
            aria-hidden={!mobileOpen}
          >
            <button
              type="button"
              aria-label="Fechar menu"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={closeMobileMenu}
              className="absolute inset-0 size-full cursor-default bg-black/50"
            />

            {/* Painel de 80vw, com entrada pela direita */}
            <section
              id="mobile-navigation"
              role="dialog"
              aria-label="Menu mobile"
              aria-modal={mobileOpen}
              aria-hidden={!mobileOpen}
              className={`absolute inset-y-0 right-0 z-10 flex h-dvh w-[80vw] flex-col overflow-y-auto bg-[#1c1c1c] pl-6 pr-8 pt-6 pb-12 text-[#ababab] shadow-[-8px_0_32px_rgba(0,0,0,0.2)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
              {/* Cabeçalho: MENU e X */}
              <div className="mb-4 flex shrink-0 items-center justify-between border-b border-[#333333] pb-5">
                <span className="font-['IBM_Plex_Mono:SemiBold'] text-sm text-[#ababab]">
                  MENU
                </span>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Fechar menu"
                  tabIndex={mobileOpen ? 0 : -1}
                  className="relative flex size-6 shrink-0 items-center justify-center text-[#c4c4c4] transition-colors hover:text-[#faf9f6]"
                >
                  <span className="absolute h-px w-6 rotate-45 bg-current" />
                  <span className="absolute h-px w-6 -rotate-45 bg-current" />
                </button>
              </div>

              <nav
                aria-label="Navegação mobile"
                className="flex flex-col font-['IBM_Plex_Mono:SemiBold'] text-sm"
              >
                {/* Projetos */}
                <div className="w-full border-b border-[#333333] py-5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 text-left transition-colors hover:text-[#faf9f6]"
                    aria-expanded={mobileSubmenu === "projects"}
                    tabIndex={mobileOpen ? 0 : -1}
                    onClick={() => toggleMobileSubmenu("projects")}
                  >
                    <span>PROJETOS</span>

                    <span
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${mobileSubmenu === "projects" ? "rotate-180" : ""
                        }`}
                    >
                      ↓
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${mobileSubmenu === "projects"
                      ? "mt-5 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-1 flex flex-col border-l border-[#454545] pl-4 text-xs leading-relaxed">
                        <button
                          type="button"
                          tabIndex={
                            mobileOpen && mobileSubmenu === "projects"
                              ? 0
                              : -1
                          }
                          className="border-b border-[#333333]/70 py-4 text-left transition-colors hover:text-[#faf9f6]"
                          onClick={() => navigateMobile(onOpenMovecta)}
                        >
                          PORTAL DE AUTOATENDIMENTO MOVECTA
                        </button>

                        <button
                          type="button"
                          tabIndex={
                            mobileOpen && mobileSubmenu === "projects"
                              ? 0
                              : -1
                          }
                          className="py-4 text-left transition-colors hover:text-[#faf9f6]"
                          onClick={() => navigateMobile(onOpenBasic)}
                        >
                          BASIC UI KIT V2.0
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sobre mim */}
                <button
                  type="button"
                  tabIndex={mobileOpen ? 0 : -1}
                  className="w-full border-b border-[#333333] py-5 text-left transition-colors hover:text-[#faf9f6]"
                  onClick={() => navigateMobile(onShowAbout)}
                >
                  SOBRE MIM
                </button>

                {/* Contatos */}
                <div className="w-full border-b border-[#333333] py-5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 text-left transition-colors hover:text-[#faf9f6]"
                    aria-expanded={mobileSubmenu === "contacts"}
                    tabIndex={mobileOpen ? 0 : -1}
                    onClick={() => toggleMobileSubmenu("contacts")}
                  >
                    <span>CONTATOS</span>

                    <span
                      aria-hidden="true"
                      className={`transition-transform duration-300 ${mobileSubmenu === "contacts" ? "rotate-180" : ""
                        }`}
                    >
                      ↓
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${mobileSubmenu === "contacts"
                      ? "mt-5 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-1 flex flex-col border-l border-[#454545] pl-4 text-xs">
                        {contacts.map((contact, index) => (
                          <a
                            key={contact.label}
                            href={contact.href}
                            target={
                              contact.href.startsWith("https://")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              contact.href.startsWith("https://")
                                ? "noreferrer"
                                : undefined
                            }
                            tabIndex={
                              mobileOpen && mobileSubmenu === "contacts"
                                ? 0
                                : -1
                            }
                            onClick={closeMobileMenu}
                            className={`py-4 transition-colors hover:text-[#faf9f6] ${index < contacts.length - 1
                              ? "border-b border-[#333333]/70"
                              : ""
                              }`}
                          >
                            {contact.label} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Idioma temporariamente oculto */}
                <div className="hidden">
                  <div className="w-full border-b border-[#333333] py-5">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 text-left transition-colors hover:text-[#faf9f6]"
                      aria-expanded={mobileSubmenu === "language"}
                      tabIndex={mobileOpen ? 0 : -1}
                      onClick={() => toggleMobileSubmenu("language")}
                    >
                      <span>IDIOMA</span>

                      <span
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${mobileSubmenu === "language" ? "rotate-180" : ""
                          }`}
                      >
                        ↓
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ${mobileSubmenu === "language"
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="ml-1 flex flex-col border-l border-[#454545] pl-4 text-xs">
                          <button
                            type="button"
                            tabIndex={
                              mobileOpen && mobileSubmenu === "language"
                                ? 0
                                : -1
                            }
                            className="border-b border-[#333333]/70 py-4 text-left transition-colors hover:text-[#faf9f6]"
                            onClick={closeMobileMenu}
                          >
                            PORTUGUÊS
                          </button>

                          <button
                            type="button"
                            tabIndex={
                              mobileOpen && mobileSubmenu === "language"
                                ? 0
                                : -1
                            }
                            className="py-4 text-left transition-colors hover:text-[#faf9f6]"
                            onClick={closeMobileMenu}
                          >
                            ENGLISH
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </section>
          </div>
        </>,
        document.body,
      )}
    </>
  )
}