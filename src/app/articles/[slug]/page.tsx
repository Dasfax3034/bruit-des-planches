import Script from "next/script";
import { redirect } from "next/navigation";
import ShareButton from "@/components/share-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMarkup, getAllArticles } from "@/lib/content";
import type { Metadata, ResolvingMetadata } from "next";
import { BlogPosting, WithContext, BreadcrumbList } from "schema-dts";

export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = getAllArticles("src/content/articles");
  return articles.map((article) => ({ slug: article.slug }));
}

const extractImagePaths = (html: string): string[] => {
  const regex =
    /<img[^>]+src="(https:\/\/[^/]+\/storage\/v1\/object\/public\/posts-images\/[^">]+)"/g;
  let match;
  const paths: string[] = [];
  while ((match = regex.exec(html)) !== null) {
    paths.push(match[1]);
  }
  return paths;
};

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const article: {
    title?: string;
    content?: string;
    date?: string;
    created_at?: string;
    updated_at?: string;
    category?: string;
    thumbnail?: string;
  } | null = getMarkup("src/content/articles", slug);

  if (!article) {
    return {
      title: "Article non trouvé",
      description:
        "L'article que vous cherchez n'existe pas ou n'est pas publié.",
    };
  }

  const previousImages = (await parent)?.openGraph?.images || [];
  const plainText = article?.content?.replace(/<[^>]+>/g, "");
  const lines = plainText
    ?.split(/\r?\n/)
    .filter((line: string) => line.trim() !== "");
  const limitedText = lines?.slice(0, 3).join(" ");

  return {
    title: article?.title,
    description: limitedText,
    keywords: [
      "blog",
      "article",
      article?.title ?? "Article",
      "théâtre",
      "Le Bruit Des Planches",
      "festivals",
      "spectacles",
      "Avignon",
      "festival d'Avignon",
      "théâtre contemporain",
      "critique théâtrale",
    ],
    applicationName: "Le Bruit Des Planches",
    alternates: {
      canonical: `https://bruit-des-planches.com/articles/${slug}`,
    },
    openGraph: {
      title: article?.title,
      description: limitedText,
      url: `https://bruit-des-planches.com/articles/${slug}`,
      type: "article",
      publishedTime: new Date(article.date ?? Date.now()).toISOString(),
      modifiedTime: new Date(article.date ?? Date.now()).toISOString(),
      images: [...previousImages, ...extractImagePaths(article.content || "")],
    },
    twitter: {
      title: article.title,
      description: limitedText,
      card: "summary_large_image",
      images: [...previousImages, ...extractImagePaths(article.content || "")],
    },
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article: {
    title?: string;
    content?: string;
    date?: string;
    created_at?: string;
    updated_at?: string;
    category?: string;
    thumbnail?: string;
  } | null = getMarkup("src/content/articles", slug);

  if (!article) {
    redirect("/not-found");
  }

  const plainText = article.content?.replace(/<[^>]+>/g, "");
  const lines = plainText?.split(/\r?\n/).filter((line) => line.trim() !== "");
  const limitedText = lines?.slice(0, 3).join(" ");
  const imagePaths = extractImagePaths(article.content || "");

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: limitedText,
    datePublished: new Date(article.created_at ?? Date.now()).toISOString(),
    dateModified: new Date(article.updated_at ?? Date.now()).toISOString(),
    author: {
      "@type": "Person",
      name: "Zlabia Zlabiette",
      url: "https://bruit-des-planches.com/a-propos",
    },
    image: imagePaths,
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Blog",
        item: "https://bruit-des-planches.com/articles",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: article.category,
        item:
          "https://bruit-des-planches.com/articles?category=" +
          article.category,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
      },
    ],
  };

  return (
    <main className="w-full pt-24 pb-8 px-4 md:px-6 lg:px-16 xl:px-20 flex flex-col gap-8">
      <Script
        id="schema-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="schema-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* En-tête de l'article */}
      <section className="scroll-mt-28">
        <h1 className="text-4xl md:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight">
          {article.title}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <p className="text-sm md:text-base text-muted-foreground">
            <span className="flex items-center gap-2">
              Posté par{" "}
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="/team/zlabia-zlabiette.webp"
                  alt="Zlabia Zlabiette"
                />
                <AvatarFallback>ZZ</AvatarFallback>
              </Avatar>
              Zlabia Zlabiette
            </span>
            <time
              dateTime={new Date(
                article.updated_at ?? Date.now()
              ).toISOString()}
              className="mt-1 md:mt-0"
            >
              {new Date(article.updated_at ?? Date.now()).toLocaleDateString(
                "fr-FR"
              )}
            </time>
          </p>
          <ShareButton
            title={article.title || "Article"}
            text="Découvrez cet article passionnant par Le Bruit Des Planches."
          />
        </div>
      </section>
      {/* Contenu de l'article */}
      <article
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: article.content || "" }}
      />
    </main>
  );
}
