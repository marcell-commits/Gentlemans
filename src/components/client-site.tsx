import type { CSSProperties } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Mail,
  Menu,
  MapPin,
  Phone
} from "lucide-react";
import type { SiteVariant } from "@/config/variants";

const navItems = [
  { href: "#szolgaltatasok", label: "Szolgáltatások" },
  { href: "#arak", label: "Árak" },
  { href: "#galeria", label: "Galéria" },
  { href: "#kapcsolat", label: "Kapcsolat" }
];

type Props = {
  site: SiteVariant;
};

function assetPath(src: string) {
  if (!src.startsWith("/")) {
    return src;
  }

  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}

export function ClientSite({ site }: Props) {
  const themeVars = {
    "--brand": site.theme.brand,
    "--accent": site.theme.accent,
    "--ink": site.theme.ink,
    "--muted": site.theme.muted,
    "--paper": site.theme.paper,
    "--surface": site.theme.surface
  } as CSSProperties;
  const phoneDigits = site.phone.replace(/\D/g, "");
  const telHref = site.phone.includes("+") ? `tel:${site.phone.replace(/[^\d+]/g, "")}` : `tel:+36${phoneDigits}`;

  return (
    <main className="bg-paper text-ink" style={themeVars}>
      <Header site={site} />
      <Hero site={site} telHref={telHref} />
      <Services site={site} />
      <Pricing site={site} />
      <Gallery site={site} />
      <WhyUs site={site} />
      <MapSection site={site} />
      <Contact site={site} telHref={telHref} />
      <BookingCta site={site} />
      <Footer site={site} />
    </main>
  );
}

function Header({ site }: { site: SiteVariant }) {
  return (
    <header className="absolute left-0 top-0 z-30 w-full text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <a href="#" className="max-w-[58vw] text-sm font-semibold leading-tight tracking-wide sm:max-w-none sm:text-base">
            Gentleman's Club
          </a>
          <div className="flex items-center gap-2">
            <a
              href={site.bookingLink}
              className="hidden min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-ink shadow-soft transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-white/80 md:inline-flex"
            >
              <CalendarDays aria-hidden="true" size={17} />
              Időpontfoglalás
            </a>
            <details className="group relative md:hidden">
              <summary
                aria-label="Menü megnyitása"
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/80 [&::-webkit-details-marker]:hidden"
              >
                <Menu aria-hidden="true" size={23} strokeWidth={2.4} />
              </summary>
              <div className="absolute right-0 z-40 mt-3 w-[min(82vw,292px)] overflow-hidden rounded-lg border border-white/20 bg-ink/95 p-2 shadow-[0_22px_60px_rgba(0,0,0,0.45)] backdrop-blur">
                <nav aria-label="Mobil navigáció" className="grid gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-md px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href={site.bookingLink}
                    className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-ink transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/70"
                  >
                    <CalendarDays aria-hidden="true" size={17} />
                    Időpontfoglalás
                  </a>
                </nav>
              </div>
            </details>
          </div>
        </div>
        <nav aria-label="Fő navigáció" className="hidden gap-2 overflow-x-auto pb-1 md:flex md:gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-10 shrink-0 items-center rounded-lg border border-white/20 bg-white/10 px-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero({ site, telHref }: { site: SiteVariant; telHref: string }) {
  return (
    <section className="relative min-h-[88svh] overflow-hidden bg-ink text-white">
      <Image
        src={site.heroImage.src}
        alt={site.heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ background: site.theme.heroOverlay }} />
      <div className="relative mx-auto flex min-h-[88svh] max-w-7xl flex-col justify-end px-5 pb-12 pt-40 sm:px-6 md:pb-16 lg:px-8">
        <div className="max-w-5xl">
          <h1 className="sr-only">{site.name}</h1>
          <Image
            src={assetPath("/gentlemans-club-logo-gold.png")}
            alt=""
            width={2000}
            height={563}
            priority
            className="w-full max-w-[920px] object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.55)]"
          />
          <p className="mt-7 text-sm font-semibold text-accent md:text-base">{site.eyebrow}</p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/[0.84] md:text-2xl md:leading-9">{site.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={site.bookingLink}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-bold text-ink transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              <CalendarDays aria-hidden="true" size={18} />
              Időpontfoglalás
            </a>
            <a
              href={telHref}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/[0.34] bg-white/10 px-5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/[0.18] focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              <Phone aria-hidden="true" size={18} />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ site }: { site: SiteVariant }) {
  return (
    <section id="szolgaltatasok" className="px-5 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow={site.category}
          title="Minden, ami egy tökéletes megjelenéshez kell."
          description="Legyen szó hajvágásról, szakálligazításról vagy teljes megújulásról, nálunk minden a precizitásról és az igényes megjelenésről szól."
        />
      </div>
    </section>
  );
}

