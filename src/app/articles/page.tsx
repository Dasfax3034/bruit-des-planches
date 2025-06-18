import Link from "next/link";
import Script from "next/script";
import { getAllArticles } from "@/lib/content";
import { Metadata } from "next";
import { ItemList, WithContext, BreadcrumbList } from "schema-dts";

export const metadata: Metadata = {
  title: {
    default: "Blog - Le Bruit Des Planches",
    template: "%s | Le Bruit Des Planches",
  },
  description:
    "Découvrez nos articles dédiés au monde artistique et théâtral. Plongez dans nos analyses, conseils et actualités.",
  keywords: ["blog", "article", "théâtre", "Le Bruit Des Planches"],
  applicationName: "Le Bruit Des Planches",
  alternates: {
    canonical: "https://bruit-des-planches.com/articles",
  },
  openGraph: {
    title: "Blog - Le Bruit Des Planches",
    description:
      "Découvrez nos articles dédiés au monde artistique et théâtral. Plongez dans nos analyses, conseils et actualités.",
    url: "https://bruit-des-planches.com/articles",
    type: "website",
    locale: "fr_FR",
    siteName: "Le Bruit Des Planches",
  },
};

export default async function ArticlesPage() {
  const articles = getAllArticles("src/content/articles");

  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
      },
    ],
  };

  const jsonLdArticles: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "BlogPosting",
      position: index + 1,
      headline: article.title,
      image: article.thumbnail,
      description: article.body?.slice(0, 150),
      url: `https://bruit-des-planches.com/articles/${article.slug}`,
      datePublished: new Date(article.date ?? "").toISOString(),
      dateModified: new Date(article.date ?? "").toISOString(),
      author: {
        "@type": "Person",
        name: "Zlabia Zlabiette",
      },
      publisher: {
        "@type": "Organization",
        name: "Le Bruit Des Planches",
      },
      articleSection: article.category,
    })),
    itemListOrder: "ascending",
  };

  return (
    <>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <Script
        id="schema-articles-thumbnail"
        key="schema-articles-thumbnail"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="schema-articles"
        key="schema-articles"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticles) }}
      />
      <section className="scroll-mt-28">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          Blog
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          Plongez dans notre univers artistique et découvrez des articles
          passionnants sur le théâtre et la scène.
        </p>
        {articles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                passHref
              >
                <a className="block p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
                  <h2 className="text-2xl font-semibold mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm mb-1">
                    {new Date(article.date ?? "").toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-base line-clamp-3">{article.body}</p>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground mt-8">
            Aucun article n&apos;a encore été publié. Revenez plus tard !
          </p>
        )}
      </section>
    </>
  );
}
