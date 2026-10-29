import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"

import Home from "./pages/home"
import Movecta from "./pages/movecta"
import Basic from "./pages/basic"
import Header from "./components/header"

type PageView = "portfolio" | "movecta" | "basic"
type ContentView = "projects" | "about"

export default function App() {
    const [pageView, setPageView] = useState<PageView>("portfolio")
    const [contentView, setContentView] = useState<ContentView>("projects")

    const lenisRef = useRef<Lenis | null>(null)

    // Inicializa o Lenis uma única vez para controlar a rolagem do site.
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.075,
            smoothWheel: true,
            wheelMultiplier: 1,
            respectReducedMotion: false,
        })

        lenisRef.current = lenis

        let animationFrameId = 0

        const raf = (time: number) => {
            lenis.raf(time)
            animationFrameId = window.requestAnimationFrame(raf)
        }

        animationFrameId = window.requestAnimationFrame(raf)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    const snapToSection = (
        target: HTMLElement | number,
        onComplete: () => void,
    ) => {
        const lenis = lenisRef.current

        if (!lenis) {
            const top =
                typeof target === "number"
                    ? target
                    : target.getBoundingClientRect().top + window.scrollY

            window.scrollTo({ top, behavior: "smooth" })
            onComplete()
            return
        }

        lenis.scrollTo(target, {
            duration: 1.2,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            lock: true,
            onComplete,
        })
    }

    // Centraliza as rolagens programáticas no Lenis.
    const scrollToTarget = (
        target: HTMLElement | number,
        offset = 0,
        immediate = false,
    ) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target, {
                offset,
                immediate,
            })
            return
        }

        const top =
            typeof target === "number"
                ? target
                : target.getBoundingClientRect().top +
                window.scrollY +
                offset

        window.scrollTo({
            top,
            behavior: "auto",
        })
    }

    const openMovecta = () => {
        setPageView("movecta")
        scrollToTarget(0, 0, true)
    }

    const openBasic = () => {
        setPageView("basic")
        scrollToTarget(0, 0, true)
    }

    // Todas as decisões de navegação entre páginas ficam centralizadas aqui.
    const showProjects = (projectId?: string) => {
        if (projectId === "movecta") {
            openMovecta()
            return
        }

        if (projectId === "basic-ui-kit") {
            openBasic()
            return
        }

        setPageView("portfolio")
        setContentView("projects")

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                const target = projectId
                    ? document.getElementById(projectId)
                    : document.getElementById("projetos")

                if (target) {
                    scrollToTarget(target)
                }
            })
        })
    }

    const showAbout = () => {
        setPageView("portfolio")
        setContentView("about")

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                const target = document.getElementById("sobre")

                if (target) {
                    scrollToTarget(target, -120)
                }
            })
        })
    }

    const goHome = () => {
        setPageView("portfolio")
        setContentView("projects")
        scrollToTarget(0)
    }

    if (pageView === "movecta") {
        return (
            <Movecta
                onShowProjects={showProjects}
                onShowAbout={showAbout}
                onGoHome={goHome}
            />
        )
    }

    if (pageView === "basic") {
        return (
            <Basic
                onShowProjects={showProjects}
                onShowAbout={showAbout}
            />
        )
    }

    return (
        <>
            <Header
                onGoHome={goHome}
                onOpenMovecta={openMovecta}
                onOpenBasic={openBasic}
                onShowProjects={showProjects}
                onShowAbout={showAbout}
            />

            <Home
                contentView={contentView}
                onOpenMovecta={openMovecta}
                onOpenBasic={openBasic}
                onShowProjects={showProjects}
                onShowAbout={showAbout}
                onSnapToSection={snapToSection}
            />
        </>
    )
}