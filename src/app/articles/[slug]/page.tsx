export default function ArticlePage({ params }: { params: { slug: string } }) {
  // This is a dynamic route that captures the slug
  const { slug } = params;

  return <h1>Article: {slug}</h1>;
}
