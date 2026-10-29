import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type RefObject,
} from "react"

import ArrowLink from "../components/arrowLink"
import Card, { type Project } from "../components/card"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
import DashedDivider from "@/components/dashedDivider"
import Divider from "@/components/divider"

const assetPathPrefix = "/assets"

type ContentView = "projects" | "about"

const homeSections = [
  { id: "projetos", label: "PROJETOS" },
  { id: "sobre", label: "SOBRE MIM" },
]

const projects: Project[] = [
  {
    id: "movecta",
    image: "29fa9.png",
    tags: "2025 • RESEARCH • B2B • LOGISTICA",
    title: "Portal de Autoatendimento Movecta",
    description:
      "Redesign de um portal logístico de autoatendimento com foco em visibilidade e comunicação proativa",
    wide: true,
  },
  {
    id: "basic-ui-kit",
    image: "1fe14.png",
    tags: "BIBLIOTECA • COMPONENTES • FIGMA",
    title: "Basic UI Kit v2.0",
    description:
      "Um toolkit de design open source escalável criado para a comunidade",
  },
  {
    id: "studyin",
    image: "3f34f.png",
    tags: "MOBILE • MVP • FACULDADE",
    title: "StudyIn",
    description:
      "Um estudo sobre sistemas e componentes mobile desenvolvido durante a faculdade",
  },
]

const aboutSkills = [
  {
    title: "Prototipação",
    text: "Tenho vasta experiência em prototipação de soluções complexas de ponta a ponta, de wireframes iniciais a designs de alta fidelidade em larga escala no Figma e com uso de inteligência artificial.",
    tools: ["FIGMA 100%", "HTML5 100%", "CSS3 100%", "IA 80%"],
  },
  {
    title: "Pesquisa",
    text: "Realizo entrevistas com stakeholders e usuários finais para analisar problemas e identificar soluções, utilizando plataformas como Maze para pesquisa e validação.",
    tools: ["GA4 70%", "GTM 70%", "HOTJAR 70%", "MAZE 80%"],
  },
  {
    title: "Design system",
    text: "Crio, documento e mantenho bibliotecas de componentes escaláveis, promovendo consistência, acessibilidade e eficiência entre design e desenvolvimento.",
    tools: ["TOKENS 90%", "FIGMA 100%", "ZEROHEIGHT 80%"],
  },
  {
    title: "Mentoria",
    text: "Fui mentor de designers juniores no Processo de Formação ModalGR 2024, conduzindo rituais ágeis e gerenciando o backlog para promover o crescimento do time.",
  },
]

const languages = [
  {
    title: "Português — Nativo",
    tools: ["ESCUTA 100%", "LEITURA 100%", "FALA 100%", "ESCRITA 100%"],
  },
  {
    title: "Inglês — C2 Proficient (EF SET)",
    href: "https://cert.efset.org/BdFPHb",
    tools: ["ESCUTA 78%", "LEITURA 77%", "FALA 50%", "ESCRITA 75%"],
  },
]