function Pricing({ site }: { site: SiteVariant }) {
  const priceGroups = site.prices.reduce<Array<{ category: string | null; items: SiteVariant["prices"] }>>(
    (groups, item) => {
      const category = item.category ?? null;
      const group = groups.find((candidate) => candidate.category === category);

      if (group) {
        group.items.push(item);
      } else {
        groups.push({ category, items: [item] });
      }

      return groups;
    },
    []
  );

  return (
    <section id="arak" className="bg-ink px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold text-accent">Árlista</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Egyszerű árak, profi munka.</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">
            Nincsenek rejtett költségek. Csak pontos munka, korrekt árak és minőségi barber szolgáltatások.
          </p>
        </div>
        <div className="grid gap-4">
          {priceGroups.map((group) => (
            <div key={group.category ?? "prices"} className="overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.04]">
              {group.category ? (
                <div className="bg-accent px-5 py-4 text-lg font-semibold text-ink md:px-6">{group.category}</div>
              ) : null}
              {group.items.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-3 border-white/[0.12] p-5 sm:grid-cols-[1fr_auto] sm:items-center md:p-6 [&:not(:last-child)]:border-b"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{item.label}</h3>
                    <p className="mt-1 text-sm text-white/[0.58]">{item.note}</p>
                  </div>
                  <p className="text-2xl font-semibold text-accent sm:text-right">{item.price}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ site }: { site: SiteVariant }) {
  const imagePositions = ["object-[center_42%]", "object-[center_44%]", "object-[center_18%]", "object-[center_18%]"];

  return (
    <section id="galeria" className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Munkáink"
          title="A végeredmény magáért beszél."
          description="Valódi vendégek, valódi frizurák. Nézd meg munkáinkat és inspirálódj a következő látogatásodhoz."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-[260px_260px]">
          {site.gallery.map((image, index) => (
            <figure
              key={image.src}
              className={`relative overflow-hidden rounded-lg bg-ink/5 ${
                index === 0 ? "md:col-span-2 md:row-span-2" : index === 1 ? "md:col-span-2" : ""
              } ${index >= 2 ? "aspect-[3/4] md:aspect-auto" : "aspect-[4/3] md:aspect-auto"}`}
            >
              <Image
                src={assetPath(image.src)}
                alt={image.alt}
                fill
                sizes={index === 0 || index === 1 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                className={`object-cover transition duration-500 hover:scale-[1.03] ${imagePositions[index] ?? "object-center"}`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs({ site }: { site: SiteVariant }) {
  return (
    <section id="miert" className="bg-surface px-5 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-brand">Miért minket?</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Nálunk a részleteken múlik minden.</h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            A Gentleman's Clubban nem csak egy hajvágást kapsz. A cél minden alkalommal ugyanaz: magabiztosabb megjelenés és tökéletes végeredmény.
          </p>
        </div>
        <div className="grid gap-3">
          {site.why.map((reason) => (
            <div key={reason} className="flex gap-4 rounded-lg border border-ink/10 bg-paper p-5">
              <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-brand" size={22} />
              <p className="text-lg leading-7">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MapSection({ site }: { site: SiteVariant }) {
  return (
    <section id="terkep" className="px-5 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-semibold text-brand">Elérhetőség</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Könnyen megtalálsz bennünket.</h2>
          </div>
          <p className="flex max-w-md items-start gap-3 text-lg leading-7 text-muted">
            <MapPin aria-hidden="true" className="mt-1 shrink-0 text-brand" size={22} />
            {site.address}
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-ink/10 bg-surface shadow-soft">
          <iframe
            title={`${site.name} térkép`}
            src={site.mapsEmbedUrl}
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function Contact({ site, telHref }: { site: SiteVariant; telHref: string }) {
  return (
    <section id="kapcsolat" className="bg-ink px-5 py-20 text-white sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold text-accent">Kapcsolat</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">Foglalj időpontot egyszerűen.</h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            Az online foglalási rendszerben néhány kattintással kiválaszthatod a számodra megfelelő szolgáltatást és időpontot.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={telHref}
            className="rounded-lg border border-white/[0.12] bg-white/[0.05] p-6 transition hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <Phone aria-hidden="true" className="mb-8 text-accent" size={24} />
            <p className="text-sm text-white/[0.54]">Telefon</p>
            <p className="mt-2 text-2xl font-semibold">{site.phone}</p>
          </a>
          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className="rounded-lg border border-white/[0.12] bg-white/[0.05] p-6 transition hover:bg-white/[0.09] focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <Mail aria-hidden="true" className="mb-8 text-accent" size={24} />
              <p className="text-sm text-white/[0.54]">E-mail</p>
              <p className="mt-2 break-words text-2xl font-semibold leading-tight">{site.email}</p>
            </a>
          ) : null}
          <div className="rounded-lg border border-white/[0.12] bg-white/[0.05] p-6">
            <MapPin aria-hidden="true" className="mb-8 text-accent" size={24} />
            <p className="text-sm text-white/[0.54]">Cím</p>
            <p className="mt-2 text-2xl font-semibold leading-tight">{site.address}</p>
          </div>
          <div className="rounded-lg border border-white/[0.12] bg-white/[0.05] p-6 sm:col-span-2">
            <p className="text-sm text-white/[0.54]">Facebook</p>
            {site.facebookEmbedUrl ? (
              <div className="mt-4 overflow-hidden rounded-lg bg-white">
                <iframe
                  title={`${site.name} Facebook bejegyzés`}
                  src={site.facebookEmbedUrl}
                  width={500}
                  height={480}
                  className="h-[480px] w-full border-0"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.12] px-4 text-sm font-semibold transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-white/70"
                  >
                    {social.label}
                    <ExternalLink aria-hidden="true" size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingCta({ site }: { site: SiteVariant }) {
  return (
    <section id="foglalas" className="px-5 py-16 sm:px-6 md:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-lg bg-brand p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-white/[0.72]">
            <Clock3 aria-hidden="true" size={17} />
            Online időpontfoglalás
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">Foglalj időpontot még ma!</h2>
        </div>
        <a
          href={site.bookingLink}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-ink transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-white/80"
        >
          Időpontfoglalás
          <ArrowRight aria-hidden="true" size={18} />
        </a>
      </div>
    </section>
  );
}

function Footer({ site }: { site: SiteVariant }) {
  return (
    <footer className="px-5 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-ink/10 pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>{site.name}</p>
        <p>Gentleman's Club Barbershop Szombathely</p>
      </div>
    </footer>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold text-brand">{eyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-muted">{description}</p>
    </div>
  );
}
