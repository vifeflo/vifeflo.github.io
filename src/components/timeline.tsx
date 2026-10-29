const TOTAL_WEEKS = 16

const phases = [
  {
    name: "EMPATIA",
    durationWeeks: 3,
    startWeek: 0,
    description:
      "Pesquisa com usuários, análise de reclamações de CX e avaliação heurística",
    color: "bg-[#a65959]",
  },
  {
    name: "DEFINIÇÃO",
    durationWeeks: 6,
    startWeek: 0,
    description:
      "Mapas de afinidade e identificação de problemas na jornada",
    color: "bg-[#a69359]",
  },
  {
    name: "IDEAÇÃO",
    durationWeeks: 3,
    startWeek: 6,
    description:
      "Exploração de soluções, benchmarking de concorrentes, inventário de recursos e wireframes iniciais",
    color: "bg-[#59a659]",
  },
  {
    name: "PROTOTIPAÇÃO",
    durationWeeks: 8,
    startWeek: 8,
    description: "Protótipos navegáveis de alta fidelidade no Figma",
    color: "bg-[#5998a6]",
  },
  {
    name: "TESTES",
    durationWeeks: 6,
    startWeek: 10,
    description:
      "Testes moderados de usabilidade e iteração dos protótipos",
    color: "bg-[#9c59a6]",
  },
]

const months = [
  { label: "JUN", week: 0 },
  { label: "JUL", week: 4 },
  { label: "AGO", week: 8 },
  { label: "SET", week: 12 },
  { label: "OUT", week: 16 },
]

export default function Timeline() {
  return (
    <div className="bg-gradient-to-b from-[#242424] to-[#262626] p-3 shadow-[0_4px_4px_rgba(0,0,0,0.12)]">
      <p className="mb-3 text-sm font-medium">
        Linha do tempo do projeto - 20 semanas
      </p>

      <div className="grid grid-cols-[1.1fr_1fr] gap-6 max-md:grid-cols-1">
        <div className="relative grid min-h-[300px] grid-rows-5 gap-4 py-2 max-sm:min-h-[260px]">
          {/* O eixo começa no mesmo ponto do trilho das barras. Cada tracejado marca o início do mês. */}
          <div
            className="pointer-events-none absolute inset-y-0 left-[100px] right-0 z-20 max-sm:left-[84px]"
            aria-hidden="true"
          >
            {months.map(({ label, week }) => {
              const position = (week / TOTAL_WEEKS) * 100

              return (
                <div
                  key={label}
                  className="absolute inset-y-0"
                  style={{ left: `${position}%` }}
                >
                  <span className="absolute top-0 bottom-7 w-0 border-l border-dashed border-[#ababab]/40" />
                  <span className="absolute bottom-0 left-0 -translate-x-1/2 whitespace-nowrap font-['IBM_Plex_Mono:Regular'] text-xs text-[#ababab]">
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          {phases.map((phase) => (
            <div
              key={phase.name}
              className="relative z-10 grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3 max-sm:grid-cols-[72px_minmax(0,1fr)]"
            >
              <span className="whitespace-nowrap font-['IBM_Plex_Mono:Regular'] text-right text-xs text-[#ababab]">
                {phase.name}
              </span>

              <span className="relative block h-1.5 min-w-0">
                <span
                  className={`absolute top-0 h-full shadow-md ${phase.color}`}
                  style={{
                    left: `${(phase.startWeek / TOTAL_WEEKS) * 100}%`,
                    width: `${(phase.durationWeeks / TOTAL_WEEKS) * 100}%`,
                  }}
                />
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 font-['IBM_Plex_Mono:Regular'] text-xs leading-[27px]">
          {phases.map((phase, index) => (
            <div key={phase.name}>
              <p className="font-['IBM_Plex_Mono:Medium']">
                {index + 1} - {phase.name[0] + phase.name.slice(1).toLowerCase()} - {phase.durationWeeks} semanas
              </p>

              <p className="text-[#ababab]">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
