type SectionProps = {
  number: number
  title: string
  children: React.ReactNode
}

export function Section({ number, title, children }: SectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">
        {number}. {title}
      </h2>

      <div className="pl-1">
        {children}
      </div>
    </section>
  )
}
