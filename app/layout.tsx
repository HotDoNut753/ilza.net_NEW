import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "./site-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://ilza.net"),
  title: {
    default: "Iłża.Net — Internet dla Iłży i okolic",
    template: "%s | Iłża.Net",
  },
  description:
    "Lokalny Internet dla domu i firmy, serwis oraz bezpośrednie wsparcie techniczne w Iłży i okolicach.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Iłża.Net",
    title: "Iłża.Net — Internet naprawdę blisko",
    description:
      "Lokalny Internet, szybka pomoc i bezpośredni kontakt. Sprawdź dostępność pod swoim adresem.",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Iłża.Net — Internet naprawdę blisko",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iłża.Net — Internet naprawdę blisko",
    description:
      "Internet dla domu i firmy w Iłży i okolicach. Sprawdź dostępność.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#063e50",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <a className="mobileCallButton" href="tel:+48882564615">
          <span>Zadzwoń</span>
          882 564 615
        </a>
      </body>
    </html>
  );
}
