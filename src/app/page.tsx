import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllArticles } from "@/lib/content";

export default function HomePage() {
  const articles = getAllArticles("src/content/articles").slice(0, 5);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">Le Bruit Des Planches</h1>
        <p className="text-base text-muted-foreground">
          Théâtre, critique, opinion — direct et sans détour.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Pourquoi ce site</h2>
        <p className="text-sm">
          Un espace pour parler théâtre différemment. Libre, net, engagé.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">À lire maintenant</h2>
        <ul className="space-y-1 list-none">
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
                    className="p-0 h-auto text-left"
                    aria-label={article.title}
                  >
                    {article.title} – {article.date}
                  </Button>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-muted-foreground text-sm">
              Aucun article disponible.
            </li>
          )}
        </ul>
      </section>

      <section>
        <Link
          href="/foire-aux-questions"
          aria-label="Foire aux questions"
          title="Foire aux questions"
        >
          <Button variant="default">En savoir plus</Button>
        </Link>
      </section>
    </div>
  );
}
