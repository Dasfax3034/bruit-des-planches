import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function FooterLink({
  href,
  label,
  title,
}: {
  href: string;
  label: string;
  title: string;
}) {
  return (
    <Link href={href} aria-label={label} title={title} passHref>
      <Button
        variant={"link"}
        className="p-0 h-auto"
        aria-label={label}
        title={title}
      >
        {label}
      </Button>
    </Link>
  );
}

export default async function Footer() {
  const navigationLinks = [
    { href: "/", label: "Accueil", title: "Accueil" },
    {
      href: "/articles",
      label: "Articles",
      title: "Articles",
    },
    {
      href: "/foire-aux-questions",
      label: "FAQ",
      title: "Foire aux Questions",
    },
    { href: "/contact", label: "Contact", title: "Contact" },
    {
      href: "mailto:zlabia.zlabiette@gmail.com",
      label: "Email : zlabia.zlabiette@gmail.com",
      title: "Email",
    },
  ];

  return (
    <footer className="px-4 md:px-6 lg:px-16 xl:px-20 pt-6 w-full">
      <Separator className="mb-4" />

      <div className="flex flex-wrap gap-4 md:gap-x-16 mb-4 justify-between w-full">
        {navigationLinks.map(({ href, label, title }) => (
          <FooterLink key={href} href={href} label={label} title={title} />
        ))}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-center mb-4 px-2">
        <p className="text-sm">
          © 2025 Le Bruit Des Planches. Tous droits réservés. Fait par{" "}
          <FooterLink href="#" label="Yassine Nemer" title="Yassine Nemer" />
        </p>
        <ThemeToggle />
      </div>
    </footer>
  );
}