const experiences = [
  {
    date: "MAR 2024 - MAR 2026",
    role: "Product Designer Jr.",
    company: "MOSTEN",
    companyUrl: "https://mosten.com/",
    place: "Santos - híbrido",
    items: [
      "Criação de wireframes e protótipos interativos de baixa e alta fidelidade utilizando Figma.",
      "Condução de entrevistas, pesquisas e testes de usabilidade no Maze para validação de soluções digitais.",
      "Apoio à definição de requisitos funcionais por meio de Design Thinking e User-Centered Design.",
      "Aplicação de IA generativa na aceleração de atividades, incluindo discovery, geração de insights, mapas de afinidade, benchmarking, análise de heatmaps, arquitetura de informação e documentação técnica.",
      "Participação na criação e evolução do Design System corporativo, reduzindo em 20% o tempo médio de prototipação de novos produtos com mais de 50 componentes funcionais e documentados.",
      "Criação de documentação técnica, hospedagem e manutenção do Design System no Zeroheight e realização de handoff para equipes de desenvolvimento.",
      "Gestão do backlog com Azure DevOps (Boards, Kanban e Wiki) e condução de cerimônias Scrum.",
      "Desenvolvimento de MVPs que contribuíram para a conquista de 3 grandes clientes logísticos.",
      "Mentoria e acompanhamento técnico de designers estagiários do Programa de Formação Mosten 2024.",
    ],
  },
  {
    date: "JAN 2024 - MAR 2024",
    role: "Estagiário Front-end - WordPress",
    company: "MOSTEN",
    companyUrl: "https://mosten.com/",
    place: "Santos - híbrido",
    items: [
      "Desenvolvimento e manutenção de páginas em WordPress utilizando Elementor.",
      "Implementação de ajustes em HTML, CSS, PHP e JavaScript para interfaces responsivas.",
      "Suporte na implementação de layouts e componentes visuais.",
    ],
  },
  {
    date: "DEZ 2025 - ATUAL",
    role: "UX/UI Designer Voluntário",
    company: "ONG MOVIMENTO FUTURO",
    companyUrl: "https://movimentofuturo.org/",
    place: "São Paulo - remoto",
    items: [
      "Redesenho da página inicial com foco em usabilidade e acessibilidade digital.",
      "Criação e manutenção do Design System institucional.",
      "Documentação técnica e handoff para a equipe de desenvolvimento.",
    ],
  },
]

