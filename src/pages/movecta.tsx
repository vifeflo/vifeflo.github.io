import { useLayoutEffect, useState } from "react"

import AnimatedNumber from "../components/animatedNumber"
import BenchmarkTable from "../components/benchmarkTable"
import DashedDivider from "../components/dashedDivider"
import Divider from "../components/divider"
import Footer from "../components/footer"
import Header from "../components/header"
import Navbar from "../components/navbar"
import ProjectImage from "../components/projectImage"
import Title from "../components/title"
import StatGrid from "../components/statGrid"
import Timeline from "../components/timeline"

const sectionNav = [
  ["movecta-inicio", "INÍCIO"],
  ["movecta-papel", "MEU PAPEL"],
  ["movecta-desafio", "DESAFIO"],
  ["movecta-pesquisa", "PESQUISA COM USUÁRIOS"],
  ["movecta-afinidade", "MAPA DE AFINIDADE"],
  ["movecta-heuristica", "AVALIAÇÃO HEURÍSTICA"],
  ["movecta-benchmarking", "BENCHMARKING"],
  ["movecta-inventario", "INVENTÁRIO DE RECURSOS"],
  ["movecta-prototipacao", "PROTOTIPAÇÃO"],
  ["movecta-testes", "TESTES DE USABILIDADE"],
] as const

const navbarSections = sectionNav.map(([id, label]) => ({
  id,
  label,
}))

type MovectaProps = {
  onShowAbout: () => void
  onShowProjects: (projectId?: string) => void
  onGoHome?: () => void
}

