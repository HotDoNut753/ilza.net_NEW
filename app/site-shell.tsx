import Link from "next/link";
import { ContactForm } from "./contact-form";
import { navigation } from "./site-data";

export function OriginalLogo({ footer = false }: { footer?: boolean }) {
  return (
    <span
      aria-label="Iłża.Net — blisko Ciebie"
      className={`originalLogo${footer ? " originalLogoFooter" : ""}`}
      role="img"
    />
  );
}

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <Link className="brandLink" href="/" aria-label="Iłża.Net — strona główna">
        <OriginalLogo />
      </Link>

      <nav className="desktopNav" aria-label="Główna nawigacja">
        {navigation.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <a className="headerPhone" href="tel:+48882564615">
        <small>Główny numer</small>
        882 564 615
      </a>

      <details className="mobileMenu">
        <summary aria-label="Otwórz menu">
          <span />
          <span />
          <span />
        </summary>
        <nav aria-label="Menu mobilne">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <a href="tel:+48882564615">Zadzwoń: 882 564 615</a>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerMain">
        <Link href="/" aria-label="Iłża.Net — strona główna">
          <OriginalLogo footer />
        </Link>
        <p>
          Lokalny Internet, serwis i bezpośrednie wsparcie dla Iłży oraz
          okolic.
        </p>
        <nav aria-label="Nawigacja w stopce">
          {navigation.slice(1).map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footerBottom">
        <p>
          © 2026 Iłża.Net · GTR Systemy Karol Góralski
          <span className="footerCredit">Projekt i realizacja: Kacper</span>
        </p>
        <p>
          NIP 796-235-20-42 · REGON 673003980 · Rejestr operatorów
          telekomunikacyjnych nr 6018
        </p>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <section className="pageHero">
      <div className="pageHeroGlow" aria-hidden="true" />
      <div className="pageHeroInner">
        <p className="eyebrow lightEyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="pageLead">{intro}</p>
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="contactBand">
      <div>
        <p className="eyebrow lightEyebrow">Napisz do nas</p>
        <h2>Sprawdzimy adres i oddzwonimy.</h2>
        <p className="contactBandLead">
          Zostaw dane kontaktowe i krótko opisz, czego potrzebujesz.
        </p>
      </div>
      <ContactForm compact />
    </section>
  );
}
