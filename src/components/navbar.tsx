
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type { KeyboardEvent, PointerEvent } from "react"
import type { NavbarSection } from "./types"

const assetPathPrefix = "/assets"

type NavbarProps = {
  sections: NavbarSection[]
  activeSection: string
  onNavigate: (id: string) => void
  footerVisible?: boolean
  mobileButtonVisible?: boolean
}

type ScrollMetrics = {
  maxScroll: number
  startOffset: number
  progress: number
  visible: boolean
  mobileTrackVisible: boolean
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

export default function Navbar({
  sections,
  activeSection,
  onNavigate,
  footerVisible = false,
  mobileButtonVisible = true,
}: NavbarProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const desktopTrackRef = useRef<HTMLDivElement>(null)
  const mobileTrackRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const homeCardsVisibleRef = useRef(false)
  const draggingTrackRef = useRef<HTMLDivElement | null>(null)

  // Na Home, a navbar e o indicador acompanham a visibilidade dos cards.
  const isHome =
    sections.some((section) => section.id === "projetos") &&
    sections.some((section) => section.id === "sobre")

  const firstSectionId = isHome ? "projetos" : sections[0]?.id

  const closeMenu = () => {
    setMobileNavOpen(false)
  }

  const handleNavigate = (id: string) => {
    onNavigate(id)
    closeMenu()
  }

  const getScrollMetrics = (): ScrollMetrics => {
    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    )
    const viewportHeight = window.innerHeight
    const maxScroll = Math.max(0, documentHeight - viewportHeight)

    let startOffset = 0

    if (isHome) {
      const projectsSection = document.getElementById(
        firstSectionId ?? "projetos",
      )

      if (projectsSection) {
        const projectsTop =
          projectsSection.getBoundingClientRect().top + window.scrollY

        const isMobile = window.matchMedia("(max-width: 767px)").matches

        // O progresso começa quando Projetos alcança o top-24 da barra mobile.
        const mobileAlignmentOffset = isMobile ? 96 : 0

        startOffset = Math.max(
          0,
          projectsTop - mobileAlignmentOffset,
        )
      }
    }

    startOffset = Math.min(startOffset, maxScroll)

    const scrollRange = Math.max(0, maxScroll - startOffset)

    const progress =
      scrollRange > 0
        ? clamp((window.scrollY - startOffset) / scrollRange, 0, 1)
        : 0

    // A seção Sobre Mim também mantém a navegação visível quando está na viewport.
    const aboutView = isHome
      ? document.getElementById("sobre")
      : null

    const aboutViewRect = aboutView?.getBoundingClientRect()

    const aboutViewIsActive = Boolean(
      aboutView &&
      !aboutView.classList.contains("hidden") &&
      window.getComputedStyle(aboutView).display !== "none" &&
      aboutViewRect &&
      aboutViewRect.bottom > 0 &&
      aboutViewRect.top < window.innerHeight,
    )

    // Uma única condição controla a navegação desktop e o indicador mobile.
    const shouldShowNavigation =
      !isHome ||
      homeCardsVisibleRef.current ||
      aboutViewIsActive ||
      footerVisible

    return {
      maxScroll,
      startOffset,
      progress,
      visible: shouldShowNavigation,
      mobileTrackVisible: shouldShowNavigation,
    }
  }

  const getCardDelayMs = (card: HTMLElement) => {
    const delay = getComputedStyle(card).transitionDelay
      .split(",")[0]
      .trim()

    const amount = Number.parseFloat(delay) || 0

    return delay.endsWith("ms") ? amount : amount * 1000
  }

  const getRevealDelay = (visible: boolean) => {
    if (!isHome) return 0

    const projectCards = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#projetos .scroll-reveal[id]",
      ),
    )

    const allDelays = projectCards.map(getCardDelayMs)

    const visibleDelays = projectCards
      .filter((card) => card.classList.contains("is-visible"))
      .map(getCardDelayMs)

    return visible
      ? Math.min(...(visibleDelays.length ? visibleDelays : [0]))
      : Math.max(...allDelays, 0)
  }

  const updateTrack = (
    track: HTMLDivElement | null,
    isVisible?: boolean,
  ) => {
    if (!track) return

    const thumb = track.querySelector<HTMLDivElement>(
      "[data-scroll-thumb]",
    )

    if (!thumb) return

    const metrics = getScrollMetrics()
    const shouldShow = isVisible ?? metrics.visible
    const revealDelay = getRevealDelay(shouldShow)

    track.style.visibility = "visible"
    track.style.opacity = shouldShow ? "1" : "0"
    track.style.pointerEvents = shouldShow ? "auto" : "none"
    track.style.transitionDelay = `${revealDelay}ms`
    track.tabIndex = shouldShow ? 0 : -1

    track.setAttribute(
      "aria-hidden",
      shouldShow ? "false" : "true",
    )
    track.setAttribute(
      "aria-valuenow",
      String(Math.round(metrics.progress * 100)),
    )
    track.setAttribute(
      "aria-valuetext",
      `${Math.round(metrics.progress * 100)}% da página`,
    )

    const trackHeight = track.clientHeight

    if (trackHeight <= 0) return

    const documentHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    )
    const viewportHeight = window.innerHeight

    const contentHeightAfterStart = Math.max(
      viewportHeight,
      documentHeight - metrics.startOffset,
    )

    const thumbHeight = Math.min(
      trackHeight,
      Math.max(
        28,
        (viewportHeight / contentHeightAfterStart) * trackHeight,
      ),
    )

    const maxThumbTop = Math.max(0, trackHeight - thumbHeight)

    thumb.style.height = `${thumbHeight}px`
    thumb.style.top = `${metrics.progress * maxThumbTop}px`
  }

  const updateAllTracks = () => {
    const metrics = getScrollMetrics()
    const navItems = navItemsRef.current

    // Cada link aparece e desaparece gradualmente.
    if (navItems) {
      const buttons = Array.from(
        navItems.querySelectorAll<HTMLButtonElement>("button"),
      )

      navItems.style.pointerEvents = metrics.visible ? "auto" : "none"

      navItems.setAttribute(
        "aria-hidden",
        metrics.visible ? "false" : "true",
      )

      buttons.forEach((button, index) => {
        const delay = metrics.visible
          ? index * 75
          : (buttons.length - index - 1) * 45

        button.style.transitionDelay = `${delay}ms`
        button.style.opacity = metrics.visible ? "1" : "0"
        button.style.transform = metrics.visible
          ? "translateY(0)"
          : "translateY(8px)"

        button.tabIndex = metrics.visible ? 0 : -1
      })
    }

    // Desktop e mobile recebem a mesma condição de visibilidade.
    updateTrack(desktopTrackRef.current, metrics.visible)
    updateTrack(mobileTrackRef.current, metrics.mobileTrackVisible)
  }

  const scrollToProgress = (progress: number) => {
    const metrics = getScrollMetrics()

    const target =
      metrics.startOffset +
      clamp(progress, 0, 1) *
      Math.max(0, metrics.maxScroll - metrics.startOffset)

    window.scrollTo({
      top: target,
      behavior: "auto",
    })

    updateAllTracks()
  }

  const moveScrollFromPointer = (
    track: HTMLDivElement,
    clientY: number,
  ) => {
    const thumb = track.querySelector<HTMLDivElement>(
      "[data-scroll-thumb]",
    )

    if (!thumb) return

    const rect = track.getBoundingClientRect()
    const trackHeight = rect.height

    if (trackHeight <= 0) return

    const thumbHeight = thumb.getBoundingClientRect().height
    const maxThumbTop = Math.max(0, trackHeight - thumbHeight)

    const targetTop = clamp(
      clientY - rect.top - thumbHeight / 2,
      0,
      maxThumbTop,
    )

    const progress =
      maxThumbTop > 0 ? targetTop / maxThumbTop : 0

    scrollToProgress(progress)
  }

  // Clique e arraste para navegar pela página.
  const handleTrackPointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    const track = event.currentTarget

    if (track.clientHeight <= 0) return

    event.preventDefault()

    draggingTrackRef.current = track
    track.setPointerCapture(event.pointerId)

    moveScrollFromPointer(track, event.clientY)
  }

  const handleTrackPointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (draggingTrackRef.current !== event.currentTarget) return

    event.preventDefault()

    moveScrollFromPointer(
      event.currentTarget,
      event.clientY,
    )
  }

  const handleTrackPointerUp = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (draggingTrackRef.current !== event.currentTarget) return

    draggingTrackRef.current = null

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  // Navegação acessível pelo teclado.
  const handleTrackKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    const metrics = getScrollMetrics()
    let nextProgress: number | null = null

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextProgress = metrics.progress + 0.03
        break
      case "ArrowUp":
      case "ArrowLeft":
        nextProgress = metrics.progress - 0.03
        break
      case "PageDown":
        nextProgress = metrics.progress + 0.1
        break
      case "PageUp":
        nextProgress = metrics.progress - 0.1
        break
      case "Home":
        nextProgress = 0
        break
      case "End":
        nextProgress = 1
        break
      default:
        return
    }

    event.preventDefault()
    scrollToProgress(nextProgress)
  }

  // Observa os mesmos estados .is-visible dos cards da Home.
  useEffect(() => {
    let animationFrame = 0

    const projectCards = isHome
      ? Array.from(
        document.querySelectorAll<HTMLElement>(
          "#projetos .scroll-reveal[id]",
        ),
      )
      : []

    const syncCardsVisibility = () => {
      homeCardsVisibleRef.current =
        !isHome ||
        projectCards.some((card) =>
          card.classList.contains("is-visible"),
        )

      updateAllTracks()
    }

    const cardMutationObserver = new MutationObserver(
      syncCardsVisibility,
    )

    projectCards.forEach((card) => {
      cardMutationObserver.observe(card, {
        attributes: true,
        attributeFilter: ["class"],
      })
    })

    const update = () => {
      animationFrame = 0
      syncCardsVisibility()
    }

    const scheduleUpdate = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(update)
    }

    syncCardsVisibility()

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    })
    window.addEventListener("resize", scheduleUpdate)

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(document.documentElement)
    resizeObserver.observe(document.body)

    return () => {
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)

      resizeObserver.disconnect()
      cardMutationObserver.disconnect()

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [isHome, firstSectionId, footerVisible])

  // Fecha o painel mobile ao chegar ao footer.
  useEffect(() => {
    if (footerVisible) {
      setMobileNavOpen(false)
    }
  }, [footerVisible])

  // Bloqueia a rolagem de fundo e permite fechar com Escape.
  useEffect(() => {
    if (!mobileNavOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (
      event: globalThis.KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false)
      }
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)")

    const handleBreakpointChange = (
      event: MediaQueryListEvent,
    ) => {
      if (event.matches) {
        setMobileNavOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    mediaQuery.addEventListener("change", handleBreakpointChange)

    return () => {
      document.body.style.overflow = previousOverflow

      window.removeEventListener("keydown", handleKeyDown)
      mediaQuery.removeEventListener(
        "change",
        handleBreakpointChange,
      )
    }
  }, [mobileNavOpen])

  const scrollTrackClasses =
    "absolute right-0 z-20 w-3 cursor-pointer touch-none select-none outline-none focus-visible:ring-1 focus-visible:ring-[#ababab]/60"

  const scrollTrackHandlers = {
    onPointerDown: handleTrackPointerDown,
    onPointerMove: handleTrackPointerMove,
    onPointerUp: handleTrackPointerUp,
    onPointerCancel: handleTrackPointerUp,
    onKeyDown: handleTrackKeyDown,
  }

  const shouldShowMobileButton = mobileButtonVisible && !footerVisible

  return (
    <>
      {/* O indicador personalizado substitui a barra nativa da página. */}
      <style>{`
        html, body {
          scrollbar-width: none;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        .navbar-link {
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 450ms ease,
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .navbar-link {
            transition: none;
          }
        }
      `}</style>

      {/* Navbar desktop alinhada ao conteúdo, com espaço inferior de 80px. */}
      <aside
        aria-label="Navegação do projeto"
        className="sticky top-32 col-start-2 col-end-4 row-start-1 row-end-3 flex h-[calc(100dvh-8rem)] min-h-0 flex-col items-end self-start overflow-visible pb-20 pr-5 text-right font-['IBM_Plex_Mono:SemiBold'] text-sm max-md:hidden"
      >
        <div
          ref={navItemsRef}
          aria-hidden="false"
          className="flex flex-col items-end gap-3"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              aria-current={
                activeSection === section.id
                  ? "location"
                  : undefined
              }
              tabIndex={-1}
              style={{
                opacity: 0,
                transform: "translateY(8px)",
              }}
              className={`navbar-link shrink-0 text-right transition-colors hover:text-[#faf9f6] ${activeSection === section.id
                ? "text-[#faf9f6]"
                : "text-[#ababab]"
                }`}
              onClick={() => onNavigate(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Trilha clicável e arrastável; termina 80px antes do fim da tela. */}
        <div
          ref={desktopTrackRef}
          role="scrollbar"
          aria-label="Progresso da página"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          aria-valuetext="0% da página"
          tabIndex={0}
          className={`${scrollTrackClasses} top-0 bottom-20 opacity-0 transition-opacity duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
          {...scrollTrackHandlers}
        >
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#ababab]/20" />

          <div
            data-scroll-thumb
            className="pointer-events-none absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-[#ababab]"
          />
        </div>
      </aside>

      {/* Indicador mobile alinhado à seção Projetos, com comportamento sticky. */}
      <div
        ref={mobileTrackRef}
        role="scrollbar"
        aria-label="Progresso da página"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        aria-valuetext="0% da página"
        tabIndex={0}
        className="sticky top-24 z-40 col-start-1 col-end-2 row-start-1 row-end-3 h-[calc(100dvh-11rem)] w-4 justify-self-center self-start cursor-pointer touch-none select-none opacity-0 outline-none transition-opacity duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-1 focus-visible:ring-[#ababab]/60 md:hidden"
        {...scrollTrackHandlers}
      >
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#ababab]/20" />

        <div
          data-scroll-thumb
          className="pointer-events-none absolute left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full bg-[#ababab]"
        />
      </div>

      {/* Overlay mobile renderizado no body, acima dos elementos da página. */}
      {createPortal(
        <div
          id="project-mobile-navigation"
          role="dialog"
          aria-label="Menu de navegação do projeto"
          aria-modal={mobileNavOpen}
          aria-hidden={!mobileNavOpen}
          className={`fixed inset-0 z-[2147483647] transition-[visibility] duration-300 md:hidden ${mobileNavOpen
            ? "visible"
            : "invisible pointer-events-none"
            }`}
        >
          {/* Fundo escurecido: clicar fora fecha o painel. */}
          <button
            type="button"
            aria-label="Fechar menu"
            tabIndex={mobileNavOpen ? 0 : -1}
            onClick={closeMenu}
            className={`absolute inset-0 z-0 size-full cursor-default bg-black/50 transition-opacity duration-300 ${mobileNavOpen ? "opacity-100" : "opacity-0"
              }`}
          />

          {/* Painel mobile com entrada pela esquerda. */}
          <nav
            aria-label="Seções da página"
            className={`absolute inset-y-0 left-0 z-10 flex h-dvh w-[80vw] flex-col overflow-y-auto bg-[#1c1c1c] px-6 pt-6 pb-12 text-[#ababab] shadow-[8px_0_32px_rgba(0,0,0,0.2)] [scrollbar-width:thin] [scrollbar-color:#666666_#1c1c1c] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#1c1c1c] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#666666] transition-[transform,opacity] duration-300 ease-in-out ${mobileNavOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
              }`}
          >
            {/* Cabeçalho */}
            <div
              className={`mb-4 flex shrink-0 items-center justify-between border-b border-[#333333] pb-5 transition-opacity duration-300 ${mobileNavOpen ? "opacity-100" : "opacity-0"
                }`}
            >
              <span className="font-['IBM_Plex_Mono:SemiBold'] text-sm">
                SEÇÕES
              </span>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Fechar menu"
                tabIndex={mobileNavOpen ? 0 : -1}
                className="relative flex size-6 shrink-0 items-center justify-center text-[#ababab] transition-colors hover:text-[#faf9f6]"
              >
                <span className="absolute h-px w-6 rotate-45 bg-current" />
                <span className="absolute h-px w-6 -rotate-45 bg-current" />
              </button>
            </div>

            {/* Lista numerada com divisores */}
            <div className="flex flex-col">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleNavigate(section.id)}
                  aria-current={
                    activeSection === section.id
                      ? "location"
                      : undefined
                  }
                  tabIndex={mobileNavOpen ? 0 : -1}
                  style={{
                    transitionDelay: mobileNavOpen
                      ? `${index * 35}ms`
                      : "0ms",
                  }}
                  className={`flex w-full shrink-0 items-start gap-4 border-b border-[#333333] py-5 text-left font-['IBM_Plex_Mono:SemiBold'] text-sm transition-[opacity,color] duration-300 ${mobileNavOpen ? "opacity-100" : "opacity-0"
                    } ${activeSection === section.id
                      ? "text-[#faf9f6]"
                      : "text-[#ababab] hover:text-[#faf9f6]"
                    }`}
                >
                  <span className="text-xs text-[#666666]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>,
        document.body,
      )}

      {/* Botão flutuante mobile */}
      <button
        type="button"
        onClick={() => setMobileNavOpen((value) => !value)}
        aria-expanded={mobileNavOpen}
        aria-controls="project-mobile-navigation"
        aria-label="Abrir navegação"
        aria-hidden={!shouldShowMobileButton}
        tabIndex={shouldShowMobileButton && !mobileNavOpen ? 0 : -1}
        style={{
          transform: !shouldShowMobileButton
            ? "translate(-50%, calc(100% + 24px))"
            : "translate(-50%, 0)",
          pointerEvents: shouldShowMobileButton ? "auto" : "none",
          transition:
            "transform 500ms ease-in-out, color 200ms ease-in-out",
        }}
        className="fixed bottom-6 left-1/2 z-50 flex flex-row items-center justify-center gap-2 whitespace-nowrap bg-[#242424] px-4 py-3 font-['IBM_Plex_Mono:SemiBold'] text-sm text-[#ababab] shadow-[0_4px_4px_rgba(0,0,0,0.12)] hover:text-[#faf9f6] max-md:flex md:hidden"
      >
        <span>SEÇÕES</span>

        <span
          aria-hidden="true"
          className="size-5 shrink-0 bg-current"
          style={{
            maskImage: `url(${assetPathPrefix}/283c3.svg)`,
            WebkitMaskImage: `url(${assetPathPrefix}/283c3.svg)`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />
      </button>
    </>
  )
}