export default function Movecta({
  onShowAbout,
  onShowProjects,
  onGoHome,
}: MovectaProps) {
  const [activeSection, setActiveSection] = useState("movecta-inicio")
  const [footerVisible, setFooterVisible] = useState(false)

  useLayoutEffect(() => {
    const sections = sectionNav
      .map(([id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting)

        if (current) {
          setActiveSection(current.target.id)
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    )

    sections.forEach((section) => sectionObserver.observe(section))

    const revealItems = document.querySelectorAll(
      "#movecta-page main .scroll-reveal, #movecta-page main :is(h1,h2,h3,p,li,blockquote,img,th,td)",
    )

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-visible",
            entry.isIntersecting,
          )
        })
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -12% 0px",
      },
    )

    revealItems.forEach((item) => {
      if (!item.classList.contains("scroll-reveal")) {
        item.classList.add("case-reveal")
      }

      revealObserver.observe(item)
    })

    const footer = document.getElementById("movecta-contatos")

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting)
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -15% 0px",
      },
    )

    if (footer) {
      footerObserver.observe(footer)
    }

    return () => {
      sectionObserver.disconnect()
      revealObserver.disconnect()
      footerObserver.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome()
    } else {
      scrollTo("movecta-inicio")
    }
  }

  return (
    <div
      id="movecta-page"
      className="min-h-dvh bg-[#1c1c1c] 	font-['Satoshi_Variable'] font-normal text-[#c4c4c4]"
    >
      <Header
        onGoHome={handleGoHome}
        onOpenMovecta={() => scrollTo("movecta-inicio")}
        onOpenBasic={() => onShowProjects("basic-ui-kit")}
        onShowProjects={onShowProjects}
        onShowAbout={onShowAbout}
      />

      <main className="page-grid items-start pt-32 max-md:pt-24">
        <Navbar
          sections={navbarSections}
          activeSection={activeSection}
          onNavigate={scrollTo}
          footerVisible={footerVisible}
        />

        <div className="col-start-4 col-end-12 row-start-1 flex min-w-0 flex-col gap-20 pb-20 max-md:col-start-2">
          <section
            id="movecta-inicio"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <ProjectImage
              mobileBleed
              file="29fa9.png"
              alt="Portal de Autoatendimento Movecta"
            />

            <div className="flex flex-col gap-3">
              <p className="font-['IBM_Plex_Mono:Medium'] text-xs text-[#ababab]">
                2025 • RESEARCH • LOGÍSTICA • B2B
              </p>

              <h1 className="font-['Instrument_Serif'] text-[32px] leading-none text-[#faf9f6]">
                Portal de Autoatendimento Movecta
              </h1>
            </div>

            <p className="text-xl leading-[27px]">
              Este case apresenta toda a jornada de discovery, entrevistas,
              desenvolvimento e testes do redesign de um portal de
              autoatendimento logístico, criado para facilitar as operações
              portuárias dos clientes de um terminal logístico.
            </p>

            <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {[
                ["100%", "preferiram o novo fluxo"],
                ["15+ entrevistas", "usuários internos e externos"],
                ["+3.200h registradas", "5 meses de projeto"],
                ["2 frentes de trabalho", "negócios e design"],
              ].map(([value, label]) => (
                <div key={value}>
                  <p className="text-xl font-medium text-[#faf9f6]">
                    <AnimatedNumber value={value} />
                  </p>

                  <p className="leading-[27px]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <Divider />

          <section
            id="movecta-papel"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title>Meu papel</Title>

            <p className="leading-[27px]">
              Como designer de produto fui um dos responsáveis pela condução de
              entrevistas, análise de dados e geração de insights com auxílio
              de{" "}
              <strong className="font-medium">
                inteligência artificial
              </strong>
              , criação de protótipos navegáveis de alta fidelidade e condução
              de testes de usabilidade com usuários finais.
            </p>

            <h3 className="font-medium text-[#faf9f6]">
              Processo de design
            </h3>

            <p className="leading-[27px]">
              O processo de design seguiu os princípios do{" "}
              <strong className="font-medium">Design Thinking</strong>,
              buscando compreender profundamente as dores dos usuários e
              iterar continuamente na criação e validação de protótipos
              navegáveis.
            </p>

            <Timeline />
          </section>

          <Divider />

          <section
            id="movecta-desafio"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title>Desafio</Title>

            <p className="leading-[27px]">
              Os principais desafios do projeto foram reformular a experiência
              do cliente dentro do portal de autoatendimento logístico e reduzir
              a alta dependência de ferramentas externas como telefones e
              e-mails para contato com o operador do terminal.
            </p>

            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
              <ProjectImage
                mobileBleed
                file="e4225.png"
                alt="Portal anterior, tela um"
              />
              <ProjectImage
                mobileBleed
                file="6ac05.png"
                alt="Portal anterior, tela dois"
              />
              <ProjectImage
                mobileBleed
                file="6eb7c.png"
                alt="Portal anterior, tela três"
              />
              <ProjectImage
                mobileBleed
                file="20509.png"
                alt="Portal anterior, tela quatro"
              />
            </div>

            <blockquote className="border-l border-[#ababab] pl-3 font-medium text-[#ababab]">
              “O portal do cliente atual não oferece uma boa usabilidade e
              carece de funcionalidades relevantes.”
            </blockquote>
          </section>

          <Divider />

          <section
            id="movecta-pesquisa"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title eyebrow="EMPATIA • SEMANAS 1 - 3">
              Pesquisa com usuários
            </Title>

            <p className="leading-[27px]">
              Iniciamos com a fase de pesquisa com usuários para entender a
              experiência atual como um todo, investigar a jornada e identificar
              frustrações e pontos de melhoria.
            </p>

            <h3 className="font-medium text-[#faf9f6]">
              Metodologia
            </h3>

            <StatGrid
              items={[
                ["14", "entrevistas com usuários"],
                ["17h", "de entrevistas qualitativas"],
                ["18", "pontos de dor"],
                ["24", "possibilidades de melhoria"],
              ]}
            />

            <h3 className="font-medium text-[#faf9f6]">
              Dados demográficos
            </h3>

            <p className="leading-[27px]">
              Com isso, conseguimos identificar os padrões demográficos dos
              usuários antes de aprofundar a análise dos dados coletados.
            </p>

            <StatGrid
              items={[
                ["38 anos", "idade média"],
                ["Ensino superior", "escolaridade predominante"],
                ["60% homens", "gênero predominante"],
                ["Intermediário", "letramento digital"],
              ]}
            />
          </section>

          <Divider />

          <section
            id="movecta-afinidade"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title eyebrow="DEFINIÇÃO • SEMANAS 1 - 3">
              Mapa de afinidade
            </Title>

            <p className="leading-[27px]">
              Após a primeira rodada de entrevista, com um grande volume de
              dados, pudemos montar um mapa de afinidade que gerou evidências
              sólidas dos principais pontos de dor dos usuários.
            </p>

            <ProjectImage
              mobileBleed
              file="1eca9.png"
              alt="Mapa de afinidade do projeto"
            />

            <h3 className="font-medium text-[#faf9f6]">
              Principais descobertas
            </h3>

            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
              {[
                {
                  title: "Falta de visibilidade de status",
                  items: [
                    "A carga está liberada?",
                    "Existe algum bloqueio? Por quê?",
                    "Em qual etapa está o processo?",
                  ],
                  quote: "“Ficamos o tempo inteiro às cegas.”",
                },
                {
                  title: "Comunicação complexa e reativa",
                  items: [
                    "Informações críticas chegam tarde",
                    "Falta de alertas automáticos",
                    "Excesso de e-mails",
                  ],
                  quote: "“Recebo cerca de 60 e-mails por dia.”",
                },
                {
                  title: "Informações fragmentadas",
                  items: [
                    "Relatórios pouco legíveis",
                    "Falta de visão consolidada",
                    "Dificuldade de tomada de decisão",
                  ],
                  quote: "“Não existe uma tela que une tudo.”",
                },
              ].map(({ title, items, quote }) => (
                <article
                  key={title}
                  className="flex flex-col gap-3"
                >
                  <h3 className="font-medium text-[#faf9f6]">
                    {title}
                  </h3>

                  <ul className="list-disc pl-6 leading-[27px]">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <blockquote className="border-l border-[#ababab] pl-3 font-medium text-[#ababab]">
                    {quote}
                  </blockquote>
                </article>
              ))}
            </div>
          </section>

          <Divider />

          <section
            id="movecta-heuristica"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title eyebrow="EMPATIA • SEMANA 3">
              Avaliação heurística
            </Title>

            <p className="leading-[27px]">
              Também avaliamos o portal antigo com base nas 10 heurísticas de
              Nielsen para identificar problemas de usabilidade e
              inconsistências na interface, orientando as decisões de UX para
              o novo portal.
            </p>

            <h3 className="font-medium text-[#faf9f6]">
              Descobertas
            </h3>

            <StatGrid
              items={[
                ["19", "problemas identificados"],
                ["5", "alto impacto"],
                ["11", "médio impacto"],
                ["3", "baixo impacto"],
              ]}
            />
          </section>

          <Divider />

          <section
            id="movecta-benchmarking"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title eyebrow="IDEAÇÃO • SEMANAS 4 - 5">
              Benchmarking
            </Title>

            <p className="leading-[27px]">
              Realizamos um benchmarking competitivo para mapear funcionalidades
              e soluções adotadas por portais similares, incluindo referências
              sugeridas pelo time interno.
            </p>

            <p className="leading-[27px]">
              Além de analisar as interfaces e os fluxos de navegação, estudamos
              a documentação técnica dos concorrentes para compreender melhor o
              funcionamento de seus recursos e suas possíveis aplicações.
            </p>

            <BenchmarkTable />

            <p className="leading-[27px]">
              A partir dessa análise, avaliamos quais funcionalidades faziam
              sentido incorporar à nossa proposta, considerando as necessidades
              dos usuários, a viabilidade técnica e o contexto do negócio.
            </p>
          </section>

          <Divider />

          <section
            id="movecta-inventario"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title eyebrow="IDEAÇÃO • SEMANA 6">
              Inventário de recursos
            </Title>

            <p className="leading-[27px]">
              Mapeamos as funcionalidades existentes no portal para compreender
              sua estrutura, identificar oportunidades de melhoria e orientar o
              redesign.
            </p>

            <ProjectImage
              mobileBleed
              file="e342b.png"
              alt="Inventário de recursos do portal"
            />
          </section>

          <Divider />

          <section
            id="movecta-prototipacao"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title eyebrow="PROTOTIPAÇÃO • SEMANAS 4 - 8">
              Prototipação
            </Title>

            <p className="leading-[27px]">
              Com os dados limpos e insights consolidados iniciamos a fase de
              prototipação, gerando artefatos palpáveis que traduziram o
              trabalho da equipe de design em uma experiência interativa que
              abrange cerca de{" "}
              <strong className="font-medium">20 fluxos de trabalho</strong>.
              Também incorporamos um{" "}
              <strong className="font-medium">chat integrado</strong> em todas
              as telas, centralizando a comunicação e reduzindo a dependência de
              canais externos.
            </p>

            <ProjectImage
              mobileBleed
              file="bac8e.png"
              alt="Visão geral dos fluxos do portal"
            />

            <h3 className="font-medium text-[#faf9f6]">
              Objetivos
            </h3>

            <div className="grid grid-cols-3 gap-6 max-sm:grid-cols-1">
              {[
                "Redução de retrabalho operacional",
                "Maior previsibilidade para os usuários",
                "Comunicação proativa",
                "Visibilidade e clareza",
                "Acompanhamento contínuo da operação",
              ].map((objective) => (
                <p
                  key={objective}
                  className="bg-gradient-to-b from-[#242424] to-[#262626] p-3 leading-[27px] shadow-[0_4px_4px_rgba(0,0,0,0.12)]"
                >
                  {objective}
                </p>
              ))}
            </div>

            <h3 className="font-medium text-[#faf9f6]">
              Fluxos
            </h3>

            {[
              [
                "Login:",
                "Redesenhamos o fluxo de autenticação com suporte à certificação digital e uma experiência de primeiro acesso renovada, buscando simplificar a entrada na plataforma e facilitar o entendimento das etapas necessárias para acessar o portal.",
                "ae9eb.png",
              ],
              [
                "Dashboard inicial:",
                "Desenvolvemos uma tela inicial que reúne as principais informações e funcionalidades do portal, facilitando o acesso às tarefas recorrentes e oferecendo uma visão geral das operações sem a necessidade de navegar por diferentes áreas.",
                "ef28d.png",
              ],
              [
                "Acompanhamento de carga:",
                "Projetamos uma tela que consolida o histórico completo de movimentações da carga, reunindo informações como temperatura, anexos, registros de avarias e demais dados operacionais em um único ambiente. O objetivo foi facilitar o acompanhamento da operação e reduzir a fragmentação das informações.",
                "39b91.png",
              ],
              [
                "Agendamentos:",
                "Redesenhamos a experiência de agendamento com uma interface mais visual e três modos de visualização: diária, semanal e mensal. Também propusemos uma funcionalidade de encaixe de agendamentos diretamente pela plataforma.",
                "2283d.png",
              ],
            ].map(([title, description, image], index) => (
              <div key={title} className="flex flex-col gap-6">
                {index > 0 && <DashedDivider />}

                <p className="leading-[27px]">
                  <strong className="font-medium">{title}</strong>{" "}
                  {description}
                </p>

                <ProjectImage
                  mobileBleed
                  file={image}
                  alt={`Fluxo de ${title}`}
                />
              </div>
            ))}

            <h3 className="font-medium text-[#faf9f6]">
              Dark mode
            </h3>

            <p className="leading-[27px]">
              O portal foi projetado considerando princípios de acessibilidade
              da <strong className="font-medium">WCAG 2.2</strong>, buscando
              tornar a experiência mais inclusiva e facilitar a navegação.
              Também incorporamos opções de personalização entre os temas claro
              e escuro.
            </p>

            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
              <ProjectImage
                mobileBleed
                file="bcdb7.png"
                alt="Portal em modo claro"
              />
              <ProjectImage
                mobileBleed
                file="79017.png"
                alt="Portal em modo escuro"
              />
              <ProjectImage
                mobileBleed
                file="bd92c.png"
                alt="Detalhe do modo claro"
              />
              <ProjectImage
                mobileBleed
                file="6e2f1.png"
                alt="Detalhe do modo escuro"
              />
            </div>
          </section>

          <Divider />

          <section
            id="movecta-testes"
            className="scroll-mt-32 flex flex-col gap-6"
          >
            <Title eyebrow="TESTES • SEMANAS 6 - 8">
              Testes de usabilidade
            </Title>

            <p className="leading-[27px]">
              Por fim realizamos uma nova rodada de entrevistas com testes
              moderados no <strong className="font-medium">Teams</strong> e não
              moderados no <strong className="font-medium">Maze</strong> para
              validar se a solução abordou os problemas da fase exploratória e
              identificar novos pontos de melhoria.
            </p>

            <h3 className="font-medium text-[#faf9f6]">
              Resultados
            </h3>

            <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
              {[
                [
                  "Tracking completo aumenta a percepção de controle",
                  "100%",
                  "dos participantes compreenderam facilmente a funcionalidade e afirmaram que o novo fluxo melhoraria a qualidade e a eficiência da operação.",
                ],
                [
                  "Relatórios personalizáveis reduzem o tempo de análise",
                  "80%",
                  "acreditam que relatórios personalizáveis e favoritos facilitariam a análise, a tomada de decisões e a prevenção de problemas.",
                ],
                [
                  "Notificações em tempo real agilizam a operação",
                  "80%",
                  "relataram que alertas sobre movimentações permitiriam agir com mais agilidade, evitando atrasos em pagamentos, envios de documentos e acompanhamento das cargas.",
                ],
                [
                  "Flexibilidade de agendamento reduz atritos",
                  "80%",
                  "relataram que a possibilidade de escolher datas e editar retiradas aumentaria a autonomia e reduziria a necessidade de contato direto com o operador.",
                ],
              ].map(([title, value, text]) => (
                <article
                  key={title}
                  className="bg-gradient-to-b from-[#242424] to-[#262626] p-3 shadow-[0_4px_4px_rgba(0,0,0,0.12)]"
                >
                  <h3 className="mb-3 text-xl font-medium text-[#faf9f6]">
                    {title}
                  </h3>

                  <p className="leading-[27px]">
                    <strong className="font-medium">{value}</strong>{" "}
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <Divider />
        </div>

        <Footer id="movecta-contatos" />

      </main>
    </div>
  )
}