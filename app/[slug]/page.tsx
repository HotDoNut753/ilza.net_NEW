import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  coveragePlaces,
  news,
  packages,
  regulationSections,
} from "../site-data";
import { ContactBand, PageHero } from "../site-shell";

const pageMeta = {
  aktualnosci: {
    title: "Aktualności",
    description: "Komunikaty i wydarzenia Iłża.Net z lat 2009–2014.",
  },
  "jak-kupic": {
    title: "Jak kupić",
    description: "Jak zamówić usługę Iłża.Net telefonicznie lub w biurze.",
  },
  wsparcie: {
    title: "Wsparcie techniczne",
    description: "Zasady lokalnego wsparcia technicznego Iłża.Net.",
  },
  zasieg: {
    title: "Zasięg",
    description: "Obszar działania sieci Iłża.Net i sprawdzanie dostępności.",
  },
  cennik: {
    title: "Cennik",
    description: "Pakiety i ceny usług Iłża.Net AirFiber.",
  },
  kontakt: {
    title: "Kontakt",
    description: "Dane kontaktowe i firmowe GTR Systemy — Iłża.Net.",
  },
  regulamin: {
    title: "Regulamin",
    description: "Regulamin świadczenia usług sieci Iłża.Net.",
  },
  "o-nas": {
    title: "Kim jesteśmy",
    description: "Historia sieci Iłża.Net i jej twórców.",
  },
} as const;

type Slug = keyof typeof pageMeta;

export function generateStaticParams() {
  return Object.keys(pageMeta).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const current = pageMeta[slug as Slug];
  if (!current) return {};

  return {
    title: current.title,
    description: current.description,
    alternates: { canonical: `/${slug}` },
  };
}

