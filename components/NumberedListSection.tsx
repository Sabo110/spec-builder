export default function NumberedListSection({
    sectionNumber,
    title,
    items,
}: {
    sectionNumber: number
    title: string
    items: string[]
}) {
    return (
        <section className="space-y-4">
            {/* Titre de la section avec badge numéroté */}
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {sectionNumber}
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>

            {/* Liste des items avec bordure à gauche */}
            <div className="space-y-3 pl-4 border-l-4 border-primary/20 ml-4">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-3 group">
                        <span className="font-semibold text-primary min-w-[3rem] text-sm">
                            {sectionNumber}.{index + 1}
                        </span>
                        <p className="text-muted-foreground leading-relaxed flex-1">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
