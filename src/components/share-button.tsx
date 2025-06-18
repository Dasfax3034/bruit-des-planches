"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default function ShareButton({
  url,
  title,
  text,
  className,
  variant,
}: {
  url?: string;
  title: string;
  text: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Button
      variant={variant ?? "outline"}
      size={"icon"}
      aria-label="Partager"
      className={className}
      data-tooltip-id="share-tooltip"
      data-tooltip-content="Partager"
      title="Partager"
      onClick={() => {
        if (navigator?.share) {
          navigator
            .share({
              title: title,
              text: text,
              url: url ?? window.location.href,
            })
            .catch((error) => console.error("Erreur lors du partage:", error));
        } else {
          // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
          toast.error("Partage non supporté sur ce navigateur.");
        }
      }}
    >
      <span className="sr-only">Partager</span>
      <Share2 />
    </Button>
  );
}
