import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText, ListTodo, Download } from "lucide-react";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="max-w-3xl text-center space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/icon.svg"
            alt="SpecBuilder Logo"
            width={80}
            height={80}
            className="rounded-2xl shadow-xl shadow-primary/20"
          />
        </div>

        {/* Titre et sous-titre */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Votre Cahier des Charges <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Généré en un Instant
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            La plateforme simple et efficace pour les étudiants en génie logiciel.
            Structurez vos projets techniques sans perdre de temps sur la mise en forme.
          </p>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all">
            <Link href="/dashboard">
              {user ? "Accéder à mon espace" : "Commencer gratuitement"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Étapes simples */}
        <div className="grid sm:grid-cols-2 gap-8 pt-12 border-t border-border/40 max-w-2xl mx-auto">
          <StepCard
            icon={<ListTodo className="w-6 h-6 text-primary" />}
            title="1. Créez votre projet"
            description="Définissez simplement votre idée, ses objectifs et ses fonctionnalités."
          />
          <StepCard
            icon={<Download className="w-6 h-6 text-primary" />}
            title="2. Exportez le document"
            description="Obtenez instantanément votre cahier des charges complet en PDF."
          />
        </div>
      </div>
    </main>
  );
}

function StepCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center p-4 space-y-3 rounded-xl hover:bg-muted/50 transition-colors">
      <div className="p-3 bg-primary/10 rounded-full">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
