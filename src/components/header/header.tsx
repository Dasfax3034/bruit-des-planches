import Link from "next/link";
import ScrollEffectWrapper from "@/components/header/scroll-effect-wrapper";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import MobileMenu from "@/components/header/mobile-menu";
import { allPages } from "@/lib/all-pages";
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <ScrollEffectWrapper>
      <nav
        className={
          "flex justify-between items-center h-full px-4 md:px-6 lg:px-16 xl:px-20"
        }
      >
        <Link
          href="/"
          passHref
          aria-label="Accueil"
          title="Accueil"
          className="text-xl md:text-2xl font-bold tracking-wide hover:text-muted-foreground transition-colors"
        >
          Le Bruit des Planches
        </Link>
        <NavigationMenu className="md:flex hidden">
          <NavigationMenuList>
          
            {allPages.map(({ href, label }) => (
              <NavigationMenuItem
                key={href}
                className="bg-transparent hover:bg-transparent"
              >
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-transparent hover:underline bg-transparent"
                  )}
                  href={href}
                  aria-label={label}
                  title={label}
                >
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <MobileMenu />
      </nav>
    </ScrollEffectWrapper>
  );
}
