import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Newsletter from "@/components/footer/newsletter";

export const metadata: Metadata = {
  title: "Le Bruit des Planches",
  description: "Un blog sur le théatre et la scène.npm install next-themes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-20 pb-8 px-4 md:px-6 lg:px-16 xl:px-20">{children}</main>
          <Newsletter />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
