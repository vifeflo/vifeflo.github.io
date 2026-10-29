import AnimatedNumber from "./animatedNumber"

type StatGridProps = {
  items: ReadonlyArray<readonly [string, string]>
}

export default function StatGrid({ items }: StatGridProps) {
  return (
    <div className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {items.map(([value, label]) => (
        <div
          key={value + label}
          className="bg-gradient-to-b from-[#242424] to-[#262626] p-3 shadow-[0_4px_4px_rgba(0,0,0,0.12)]"
        >
          <p className="font-['Satoshi_Variable:Regular'] text-xl font-medium text-[#faf9f6]">
            <AnimatedNumber value={value} />
          </p>

          <p className="leading-[27px]">{label}</p>
        </div>
      ))}
    </div>
  )
}