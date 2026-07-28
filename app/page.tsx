import Link from "next/link";
import { ContactForm } from "./contact-form";
import { news } from "./site-data";

const services = [
  {
    number: "01",
    eyebrow: "Internet",
    title: "Łącze dla domu",
    text: "Stabilny Internet do pracy, nauki, streamingu i codziennych spraw. Najpierw sprawdzamy możliwości pod konkretnym adresem.",
    href: "/cennik",
  },
  {
    number: "02",
    eyebrow: "Biznes",
    title: "Opieka dla firm",
    text: "Internet i wsparcie techniczne dla firm, które oczekują szybkiej reakcji, dokumentacji i kontaktu z inżynierem.",
    href: "/wsparcie",
  },
  {
    number: "03",
    eyebrow: "Media Serwis",
    title: "Sklep i serwis",
    text: "Sprzedaż i serwis komputerów, CB radio, anteny DVB-T, instalacje antenowe, kolorowe ksero, drukowanie i skanowanie.",
    href: "/kontakt",
  },
] as const;

const destinations = [
  {
    href: "/jak-kupic",
    number: "01",
    title: "Jak zamówić usługę",
    text: "Telefon, wizyta w biurze i wszystkie potrzebne dane.",
  },
  {
    href: "/cennik",
    number: "02",
    title: "Pakiety i cennik",
    text: "Symetryczne pakiety AirFiber i aktualne usługi dodatkowe.",
  },
  {
    href: "/wsparcie",
    number: "03",
    title: "Wsparcie techniczne",
    text: "Poziomy Srebrny i Złoty oraz zasady obsługi zgłoszeń.",
  },
  {
    href: "/zasieg",
    number: "04",
    title: "Zasięg sieci",
    text: "Obszar, na którym działamy, oraz szybkie sprawdzenie adresu.",
  },
] as const;

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Iłża.Net",
    legalName: "GTR Systemy Karol Góralski",
    url: "https://ilza.net",
    telephone: "+48882564615",
    email: "biuro@ilza.net",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rynek 12",
      postalCode: "27-100",
      addressLocality: "Iłża",
      addressCountry: "PL",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+48882564615",
        contactType: "sales",
      },
      {
        "@type": "ContactPoint",
        telephone: "+48666300786",
        contactType: "technical support",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "22:00",
        },
      },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "15:00",
    },
    areaServed: "Iłża i okolice",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="homeHero">
        <div className="heroGlow heroGlowOne" aria-hidden="true" />
        <div className="heroGlow heroGlowTwo" aria-hidden="true" />
        <div className="heroContent">
          <p className="eyebrow lightEyebrow">
            <span className="liveDot" />
            Lokalny Internet · Iłża i okolice
          </p>
          <h1>
            Internet naprawdę
            <span> blisko Ciebie.</span>
          </h1>
          <p className="heroLead">
            Od lat budujemy sieci telekomunikacyjne — od dostępu Wi-Fi i
            DOCSIS po rozległe sieci IP MPLS. Iłża i jej okolice są dla nas
            miejscem szczególnie bliskim.
          </p>
          <div className="heroActions">
            <Link className="button buttonPrimary" href="/zasieg">
              Sprawdź dostępność <span aria-hidden="true">→</span>
            </Link>
            <a className="button buttonGhost" href="tel:+48882564615">
              Zadzwoń: 882 564 615
            </a>
          </div>
          <ul className="heroTrust" aria-label="Najważniejsze informacje">
            <li>
              <span aria-hidden="true">✓</span> Zespół na miejscu
            </li>
            <li>
              <span aria-hidden="true">✓</span> Pomoc 7:00–22:00
            </li>
            <li>
              <span aria-hidden="true">✓</span> Dom i firma
            </li>
          </ul>
        </div>

        <div className="heroVisual" aria-label="Wizualizacja lokalnej sieci">
          <div className="networkField" aria-hidden="true">
            <span className="networkLine lineOne" />
            <span className="networkLine lineTwo" />
            <span className="networkLine lineThree" />
            <span className="networkNode nodeOne" />
            <span className="networkNode nodeTwo" />
            <span className="networkNode nodeThree" />
            <span className="networkNode nodeFour" />
            <div className="signalOrb">
              <span className="signalRing ringOne" />
              <span className="signalRing ringTwo" />
              <span className="signalRing ringThree" />
              <div className="signalCore">
                <small>lokalnie od lat</small>
                <strong>IŁŻA.NET</strong>
              </div>
            </div>
          </div>
          <div className="connectionCard">
            <div className="connectionTop">
              <span>Pomoc techniczna</span>
              <strong>
                <i /> Dostępna
              </strong>
            </div>
            <div className="connectionMeta">
              <p>
                <span>Godziny</span>
                <strong>7:00–22:00</strong>
              </p>
              <p>
                <span>Serwis · 7 dni w tygodniu</span>
                <strong>666 300 786</strong>
              </p>
            </div>
          </div>
          <div className="localBadge">
            <span aria-hidden="true">⌖</span>
            <p>
              <small>Jesteśmy tutaj</small>
              Iłża
            </p>
          </div>
        </div>
      </section>

      <section className="locationStrip" aria-label="Obszar działania">
        <p>Łączymy lokalnie</p>
        <span>Iłża</span>
        <i />
        <span>Mirów</span>
        <i />
        <span>Rzeczniów</span>
        <i />
        <span>Mirzec</span>
        <i />
        <span>i okolice</span>
      </section>

      <section className="section">
        <div className="sectionIntro">
          <div>
            <p className="eyebrow">Oferta Iłża.Net</p>
            <h2>Jedna lokalna firma. Wiele technicznych spraw.</h2>
          </div>
          <p>
            Internet jest rdzeniem naszej oferty. Na miejscu prowadzimy również
            sklep, serwis komputerowy i świadczymy usługi antenowe.
          </p>
        </div>
        <div className="serviceGrid">
          {services.map((service) => (
            <article className="serviceCard" key={service.number}>
              <div className="serviceNumber">{service.number}</div>
              <p className="cardEyebrow">{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Link href={service.href}>
                Zobacz szczegóły <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="homeInfoSection">
        <div className="homeInfoCard">
          <p className="eyebrow">Biuro, serwis i sklep</p>
          <h2>Zapraszamy na Rynek 12.</h2>
          <ul className="checkList">
            <li>sprzedaż i serwis komputerów</li>
            <li>CB radio — w tym strojenie anten</li>
            <li>tunery i anteny DVB-T</li>
            <li>serwis istniejących instalacji antenowych</li>
            <li>kolorowe ksero, drukowanie i skanowanie</li>
          </ul>
          <div className="hoursRow">
            <p>
              <span>Poniedziałek–piątek</span>
              <strong>8:30–15:00</strong>
            </p>
          </div>
          <small className="sourceNote">Aktualne godziny sklepu.</small>
        </div>
        <aside className="referralCard">
          <p className="eyebrow lightEyebrow">Promocja</p>
          <span className="referralIcon" aria-hidden="true">
            +1
          </span>
          <h2>Poleć nas sąsiadowi.</h2>
          <p>
            Jeśli podłączymy osobę, którą nam polecisz, zostaniesz zwolniony z
            abonamentu za jeden miesiąc.
          </p>
          <a href="tel:+48882564615">Zadzwoń i zapytaj o szczegóły →</a>
        </aside>
      </section>

      <section className="section sectionTint">
        <div className="sectionIntro">
          <div>
            <p className="eyebrow">Szybki dostęp</p>
            <h2>Wszystko, czego potrzebujesz.</h2>
          </div>
          <p>
            Sprawdź dostępność, porównaj pakiety, poznaj zasady wsparcia albo
            skontaktuj się bezpośrednio z lokalnym zespołem.
          </p>
        </div>
        <div className="destinationGrid">
          {destinations.map((item) => (
            <Link className="destinationCard" href={item.href} key={item.href}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <i aria-hidden="true">→</i>
            </Link>
          ))}
        </div>
      </section>

      <section className="section newsPreviewSection">
        <div className="sectionIntro">
          <div>
            <p className="eyebrow">Aktualności</p>
            <h2>Aktualności Iłża.Net.</h2>
          </div>
          <Link className="textLink" href="/aktualnosci">
            Zobacz wszystkie 30 wpisów
          </Link>
        </div>
        <div className="newsPreviewGrid">
          {news.slice(0, 3).map((item) => (
            <article className="newsCard" key={item.date}>
              <time dateTime={item.date}>{item.date}</time>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="homeContact">
        <div>
          <p className="eyebrow lightEyebrow">Sprawdź swój adres</p>
          <h2>Podaj lokalizację. My sprawdzimy resztę.</h2>
          <p>
            Dostępność zależy od dokładnego adresu. Zadzwoń lub napisz, a
            zweryfikujemy zasięg i zaproponujemy możliwy wariant.
          </p>
        </div>
        <ContactForm compact />
      </section>
    </>
  );
}