function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Aktualności 2009–2014"
        title="Aktualności Iłża.Net"
        intro="Informacje o rozwoju zasięgu, nowych technologiach, wydarzeniach i pracach serwisowych."
      />
      <section className="contentSection">
        <div className="contentHeading">
          <p className="eyebrow">30 wpisów</p>
          <h2>Historia sieci zapisana komunikatami.</h2>
          <p>
            Najważniejsze informacje z kolejnych lat działalności Iłża.Net.
          </p>
        </div>
        <div className="newsArchive">
          {news.map((item) => (
            <article className="archiveNewsCard" key={`${item.date}-${item.title}`}>
              <time dateTime={item.date}>{item.date}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function HowToBuyPage() {
  return (
    <>
      <PageHero
        eyebrow="Jak kupić?"
        title="Zamówienie jest proste."
        intro="Wybierz wygodny sposób kontaktu. Sprawdzimy adres, dostępne możliwości techniczne i ustalimy dalsze kroki."
      />
      <section className="contentSection">
        <div className="twoColumnFeature">
          <article className="featurePanel featurePanelAccent">
            <span className="featureNumber">01</span>
            <p className="eyebrow lightEyebrow">Główny numer</p>
            <h2>882 564 615</h2>
            <p>Zadzwoń, aby zamówić usługę lub zapytać o ofertę.</p>
            <a className="button buttonLight" href="tel:+48882564615">
              Zadzwoń teraz
            </a>
          </article>
          <article className="featurePanel">
            <span className="featureNumber">02</span>
            <p className="eyebrow">Osobiście</p>
            <h2>Media Serwis</h2>
            <address>
              Rynek 12
              <br />
              27-100 Iłża
            </address>
            <div className="detailRows">
              <p>
                <span>Poniedziałek–piątek</span>
                <strong>8:30–15:00</strong>
              </p>
              <p>
                <span>Główny numer</span>
                <strong>882 564 615</strong>
              </p>
            </div>
          </article>
        </div>
        <aside className="editorNote">
          <strong>Serwis techniczny</strong>
          <p>
            Pomoc działa 7 dni w tygodniu od 7:00 do 22:00 pod numerem
            666 300 786.
          </p>
        </aside>
      </section>
      <ContactBand />
    </>
  );
}

function SupportPage() {
  const silver = [
    "wsparcie przez 7 dni w tygodniu, w godzinach 7:00–22:00",
    "obsługa wszystkich zgłoszeń w systemie CRM",
    "12-godzinny czas reakcji w przypadku krytycznych usterek i braku usług",
    "wsparcie kompetentnych inżynierów",
  ];
  const gold = [
    "całodobowe wsparcie przez 7 dni w tygodniu, 365 dni w roku",
    "obsługa zgłoszeń w systemie CRM i zachowanie ich historii",
    "gotowość do pracy z 4-godzinnym czasem reakcji",
    "dokumentacja sprzętu, oprogramowania i sieci",
    "wdrożenie oraz utrzymanie polityki bezpieczeństwa",
    "szkolenia pracowników w zakresie bezpieczeństwa",
    "wdrożenie systemu ochrony danych i kopii bezpieczeństwa",
    "administracja systemami firewall oraz proxy aplikacyjnym",
    "wsparcie inżynierów z doświadczeniem projektowym potwierdzonym certyfikatami",
  ];

  return (
    <>
      <PageHero
        eyebrow="Pomoc 7 dni w tygodniu"
        title="Wsparcie techniczne blisko Ciebie."
        intro="Lokalna obsługa była jednym z najważniejszych wyróżników Iłża.Net. Zespół pozostaje do dyspozycji od 7:00 do 22:00."
      />
      <section className="contentSection">
        <div className="contentHeading contentHeadingWide">
          <p className="eyebrow">Jakość klasy enterprise</p>
          <h2>Pomoc znana z dużych firm — dostępna lokalnie.</h2>
          <p>
            Na terenie gmin Iłża i Mirzec Iłża.Net wyróżnia bezpośrednia
            obsługa klienta. W pakietach usług użytkownik otrzymuje wsparcie,
            które wcześniej było spotykane głównie na rynku enterprise.
          </p>
          <a className="inlinePhone" href="tel:+48666300786">
            Pomoc techniczna: 48 666 300 786
          </a>
        </div>
        <div className="supportLevels">
          <article className="supportLevel silverLevel">
            <p className="eyebrow">Dla wszystkich klientów</p>
            <h2>Poziom Srebrny</h2>
            <p>
              Standardowy poziom wsparcia, którym objęci są wszyscy klienci
              Iłża.Net.
            </p>
            <ul className="checkList">
              {silver.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="supportLevel goldLevel">
            <p className="eyebrow lightEyebrow">Dla małych i średnich firm</p>
            <h2>Poziom Złoty</h2>
            <p>
              Opieka nad systemami, od których zależy działalność firmy. Oferta
              jest dostępna także dla podmiotów niebędących abonentami
              Iłża.Net.
            </p>
            <ul className="checkList lightCheckList">
              {gold.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link className="button buttonPrimary" href="/kontakt">
              Poproś o ofertę dla firmy
            </Link>
          </article>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function CoverageMap() {
  return (
    <div className="modernCoverageMap">
      <Image
        alt="Mapa zasięgu sieci Iłża.Net w Iłży i okolicznych miejscowościach"
        className="coverageMapImage"
        height={594}
        priority
        src="/mapa-zasiegu-ilza-net.png"
        width={1024}
      />
      <div className="mapLegend">
        <strong>Dokładny zasięg potwierdzamy po adresie</strong>
      </div>
    </div>
  );
}

function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Zasięg sieci"
        title="Tu mamy zasięg."
        intro="Działamy w Iłży i dziesiątkach okolicznych miejscowości. Dokładną dostępność zawsze potwierdzamy dla konkretnego adresu."
      />
      <section className="contentSection">
        <CoverageMap />
        <div className="coverageOverview">
          <div>
            <p className="eyebrow">Jesteśmy tutaj</p>
            <h2>Obszar działania naszej sieci.</h2>
            <p>
              Dostępność zależy od dokładnego adresu, widoczności radiowej i
              możliwości technicznych. Zadzwoń lub wyślij formularz, abyśmy
              mogli sprawdzić Twoją lokalizację.
            </p>
          </div>
          <div className="coverageMetric">
            <strong>{coveragePlaces.length}</strong>
            <span>nazw miejscowości i obszarów</span>
          </div>
        </div>
        <div className="placeCloud">
          {coveragePlaces.map((place) => (
            <span key={place}>{place}</span>
          ))}
        </div>
        <div className="addressCheck">
          <div>
            <p className="eyebrow lightEyebrow">Aktualny zasięg</p>
            <h2>Podaj dokładny adres.</h2>
            <p>
              Sprawdzimy warunki i odpowiemy, czy oraz w jakiej technologii
              możemy wykonać przyłącze.
            </p>
          </div>
          <div className="addressCheckActions">
            <a className="button buttonPrimary" href="tel:+48882564615">
              Zadzwoń: 882 564 615
            </a>
            <a
              className="button buttonGhost"
              href="mailto:biuro@ilza.net?subject=Sprawdzenie%20zasięgu%20Iłża.Net"
            >
              Wyślij adres e-mailem
            </a>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function PricePage() {
  return (
    <>
      <PageHero
        eyebrow="Oferta AirFiber"
        title="Wybierz pakiet dla siebie."
        intro="Symetryczne pakiety AirFiber — taka sama prędkość pobierania i wysyłania, lokalny serwis oraz instalacja za 1 zł."
      />
      <section className="contentSection">
        <div className="contentHeading contentHeadingWide">
          <p className="eyebrow">Internet Iłża.Net</p>
          <h2>Prosty wybór. Bez ukrywania konkretów.</h2>
          <p>
            AirFiber opiera się na technologii firmy Ubiquiti. Dostępność
            poszczególnych pakietów potwierdzamy po sprawdzeniu adresu.
          </p>
        </div>
        <div className="priceCards">
          {packages.map((item, index) => (
            <article
              className={`priceCard${index === 3 ? " priceCardFeatured" : ""}`}
              key={item.name}
            >
              {index === 3 && <span className="priceBadge">Polecany</span>}
              <p>Iłża.Net</p>
              <h3>{item.name}</h3>
              <div className="speedValue">
                <strong>{item.speed.split(" / ")[0]}</strong>
                <span>Mbps</span>
              </div>
              <div className="symmetryLabel">
                <span aria-hidden="true">↕</span>
                download / upload {item.speed}
              </div>
              <div className="priceValue">
                <strong>{item.price.replace(" zł", "")}</strong>
                <span>zł / miesiąc</span>
              </div>
              <ul>
                <li>symetryczne łącze</li>
                <li>instalacja {item.installation}</li>
                <li>lokalny serwis</li>
              </ul>
              <a href="tel:+48882564615">
                Wybieram pakiet <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
        <div className="additionalServices">
          <div>
            <p className="eyebrow">Usługi dodatkowe</p>
            <h2>Poza abonamentem.</h2>
          </div>
          <dl>
            <div>
              <dt>Publiczny adres IP</dt>
              <dd>bez opłat</dd>
            </div>
            <div>
              <dt>Usługa serwisowa</dt>
              <dd>73,20 zł / godz.</dd>
            </div>
            <div>
              <dt>Dojazd poza teren Iłży</dt>
              <dd>30 zł</dd>
            </div>
          </dl>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Jesteśmy w Iłży. Odezwij się bezpośrednio."
        intro="Główny numer, serwis techniczny, e-mail, dane firmy i aktualny adres w jednym miejscu."
      />
      <section className="contentSection">
        <div className="contactTiles">
          <a className="contactTile contactTileAccent" href="tel:+48882564615">
            <span>Główny numer</span>
            <strong>882 564 615</strong>
            <small>Zamówienia i informacje</small>
          </a>
          <a className="contactTile" href="tel:+48666300786">
            <span>Serwis techniczny</span>
            <strong>666 300 786</strong>
            <small>7 dni w tygodniu · 7:00–22:00</small>
          </a>
          <a className="contactTile" href="mailto:biuro@ilza.net">
            <span>E-mail</span>
            <strong>biuro@ilza.net</strong>
            <small>Napisz do nas</small>
          </a>
          <div className="contactTile">
            <span>Skype</span>
            <strong>ilza.net.serwis</strong>
            <small>Kontakt przez Skype</small>
          </div>
        </div>
        <div className="companyGrid">
          <article className="companyCard">
            <p className="eyebrow">Dane firmy</p>
            <h2>GTR Systemy Karol Góralski</h2>
            <address>
              Rynek 12
              <br />
              27-100 Iłża
            </address>
            <dl>
              <div>
                <dt>NIP</dt>
                <dd>796-235-20-42</dd>
              </div>
              <div>
                <dt>REGON</dt>
                <dd>673003980</dd>
              </div>
              <div>
                <dt>Rejestr operatorów telekomunikacyjnych</dt>
                <dd>nr 6018</dd>
              </div>
            </dl>
          </article>
          <article className="companyCard companyCardDark">
            <p className="eyebrow lightEyebrow">Biuro i sklep</p>
            <h2>Media Serwis</h2>
            <address>
              Rynek 12
              <br />
              27-100 Iłża
            </address>
            <p className="officeHours">
              <span>Poniedziałek–piątek</span>
              <strong>8:30–15:00</strong>
            </p>
            <a
              className="button buttonPrimary"
              href="https://www.google.com/maps/search/?api=1&query=Rynek+12+Iłża"
              target="_blank"
              rel="noreferrer"
            >
              Wyznacz trasę
            </a>
          </article>
        </div>
        <div className="bankPanel">
          <div>
            <p className="eyebrow">Konto bankowe</p>
            <h2>mBank</h2>
          </div>
          <strong>64 1140 2004 0000 3902 4654 1730</strong>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Kim jesteśmy"
        title="Sieć zbudowana z pasji do techniki."
        intro="Iłża.Net zaczęła się od wspólnej gry i wymiany plików. Z czasem lokalna inicjatywa zmieniła się w firmę obsługującą blisko tysiąc gospodarstw."
      />
      <section className="contentSection">
        <div className="storyGrid">
          <div className="storyLead">
            <p className="eyebrow">Od „domkinetu” do operatora</p>
            <h2>Zaczęło się od kilku komputerów.</h2>
          </div>
          <div className="richText">
            <p>
              Sieć Iłża.Net powstała z pasji do technologii komputerowych i
              techniki. Początkowo była spontaniczną inicjatywą kilku młodych
              ludzi, nazywaną „domkinetem”. Chodziło o dobrą zabawę — wspólną
              grę w sieci składającej się z kilku komputerów i możliwość
              wymiany plików.
            </p>
            <p>
              W ciągu czterech lat, z inicjatywy Rafała Goździa i Karola
              Góralskiego, pomysł zmienił się w sprawnie działającą firmę
              świadczącą usługi dostępu do Internetu na terenie gmin Iłża i
              Mirzec dla blisko tysiąca gospodarstw domowych.
            </p>
          </div>
        </div>
        <div className="founderGrid">
          <article className="founderCard">
            <span className="founderInitials">RG</span>
            <p className="eyebrow">Współtwórca sieci</p>
            <h2>Rafał Góźdź</h2>
            <p>
              Absolwent Politechniki Warszawskiej na kierunku Inżynieria
              Fotoniczna. Doświadczony inżynier sieciowy i specjalista od
              systemów informatycznych klasy enterprise. Pracował w
              międzynarodowych zespołach wdrażających systemy ERP oraz jako IS
              Manager w firmie produkcyjnej.
            </p>
            <p>
              Po godzinach troskliwy tata Hani i Kubusia, narciarz i wędkarz.
            </p>
          </article>
          <article className="founderCard founderCardDark">
            <span className="founderInitials">KG</span>
            <p className="eyebrow lightEyebrow">Współtwórca sieci</p>
            <h2>Karol Góralski</h2>
            <p>
              Absolwent Radomskiej Wyższej Szkoły Biznesu na kierunku
              Informatyka Stosowana. Specjalista od systemów Unix, współtwórca
              polskiego tłumaczenia podręcznika Gentoo GNU/Linux i
              doświadczony inżynier sieciowy.
            </p>
            <p>
              Projektował jedną z największych sieci IP MPLS w Polsce do
              transportu usług Triple Play. Pracował jako System &amp; Network
              Engineer i Security Officer. Motocyklista, paralotniarz,
              krótkofalowiec-telegrafista oraz miłośnik muzyki, porto i sushi.
            </p>
          </article>
        </div>
        <blockquote className="missionQuote">
          <p>
            „Naszą misją jest, aby z dobrodziejstw globalnej sieci mogli
            korzystać ludzie mieszkający w najbardziej niedostępnych zakątkach
            gminy Iłża i gmin sąsiadujących.”
          </p>
          <footer>
            Tworzenie Iłża.Net zawsze sprawiało nam wielką frajdę — i tak jest
            do dziś.
          </footer>
        </blockquote>
        <div className="richText richTextCentered">
          <p>
            Wraz z dostępem do Internetu chcemy być osobistymi pomocnikami
            mieszkańców w sprawach związanych z Internetem i szeroko pojętą
            techniką komputerową. Radość kolejnych osób dołączających do sieci
            pozostaje największą nagrodą za trud wkładany w utrzymanie jakości
            i dostępności usług.
          </p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

function RegulationPage() {
  return (
    <>
      <PageHero
        eyebrow="Regulamin"
        title="Zasady korzystania z sieci Iłża.Net."
        intro="Regulamin świadczenia dostępu do Internetu przez GTR Systemy."
      />
      <section className="contentSection regulationLayout">
        <aside className="regulationNav">
          <p className="eyebrow">Na tej stronie</p>
          <ol>
            {regulationSections.map((section, index) => (
              <li key={section.title}>
                <a href={`#regulamin-${index + 1}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </aside>
        <div className="regulationContent">
          <p className="regulationPreamble">
            Postanowienia regulaminu korzystania z usług sieci komputerowej
            Ilza.Net, świadczonych usług dostępu do Internetu przez firmę GTR
            Systemy.
          </p>
          {regulationSections.map((section, index) => (
            <section id={`regulamin-${index + 1}`} key={section.title}>
              <span>0{index + 1}</span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  switch (slug as Slug) {
    case "aktualnosci":
      return <NewsPage />;
    case "jak-kupic":
      return <HowToBuyPage />;
    case "wsparcie":
      return <SupportPage />;
    case "zasieg":
      return <CoveragePage />;
    case "cennik":
      return <PricePage />;
    case "kontakt":
      return <ContactPage />;
    case "o-nas":
      return <AboutPage />;
    case "regulamin":
      return <RegulationPage />;
    default:
      notFound();
  }
}
