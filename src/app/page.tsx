import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllArticles } from "@/lib/content";
import { MoveUpRight } from "lucide-react";

export default function HomePage() {
  const articles = getAllArticles("src/content/articles").slice(0, 5);

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto md:px-6 pt-10">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold">Le Bruit Des Planches</h1>
        <p className="text-base  max-w-2xl">
          Bienvenue sur un espace dédié à toutes les voix du théâtre : artistes,
          spectateurs, passionné·es ou curieux·ses. Ce site veut porter une
          parole libre sur la scène contemporaine.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Notre manifeste</h2>
        <p className="text-base max-w-3xl">
          Le Bruit Des Planches n’est pas une revue comme les autres. Ici, on
          écrit sur le théâtre parce qu’il nous remue, parce qu’il nous
          questionne. Pas de vernis académique, pas de langue de bois. Des
          billets francs, des critiques sensibles, des réflexions vivantes.
        </p>
        <p className="text-base max-w-3xl">
          Nous croyons qu’il est temps de faire entendre d’autres voix : jeunes,
          plurielles, affûtées. Ce site est un lieu de partage, d’exigence et de
          confrontation joyeuse.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">À lire en ce moment</h2>
        <ul className="space-y-2">
          {articles.length > 0 ? (
            articles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/articles/${article.slug}`}
                  aria-label={article.title}
                  title={article.title}
                >
                  <Button
                    variant="link"
                    className="p-0 h-auto text-left text-primary font-medium"
                    aria-label={article.title}
                  >
                    {article.title}{" "}
                    <span className="text-muted-foreground">
                      – {article.date}
                    </span>
                  </Button>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground text-sm">
              Aucun article disponible pour le moment.
            </li>
          )}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">En savoir plus</h2>
        <p className="text-base max-w-2xl">
          Pour découvrir notre démarche, nos envies, ou simplement poser une
          question, rendez-vous sur notre page FAQ.
        </p>
        <Link
          href="/foire-aux-questions"
          aria-label="Foire aux questions"
          title="Foire aux questions"
        >
          <Button variant="default" className="flex items-center gap-2">
            Foire aux questions <MoveUpRight />
          </Button>
        </Link>
      </section>
    </div>
  );
}
