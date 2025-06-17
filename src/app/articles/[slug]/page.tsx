export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // This is a dynamic route that captures the slug
  const { slug } = await params;

  return <h1>Article: {slug}</h1>;
}
