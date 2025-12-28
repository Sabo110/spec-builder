type NumberedListProps = {
  sectionNumber: number
  items: string[]
}

export function NumberedList({
  sectionNumber,
  items,
}: NumberedListProps) {
  return (
    <div className="space-y-1 ml-6">
      {items.map((item, index) => (
        <p key={index}>
          {sectionNumber}.{index + 1} {item}
        </p>
      ))}
    </div>
  )
}
