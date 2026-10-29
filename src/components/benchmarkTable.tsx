const assetPathPrefix = "/assets"

const benchmarkRows = [
  ["Portal atual", true, true, true, true, true],
  ["DP World", true, true, true, true, true],
  ["Ecoporto", true, true, true, false, true],
  ["Sita", true, true, true, true, false],
  ["Bandeirantes Deicmar", true, true, true, true, true],
  ["Tecon", false, false, true, false, true],
] as const

const columns = [
  "Portal",
  "Redestinação",
  "Presença de carga",
  "Liberação doc.",
  "Faturamento",
  "Agendamento",
]

export default function BenchmarkTable() {
  return (
    <section className="benchmark-table w-full min-w-0" aria-label="Benchmarking competitivo">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-['IBM_Plex_Mono:Medium'] text-[10px] uppercase tracking-[0.12em] text-[#ababab] sm:text-xs">
          Comparativo de funcionalidades
        </p>
      </div>

      <div
        className="benchmark-scroll overflow-x-auto overscroll-x-contain border-y border-[#ababab]/30 [scrollbar-color:#777_#262626] [scrollbar-width:thin]"
        role="region"
        aria-label="Tabela de benchmarking. Role horizontalmente para comparar todas as funcionalidades."
        tabIndex={0}
      >
        <table className="w-full min-w-[860px] border-collapse text-left text-sm sm:text-base">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={`border-b border-[#ababab]/40 bg-[#222222] px-4 py-4 	font-['Satoshi_Variable'] font-normal font-medium leading-snug text-[#faf9f6] ${index === 0
                      ? "sticky left-0 z-20 w-[190px] min-w-[190px] border-r border-[#ababab]/20 bg-[#222222]"
                      : "min-w-[134px]"
                    }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {benchmarkRows.map(([portal, ...values]) => (
              <tr key={portal} className="transition-colors duration-200 hover:bg-[#ffffff]/[0.035]">
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-b border-r border-[#ababab]/20 border-b-[#ababab]/30 bg-[#1c1c1c] px-4 py-4 text-left 	font-['Satoshi_Variable'] font-normal font-medium text-[#c4c4c4]"
                >
                  {portal}
                </th>

                {values.map((value, index) => (
                  <td
                    key={`${portal}-${columns[index + 1]}`}
                    className="border-b border-[#ababab]/30 px-4 py-4 align-middle"
                  >
                    <img
                      className="size-5 sm:size-6"
                      src={`${assetPathPrefix}/${value ? "bbbdb.svg" : "4ad9b.svg"}`}
                      alt={value ? "Disponível" : "Indisponível"}
                      loading="lazy"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .benchmark-scroll {
          scrollbar-width: thin;
          scrollbar-color: #777 #262626;
          -webkit-overflow-scrolling: touch;
        }
        .benchmark-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .benchmark-scroll::-webkit-scrollbar-track {
          background: #262626;
        }
        .benchmark-scroll::-webkit-scrollbar-thumb {
          background: #666;
          border-radius: 999px;
          border: 1px solid #262626;
        }
        .benchmark-scroll::-webkit-scrollbar-thumb:hover {
          background: #ababab;
        }
        .benchmark-scroll:focus-visible {
          outline: 1px solid #ababab;
          outline-offset: 3px;
        }
      `}</style>
    </section>
  )
}
