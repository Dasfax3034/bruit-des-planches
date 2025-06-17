import { Separator } from "@/components/ui/separator";
import NewsletterForm from "@/components/footer/newsletter-form";

export default function Newsletter() {
  return (
    <section className="flex flex-col w-full px-4 md:px-6 lg:px-16 xl:px-20">
      <Separator className="mb-4" />

      <h2 className="text-3xl font-bold">Inscrivez-vous à notre newsletter</h2>
      <p className="text-muted-foreground">
        Recevez les dernières nouvelles, articles et mises à jour directement
        dans votre boîte de réception.
      </p>
      <NewsletterForm />
    </section>
  );
}