function AboutContent({
  portraitRef,
  onPortraitPointerMove,
  onPortraitPointerLeave,
}: {
  portraitRef: RefObject<HTMLDivElement>
  onPortraitPointerMove: (event: PointerEvent<HTMLElement>) => void
  onPortraitPointerLeave: () => void
}) {
  const education = [
    [
      "JUL 2024 - JUL 2026",
      "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      "Universidade Santa Cecília - Santos, São Paulo",
    ],
    [
      "JUL 2023 - JUL 2024 (TRANCADO)",
      "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      "Fatec Rubens Lara - Santos, São Paulo",
    ],
    [
      "JAN 2023 - JUL 2023 (TRANCADO)",
      "Tecnólogo em Sistemas Para Internet",
      "Fatec Rubens Lara - Santos, São Paulo",
    ],
  ]

  const certifications = [
    [
      "Google",
      {
        nome: "Build Wireframes and Low-Fidelity Prototypes",
        link: "https://coursera.org/share/31cd5393d0a6ca63544388c2069782b5",
      },
      {
        nome: "Conduct UX Research and Test Early Concepts",
        link: "https://coursera.org/share/8f3b5198aad4789d4499065aeb531680",
      },
      {
        nome: "Foundations of User Experience (UX) Design",
        link: "https://coursera.org/share/b99c50403f5a6e14e2dc2f7f3dad0f66",
      },
      {
        nome: "Start the UX Design Process: Empathize, Define, and Ideate",
        link: "https://coursera.org/share/42bc96c0ab0bee7c222b4040e18a72eb",
      },
      {
        nome: "Foundations of Project Management",
        link: "https://www.coursera.org/account/accomplishments/verify/XKAVMDC4GAG9",
      },
      {
        nome: "Project Initiation: Starting a Successful Project",
        link: "https://www.coursera.org/account/accomplishments/certificate/5E5PRV9AEUJB",
      },
      {
        nome: "Project Planning: Putting It All Together",
        link: "https://www.coursera.org/account/accomplishments/certificate/GNYFDS5M4HLY",
      },
    ],
    [
      "Fundação Bradesco",
      "Desenvolvimento Orientado a Objetos Utilizando Python",
      "Introdução à Análise de Dados – Microsoft Power BI",
      "Introdução à Programação Orientada a Objetos (POO)",
      "Linguagem de Programação Python – Básico",
    ],
    [
      "Alura",
      {
        nome: "Git e GitHub: compartilhando e colaborando em projetos",
        link: "https://cursos.alura.com.br/certificate/vinicius-florencio/git-github-compartilhando-colaborando-projetos",
      },
      {
        nome: "WordPress: crie sites com Elementor e Figma",
        link: "https://cursos.alura.com.br/certificate/vinicius-florencio/wordpress-crie-sites-elementor-figma",
      },
      {
        nome: "WordPress: integrando responsividade, efeitos visuais e explorando plugins",
        link: "https://cursos.alura.com.br/certificate/vinicius-florencio/wordpress-responsividade-efeitos-visuais-plugins",
      },
      {
        nome: "Formação A partir do zero: HTML e CSS para projetos web",
        link: "https://cursos.alura.com.br/degree/certificate/6fad05a6-428f-4802-814a-b504798fe110",
      },
      {
        nome: "Microsoft SQL Server 2022: conhecendo SQL",
        link: "https://cursos.alura.com.br/certificate/55a2b96e-d74c-446f-b1ae-df4dd0dc9984?lang=pt_BR",
      },
      {
        nome: "Power BI Desktop: Construindo meu primeiro Dashboard",
        link: "https://cursos.alura.com.br/certificate/4dafe42f-d74d-4dd6-a95d-66c4b19f444b",
      },
      {
        nome: "C: Avançando na Linguagem",
        link: "https://cursos.alura.com.br/certificate/28ec5aa1-4956-4018-8b3c-fe5a2101cfae",
      },
      {
        nome: "C: Conhecendo a Linguagem das Linguagens",
        link: "https://cursos.alura.com.br/certificate/f4d18c10-77bc-445c-a1dc-dddae4295636",
      },
      {
        nome: "Bootstrap 5: crie uma landing page responsiva",
        link: "https://cursos.alura.com.br/user/vinicius-florencio/course/bootstrap5-landing-page-responsiva/certificate",
      },
      {
        nome: "Cores no design: teoria e prática",
        link: "https://cursos.alura.com.br/certificate/vinicius-florencio/cores-design-teoria-pratica",
      },
      {
        nome: "Design Visual: aplicando técnicas de composição",
        link: "https://cursos.alura.com.br/certificate/vinicius-florencio/design-visual-tecnicas-composicao",
      },
      {
        nome: "Design Visual: estratégias para planejar e construir seu portfólio",
        link: "https://cursos.alura.com.br/certificate/vinicius-florencio/design-entenda-conheca-area",
      },
      {
        nome: "Design: entenda e conheça a área",
        link: "https://cursos.alura.com.br/certificate/vinicius-florencio/design-entenda-conheca-area",
      },
      {
        nome: "Figma: componentes, auto layout e máscaras",
        link: "https://cursos.alura.com.br/user/vinicius-florencio/course/figma-componentes-auto-layout-mascaras/certificate",
      },
      {
        nome: "Figma: conhecendo a ferramenta",
        link: "https://cursos.alura.com.br/user/vinicius-florencio/course/figma-conhecendo-ferramenta/certificate",
      },
      {
        nome: "Grids: como organizar o conteúdo visual",
        link: "https://cursos.alura.com.br/user/vinicius-florencio/course/grids-organizar-conteudo-visual/certificate",
      },
      {
        nome: "Tipografia: conceitos e prática",
        link: "https://cursos.alura.com.br/user/vinicius-florencio/course/tipografia-conceitos-pratica/certificate",
      },
      {
        nome: "UI Design: melhorando a experiência de um app com UI Patterns",
        link: "https://cursos.alura.com.br/user/vinicius-florencio/course/ui-design-experiencia-app-ui-patterns/certificate",
      },
    ],
    [
      "Outros",
      "AZ-900 Microsoft Azure Fundamentals - Fundação FAT",
      "EF SET English Certificate – Score 78/100 (C2 Proficient)",
    ],
  ]

  return (
    <div
      className="flex flex-col gap-20"
      onPointerMove={onPortraitPointerMove}
      onPointerLeave={onPortraitPointerLeave}
    >
      {/* Apresentação */}
      <section className="grid grid-cols-8 gap-6 max-md:flex max-md:flex-col-reverse">
        <div className="col-span-5 flex flex-col gap-6">
          <h2 className="about-reveal scroll-reveal font-['Instrument_Serif'] text-[56px] leading-none text-[#faf9f6] max-md:text-5xl">
            Vinicius Florencio
          </h2>

          <p className="about-reveal scroll-reveal font-['Satoshi_Variable:Regular'] text-base leading-[27px]">
            Product Designer com 2 anos de experiência no desenvolvimento de
            produtos digitais B2B, especializado em pesquisas com usuários,
            testes de usabilidade, Design Systems, wireframing, prototipação
            responsiva de alta fidelidade, acessibilidade (WCAG 2.2) e mentoria
            de estagiários.
          </p>

          <p className="about-reveal scroll-reveal font-['Satoshi_Variable:Regular'] text-base leading-[27px]">
            Autodidata, desenvolvi fluência em inglês, o que me permite
            colaborar em ambientes internacionais e acompanhar as melhores
            práticas de design.
          </p>

          <div className="flex flex-wrap gap-10">
            <ArrowLink
              className="about-reveal scroll-reveal"
              href="https://www.linkedin.com"
            >
              LINKEDIN
            </ArrowLink>

            <ArrowLink
              className="about-reveal scroll-reveal"
              href="mailto:viniciusferreiraflorencio@live.com"
            >
              E-MAIL
            </ArrowLink>

            <ArrowLink
              className="about-reveal scroll-reveal"
              href="https://wa.me/5513992024705"
            >
              WHATSAPP
            </ArrowLink>

            <ArrowLink className="about-reveal scroll-reveal" href="#cv">
              CV
            </ArrowLink>
          </div>
        </div>

        <div className="col-span-3 flex justify-end max-md:justify-center">
          <div className="size-[300px] shrink-0 max-md:size-[min(220px,58vw)]">
            <div
              ref={portraitRef}
              className="portrait-parallax size-full bg-gradient-to-b from-[#242424] to-[#262626] p-2 shadow-[0_4px_4px_rgba(0,0,0,0.12)]"
            >
              <div className="holographic-shine holographic-shine--ambient size-full overflow-hidden">
                <img
                  className="aspect-square h-auto w-full object-cover"
                  src={`${assetPathPrefix}/e4019.png`}
                  alt="Retrato de Vinicius Florencio"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Competências, ferramentas e idiomas */}
      <section className="flex flex-col gap-10">
        <h2 className="about-reveal scroll-reveal font-['Instrument_Serif'] text-[32px] text-[#faf9f6]">
          Competências
        </h2>

        <div className="flex flex-col">
          {aboutSkills.map((skill, index) => (
            <Fragment key={skill.title}>
              {index > 0 && <DashedDivider />}

              <article className="grid grid-cols-8 gap-6 py-10 first:pt-0 last:pb-0 max-md:flex max-md:flex-col">
                <div className="col-span-5 flex flex-col gap-3">
                  <h3 className="about-reveal scroll-reveal font-['Satoshi_Variable:Regular'] text-xl text-[#faf9f6]">
                    {skill.title}
                  </h3>

                  <p className="about-reveal scroll-reveal font-['Satoshi_Variable:Regular'] text-base leading-[27px]">
                    {skill.text}
                  </p>
                </div>

                {skill.tools && (
                  <div className="col-span-3 flex flex-col justify-end gap-3">
                    {skill.tools.map((tool) => {
                      const [label, value] = tool.split(" ")

                      return (
                        <div
                          key={tool}
                          className="flex items-center gap-3 font-['IBM_Plex_Mono:Regular'] text-xs"
                        >
                          <span className="about-reveal scroll-reveal w-20 text-right">
                            {label}
                          </span>

                          <span className="skill-track skill-reveal relative block h-1 flex-1 overflow-hidden bg-[#242424]">
                            <span
                              className="skill-progress absolute inset-y-0 left-0 block bg-[#c4c4c4]"
                              style={
                                {
                                  "--skill-progress": value,
                                } as CSSProperties
                              }
                            />
                          </span>

                          <span className="about-reveal scroll-reveal w-8">
                            {value}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </article>
            </Fragment>
          ))}
        </div>

        <DashedDivider />

        {/* Ferramentas e tecnologias */}
        <div className="grid grid-cols-8 gap-6 max-md:flex max-md:flex-col">
          <article className="col-span-5 flex flex-col gap-3">
            <h3 className="about-reveal scroll-reveal text-xl text-[#faf9f6]">
              Ferramentas e tecnologias
            </h3>

            <p className="about-reveal scroll-reveal leading-[27px]">
              Figma, FigJam, Maze, Hotjar, GA4, GTM, Azure DevOps, HTML, CSS,
              JavaScript, WordPress e inteligência artificial.
            </p>
          </article>
        </div>

        <DashedDivider />

        {/* Idiomas */}
        <div className="flex flex-col gap-6">
          <h3 className="about-reveal scroll-reveal text-xl text-[#faf9f6]">
            Idiomas
          </h3>

          <div className="grid grid-cols-8 gap-6 max-md:flex max-md:flex-col">
            {languages.map((language) => (
              <article
                key={language.title}
                className="col-span-4 flex flex-col gap-4"
              >
                <h4 className="about-reveal scroll-reveal text-base text-[#faf9f6]">
                  {language.href ? (
                    <a
                      href={language.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-dotted decoration-[#ababab]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf9f6]"
                    >
                      {language.title}
                    </a>
                  ) : (
                    language.title
                  )}
                </h4>

                <div className="flex flex-col gap-3">
                  {language.tools.map((tool) => {
                    const [label, value] = tool.split(" ")

                    return (
                      <div
                        key={tool}
                        className="flex items-center gap-3 font-['IBM_Plex_Mono:Regular'] text-xs"
                      >
                        <span className="about-reveal scroll-reveal w-20 text-right">
                          {label}
                        </span>

                        <span className="skill-track skill-reveal relative block h-1 flex-1 overflow-hidden bg-[#242424]">
                          <span
                            className="skill-progress absolute inset-y-0 left-0 block bg-[#c4c4c4]"
                            style={
                              {
                                "--skill-progress": value,
                              } as CSSProperties
                            }
                          />
                        </span>

                        <span className="about-reveal scroll-reveal w-8">
                          {value}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <DashedDivider />

      {/* Experiência */}
      <section className="flex flex-col gap-10">
        <h2 className="about-reveal scroll-reveal font-['Instrument_Serif'] text-[32px] text-[#faf9f6]">
          Experiência
        </h2>

        <div className="flex flex-col">
          {experiences.map((experience, index) => (
            <Fragment key={experience.role}>
              {index > 0 && <DashedDivider />}

              <article className="flex flex-col gap-3 py-10 first:pt-0 last:pb-0">
                <p className="about-reveal scroll-reveal font-['IBM_Plex_Mono:Regular'] text-xs text-[#ababab]">
                  {experience.date}
                </p>

                <h3 className="about-reveal scroll-reveal text-xl text-[#faf9f6]">
                  {experience.role}
                </h3>

                <p className="about-reveal scroll-reveal">
                  <a
                    className="mr-3 font-['IBM_Plex_Mono:SemiBold'] text-sm transition-colors hover:text-[#faf9f6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf9f6]"
                    href={experience.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {experience.company} ↗
                  </a>{" "}
                  {experience.place}
                </p>

                <ul className="list-outside list-disc space-y-1 pl-6 leading-[27px] marker:text-[#ababab]">
                  {experience.items.map((item, itemIndex) => (
                    <li
                      key={item}
                      className="about-reveal scroll-reveal"
                      style={{ transitionDelay: `${itemIndex * 70}ms` }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Fragment>
          ))}
        </div>
      </section>

      <DashedDivider />

      {/* Educação */}
      <section className="flex flex-col gap-10">
        <h2 className="about-reveal scroll-reveal font-['Instrument_Serif'] text-[32px] text-[#faf9f6]">
          Educação
        </h2>

        <div className="flex flex-col">
          {education.map(([date, course, school], index) => (
            <Fragment key={school + course}>
              {index > 0 && <DashedDivider />}

              <article className="flex flex-col gap-2 py-10 first:pt-0 last:pb-0">
                <p className="about-reveal scroll-reveal font-['IBM_Plex_Mono:Regular'] text-xs text-[#ababab]">
                  {date}
                </p>

                <h3 className="about-reveal scroll-reveal text-xl text-[#faf9f6]">
                  {course}
                </h3>

                <p className="about-reveal scroll-reveal">{school}</p>
              </article>
            </Fragment>
          ))}
        </div>
      </section>

      <DashedDivider />

      {/* Certificações */}
      <section className="flex flex-col gap-6">
        <h2 className="about-reveal scroll-reveal font-['Instrument_Serif'] text-[32px] text-[#faf9f6]">
          Certificações
        </h2>

        <div className="flex flex-col">
          {certifications.map(([provider, ...items], providerIndex) => (
            <Fragment key={provider}>
              {providerIndex > 0 && <DashedDivider />}

              <article className="flex flex-col gap-3 py-6 first:pt-0 last:pb-0">
                <h3 className="about-reveal scroll-reveal text-xl text-[#faf9f6]">
                  {provider}
                </h3>

                <ul className="list-outside list-disc space-y-1 pl-6 leading-[27px] marker:text-[#ababab]">
                  {items.map((item, index) => {
                    const nome =
                      typeof item === "string" ? item : item.nome
                    const link =
                      typeof item === "string" ? undefined : item.link

                    return (
                      <li
                        key={nome}
                        className="about-reveal scroll-reveal"
                        style={{ transitionDelay: `${index * 70}ms` }}
                      >
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-dotted decoration-[#ababab]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                          >
                            {nome}
                          </a>
                        ) : (
                          nome
                        )}
                      </li>
                    )
                  })}
                </ul>
              </article>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  )
}

type HomeProps = {
  contentView: ContentView
  onOpenMovecta: () => void
  onOpenBasic: () => void
  onShowProjects: (projectId?: string) => void
  onShowAbout: () => void
}

export default function Home({
  onOpenMovecta,
  onOpenBasic,
  onShowProjects,
}: HomeProps) {
  const [activeSection, setActiveSection] = useState("projetos")
  const [footerVisible, setFooterVisible] = useState(false)
  const [mobileSectionsVisible, setMobileSectionsVisible] = useState(false)

  const portraitRef = useRef<HTMLDivElement>(null)
  const aboutPortraitRef = useRef<HTMLDivElement>(null)
  const homeHeroRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("main")?.parentElement
    if (!root) return

    const revealSelector = [
      ".scroll-reveal",
      ".case-reveal",
      ".skill-reveal",
      "#contatos h1",
      "#contatos h2",
      "#contatos h3",
      "#contatos h4",
      "#contatos p",
      "#contatos a",
      "#contatos li",
      "#contatos img",
    ].join(", ")

    const observedItems = new WeakSet<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting)
        })
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -15% 0px",
      },
    )

    const observeItem = (element: Element) => {
      if (!(element instanceof HTMLElement) || observedItems.has(element)) {
        return
      }

      // O footer recebe a mesma classe de animação dos demais itens.
      if (
        element.closest("#contatos") &&
        !element.matches(".scroll-reveal, .case-reveal, .skill-reveal")
      ) {
        element.classList.add("case-reveal")
      }

      observedItems.add(element)
      observer.observe(element)
    }

    const scan = (parent: ParentNode) => {
      parent.querySelectorAll(revealSelector).forEach(observeItem)

      if (parent instanceof Element && parent.matches(revealSelector)) {
        observeItem(parent)
      }
    }

    root.querySelectorAll(".is-visible").forEach((element) => {
      element.classList.remove("is-visible")
    })

    scan(root)

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            scan(node)
          }
        })
      })
    })

    mutationObserver.observe(root, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  // Exibe SEÇÕES somente depois que a hero inteira sair da tela.
  // Também atualiza a seção ativa e detecta a chegada ao rodapé.
  useEffect(() => {
    const updateNavigation = () => {
      const hero = heroSectionRef.current

      if (hero) {
        setMobileSectionsVisible(hero.getBoundingClientRect().bottom <= 0)
      }

      const marker = window.innerHeight * 0.35

      const visibleSections = homeSections
        .map((section) => document.getElementById(section.id))
        .filter((element): element is HTMLElement => element !== null)
        .filter((element) => {
          if (element.classList.contains("hidden")) return false

          const rect = element.getBoundingClientRect()
          return rect.top <= marker && rect.bottom > marker
        })

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[visibleSections.length - 1].id)
      }
    }

    const footer = document.getElementById("contatos")

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.08 },
    )

    if (footer) footerObserver.observe(footer)

    window.addEventListener("scroll", updateNavigation, {
      passive: true,
    })
    window.addEventListener("resize", updateNavigation)

    updateNavigation()

    return () => {
      footerObserver.disconnect()
      window.removeEventListener("scroll", updateNavigation)
      window.removeEventListener("resize", updateNavigation)
    }
  }, [])

  // Mantém o efeito visual do hero durante a rolagem.
  useEffect(() => {
    const updateHomeVisibility = () => {
      const hero = homeHeroRef.current
      if (!hero) return

      const progress = Math.min(
        Math.max(window.scrollY / (window.innerHeight * 0.72), 0),
        1,
      )

      hero.style.opacity = String(1 - progress)
      hero.style.transform = `translateY(${-24 * progress}px)`
      hero.style.pointerEvents = progress > 0.9 ? "none" : "auto"
    }

    window.addEventListener("scroll", updateHomeVisibility, {
      passive: true,
    })
    updateHomeVisibility()

    return () => {
      window.removeEventListener("scroll", updateHomeVisibility)
    }
  }, [])

  const applyPortraitParallax = (
    event: PointerEvent<HTMLElement>,
    portrait: HTMLDivElement | null,
  ) => {
    if (
      !portrait ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const x = event.clientX / window.innerWidth - 0.5
    const y = event.clientY / window.innerHeight - 0.5

    portrait.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.015)`
  }

  const resetPortraitParallax = (portrait: HTMLDivElement | null) => {
    if (portrait) {
      portrait.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)"
    }
  }

  const movePortrait = (event: PointerEvent<HTMLElement>) => {
    applyPortraitParallax(event, portraitRef.current)
  }

  const resetPortrait = () => {
    resetPortraitParallax(portraitRef.current)
  }

  const moveAboutPortrait = (event: PointerEvent<HTMLElement>) => {
    applyPortraitParallax(event, aboutPortraitRef.current)
  }

  const resetAboutPortrait = () => {
    resetPortraitParallax(aboutPortraitRef.current)
  }

  const navigateToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="bg-[#1c1c1c] text-[#c4c4c4]">
      <main
        ref={heroSectionRef}
        className="page-grid relative min-h-dvh content-center overflow-hidden bg-[#1c1c1c] py-10 text-[#c4c4c4] max-md:overflow-y-auto"
        onPointerMove={movePortrait}
        onPointerLeave={resetPortrait}
      >
        <div
          ref={homeHeroRef}
          id="inicio"
          className="home-hero relative col-start-3 col-end-11 flex items-center justify-between max-lg:col-start-2 max-lg:col-end-12 max-md:flex-col-reverse max-md:gap-7"
        >
          <div className="flex w-[586px] min-w-0 flex-col gap-6 max-md:w-full">
            <div className="flex flex-col gap-3">
              <p
                className="home-fade-item hero-eyebrow fade-in font-['IBM_Plex_Mono:Medium'] text-xs text-[#ababab]"
                style={{ animationDelay: "360ms" }}
              >
                PRODUCT DESIGN • DESIGN SYSTEM • WCAG 2.2 • RESEARCH • AI
              </p>

              <h1
                className="home-fade-item hero-title fade-in font-['Instrument_Serif'] text-[80px] leading-none whitespace-nowrap text-[#faf9f6] max-lg:text-[clamp(3.2rem,6vw,5rem)] max-sm:text-5xl max-sm:whitespace-normal"
                style={{ animationDelay: "500ms" }}
              >
                Vinicius Florencio
              </h1>

              <p
                className="home-fade-item hero-description fade-in font-['Satoshi_Variable:Regular'] text-xl leading-[27px] text-[#c4c4c4] max-sm:text-lg max-sm:leading-6"
                style={{ animationDelay: "640ms" }}
              >
                Product Designer Jr., analista de sistemas, santista e
                voluntário com 2+ anos de experiência no desenvolvimento de
                soluções focadas no usuário
              </p>
            </div>

            <div
              className="home-fade-item hero-links fade-in flex items-center gap-10 max-sm:flex-wrap max-sm:gap-x-6 max-sm:gap-y-3"
              style={{ animationDelay: "780ms" }}
            >
              <ArrowLink href="https://www.linkedin.com">LINKEDIN</ArrowLink>
              <ArrowLink href="mailto:vinicius@example.com">E-MAIL</ArrowLink>
              <ArrowLink href="https://wa.me/">WHATSAPP</ArrowLink>
              <ArrowLink href="#cv">CV</ArrowLink>
            </div>
          </div>

          <div
            className="home-fade-item hero-image fade-in size-[300px] shrink-0 max-md:size-[min(220px,58vw)]"
            style={{ animationDelay: "420ms" }}
          >
            <div
              ref={portraitRef}
              className="portrait-parallax size-full bg-gradient-to-b from-[#242424] to-[#262626] p-2 shadow-[0_4px_4px_rgba(0,0,0,0.12)]"
            >
              <div className="holographic-shine holographic-shine--ambient size-full overflow-hidden">
                <img
                  className="aspect-square h-auto w-full object-cover"
                  src={`${assetPathPrefix}/e4019.png`}
                  alt="Retrato de Vinicius Florencio"
                />
              </div>
            </div>
          </div>

          <div className="absolute top-[calc(100%+120px)] left-1/2 -translate-x-1/2 max-md:top-[calc(100%+88px)]">
            <button
              type="button"
              onClick={() => {
                onShowProjects()
                navigateToSection("projetos")
              }}
              className="home-fade-item hero-scroll-cue fade-in-up group flex items-center gap-2 font-['IBM_Plex_Mono:SemiBold'] text-sm whitespace-nowrap text-[#ababab] transition-colors hover:text-[#faf9f6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#faf9f6]"
            >
              <img
                className="scroll-cue-icon size-6"
                src={`${assetPathPrefix}/b8771.svg`}
                alt=""
              />
              VER MAIS
            </button>
          </div>
        </div>
      </main>

      <section className="page-grid relative min-h-dvh bg-[#1c1c1c] pt-32 max-md:pt-24">
        <Navbar
          sections={homeSections}
          activeSection={activeSection}
          onNavigate={navigateToSection}
          footerVisible={footerVisible}
          mobileButtonVisible={mobileSectionsVisible}
        />

        <div className="relative col-start-4 col-end-12 row-start-1 max-md:col-start-2">
          <div
            id="projetos"
            className="scroll-mt-32 grid grid-cols-2 gap-6 max-md:grid-cols-1"
          >
            {projects.map((project, index) => (
              <Card
                key={project.id}
                project={project}
                delay={(index + 1) * 300}
                underConstruction={project.id === "studyin"}
                onOpen={
                  project.id === "movecta"
                    ? onOpenMovecta
                    : project.id === "basic-ui-kit"
                      ? onOpenBasic
                      : undefined
                }
              />
            ))}
          </div>

          <div className="my-32 max-md:my-24">
            <Divider />
          </div>

          <section
            id="sobre"
            className="scroll-mt-32 bg-[#1c1c1c] font-['Satoshi_Variable:Regular'] text-[#c4c4c4]"
          >
            <AboutContent
              portraitRef={aboutPortraitRef}
              onPortraitPointerMove={moveAboutPortrait}
              onPortraitPointerLeave={resetAboutPortrait}
            />
          </section>
        </div>

        <div className="scroll-reveal relative col-start-4 col-end-12 row-start-2 mt-20 max-md:col-start-2 max-md:mt-12">
          <DashedDivider />
        </div>

        <Footer id="contatos" className="row-start-3 mt-20 max-md:mt-12" />
      </section>
    </div>
  )
}