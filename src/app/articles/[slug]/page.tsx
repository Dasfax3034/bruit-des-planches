import Script from "next/script";
import { getMarkup } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // This is a dynamic route that captures the slug
  const { slug } = await params;

  console.log("Article slug:", slug);

  const hero = getMarkup("src/content/homepage", "lets-party.md");

  if (!hero) {
    return null;
  }

  const { data } = hero;

  return (
    <>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <main>
        <div className="mt-10 flex flex-col items-center">
          <h1 className="text-2xl">{data.title}</h1>
          <p className="text-lg">{data.thumbnail}</p>
          <Button>{data.rating}</Button>
        </div>
      </main>
    </>
  );
}
