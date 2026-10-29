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
  return (
    <footer
      id={id}
      className={`page-grid col-start-1 col-end-13 ${className ?? "row-start-2"
        } gap-y-20 bg-[#1c1c1c] py-20 max-md:gap-y-12 max-md:py-12`}
    >
      <div className="col-start-4 col-end-12 flex flex-col gap-1 max-md:col-start-2">
        <p className="text-[32px] max-md:text-2xl">
          Estou disponível para projetos.
        </p>

        <h2 className="font-['Instrument_Serif:Regular'] text-[64px] leading-none text-[#faf9f6] max-md:text-5xl">
          Vamos conversar?
        </h2>
      </div>

      <div className="col-start-4 col-end-12 flex flex-col gap-6 max-md:col-start-2">
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
      </div>

      <p className="col-start-4 col-end-12 font-['Instrument_Serif:Regular'] text-white max-md:col-start-2">
        Copyright © Vinicius Florencio, 2026
      </p>
    </footer>
  )
}