
import { useEffect, useRef, useState } from "react"

type FooterProps = {
  id?: string
  className?: string
}

const contacts = [
  [
    "LINKEDIN",
    "/in/viniciusferreiraflorencio/",
    "https://www.linkedin.com/in/viniciusferreiraflorencio/",
  ],
  [
    "EMAIL",
    "viniciusferreiraflorencio@live.com",
    "mailto:viniciusferreiraflorencio@live.com",
  ],
  [
    "WHATSAPP",
    "+55 13 99202 4705",
    "https://wa.me/55139924705",
  ],
]

export default function Footer({
  id = "contatos",
  className,
}: FooterProps) {
  const copyrightRef = useRef<HTMLDivElement>(null)
  const [copyrightVisible, setCopyrightVisible] = useState(false)

  // Controla o fade-in e fade-out do copyright independentemente do Home.
  useEffect(() => {
    const element = copyrightRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCopyrightVisible(entry.isIntersecting)
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <style>{`
        .footer-copyright {
          transition:
            opacity 450ms ease,
            transform 450ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-copyright {
            transition: none;
          }
        }
      `}</style>

      <footer
        id={id}
        className={`page-grid col-start-1 col-end-13 ${className ?? "row-start-2"} h-auto min-h-fit gap-y-20 overflow-visible bg-[#1c1c1c] py-20 max-md:gap-y-12 max-md:pt-12 max-md:pb-40`}
      >
        <div className="col-start-4 col-end-12 flex flex-col gap-1 max-md:col-start-2 max-md:col-end-12">
          <p className="text-[32px] max-md:text-2xl">
            Estou disponível para projetos.
          </p>

          <h2 className="font-['Instrument_Serif'] text-[64px] leading-none text-[#faf9f6] max-md:text-5xl">
            Vamos conversar?
          </h2>
        </div>

        <div className="col-start-4 col-end-12 flex flex-col gap-6 max-md:col-start-2 max-md:col-end-12">
          {contacts.map(([label, text, href]) => (
            <div key={label} className="flex flex-col gap-1">
              <p className="font-['IBM_Plex_Mono:Regular'] text-xs text-[#ababab]">
                {label}
              </p>

              <a
                className="w-fit text-2xl underline decoration-dotted decoration-[#ababab]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf9f6] max-md:text-base"
                href={href}
                target={href.startsWith("https://") ? "_blank" : undefined}
                rel={href.startsWith("https://") ? "noreferrer" : undefined}
              >
                {text}
              </a>
            </div>
          ))}

          {/* Copyright com observação e animação independentes. */}
          <div
            ref={copyrightRef}
            className="footer-copyright relative z-10 mt-14 block w-full font-['Instrument_Serif'] text-base text-[#faf9f6] max-md:mt-10"
            style={{
              opacity: copyrightVisible ? 1 : 0,
              transform: copyrightVisible
                ? "translateY(0)"
                : "translateY(8px)",
            }}
          >
            Copyright © Vinicius Florencio, 2026
          </div>
        </div>
      </footer>
    </>
  )
}
