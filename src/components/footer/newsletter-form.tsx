"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterInscr } from "@/utils/actions";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="mt-4 flex flex-wrap gap-x-4 gap-y-2 items-start md:items-center"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!formData.get("email")) {
          toast.error("Veuillez entrer une adresse e-mail valide.");
          return;
        }

        setLoading(true);

        try {
          const result = await newsletterInscr(formData);

          if (result.result === "success") {
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        } catch (error) {
          console.error("Error during newsletter signup:", error);
          toast.error("Une erreur s'est produite lors de l'inscription.");
        } finally {
          setLoading(false);
        }
      }}
    >
      <Input
        type="email"
        name="email"
        id="email"
        autoComplete="email"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
        aria-label="Adresse e-mail"
        aria-required="true"
        aria-invalid="false"
        aria-describedby="email-description"
        aria-errormessage="email-error"
        placeholder="Votre adresse e-mail"
        required
        className="max-w-xl"
      />
      <Button
        variant="default"
        type="submit"
        disabled={loading}
        aria-busy={loading}
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="all"
        aria-describedby="newsletter-description"
        aria-label="S'inscrire à la newsletter"
        aria-pressed="false"
        aria-expanded="false"
        aria-controls="newsletter-controls"
        aria-haspopup="false"
        title="S'inscrire à la newsletter"
        role="button"
      >
        {loading && <Loader className="animate-spin" />}
        S&apos;inscrire
      </Button>
    </form>
  );
}
