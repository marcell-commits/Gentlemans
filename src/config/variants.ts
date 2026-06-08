export type VariantKey = "barber" | "szepsegszalon" | "autokozmetika" | "szemelyi-edzo";

type Service = {
  title: string;
  description: string;
};

type Price = {
  label: string;
  price: string;
  note: string;
  category?: string;
};

type GalleryImage = {
  src: string;
  alt: string;
};

type SocialLink = {
  label: string;
  href: string;
};

export type SiteVariant = {
  slug: VariantKey;
  category: string;
  name: string;
  eyebrow: string;
  subtitle: string;
  theme: {
    brand: string;
    accent: string;
    ink: string;
    muted: string;
    paper: string;
    surface: string;
    heroOverlay: string;
  };
  heroImage: GalleryImage;
  services: Service[];
  prices: Price[];
  gallery: GalleryImage[];
  why: string[];
  bookingLink: string;
  address: string;
  phone: string;
  email?: string;
  socials: SocialLink[];
  facebookEmbedUrl?: string;
  mapsEmbedUrl: string;
};

const imageParams = "auto=format&fit=crop&q=80";

export const DEFAULT_VARIANT: VariantKey = "barber";

export const variants = {
  barber: {
    slug: "barber",
    category: "Szolgáltatások",
    name: "Gentleman's Club Barbershop",
    eyebrow: "Díjnyertes barber Szombathely szívében",
    subtitle:
      "Precíz hajvágás, igényes szakállápolás és valódi barber élmény Szombathelyen. Foglalj időpontot online, és mi gondoskodunk róla, hogy a legjobb formádat hozd.",
    theme: {
      brand: "181 92 78",
      accent: "214 184 116",
      ink: "19 20 19",
      muted: "96 92 86",
      paper: "248 246 241",
      surface: "255 255 255",
      heroOverlay: "radial-gradient(ellipse at 32% 64%, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.42) 34%, rgba(0, 0, 0, 0.10) 68%), linear-gradient(90deg, rgba(16, 17, 16, 0.9), rgba(16, 17, 16, 0.5) 56%, rgba(16, 17, 16, 0.18))"
    },
    heroImage: {
      src: `https://images.unsplash.com/photo-1621605815971-fbc98d665033?${imageParams}&w=1800`,
      alt: "Barber munka közben egy prémium szalonban"
    },
    services: [
      {
        title: "Hajvágás",
        description: "Modern és klasszikus fazonok precíz kivitelezéssel, személyre szabva."
      },
      {
        title: "Szakállformázás",
        description: "Kontúrozás, igazítás és ápolás a rendezett, karakteres megjelenésért."
      },
      {
        title: "Teljes barber csomag",
        description: "Haj és szakáll egy időben, hogy a végeredmény minden részletében harmonikus legyen."
      }
    ],
    prices: [
      { category: "Extra", label: "Hajvágás és Szakálligazítás", price: "9 600 Ft", note: "1 óra" },
      { category: "Hajvágás", label: "Bőrgépes Hajvágás", price: "5 800 Ft", note: "30 perc" },
      { category: "Hajvágás", label: "Gépi Hajvágás", price: "5 500 Ft", note: "30 perc • bőrgép nélküli hajvágás" },
      { category: "Hajvágás", label: "Gyerek hajvágás", price: "4 500 Ft", note: "30 perc" },
      { category: "Szakáll", label: "Szakálligazítás", price: "3 800 Ft", note: "30 perc" }
    ],
    gallery: [
      {
        src: "/barber-result-1.jpg",
        alt: "Texturált fade friss vágás után"
      },
      {
        src: "/barber-result-4.jpg",
        alt: "Letisztult átmenetes hajvágás oldalnézetből"
      },
      {
        src: "/barber-result-2.jpg",
        alt: "Precíz fade és szakáll formázás"
      },
      {
        src: "/barber-result-3.jpg",
        alt: "Modern göndör taper frizura"
      }
    ],
    why: [
      "Időpont pontosan tartva, várakozás nélkül.",
      "Precíz hajvágás és szakálligazítás.",
      "Igényes, férfias környezet.",
      "Személyre szabott tanácsok az otthoni ápoláshoz."
    ],
    bookingLink: "https://gentlemans-club-barbershop-szombathely.salonic.hu/",
    address: "Széchenyi István utca 4-6, Szombathely, Hungary",
    phone: "(30) 754 4933",
    email: "norbertkarpati777@gmail.com",
    socials: [
      { label: "Facebook", href: "https://www.facebook.com/gentlemansclubszhely7/" }
    ],
    facebookEmbedUrl: "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fgentlemansclubszhely7%2Fposts%2Fpfbid09WeUQTjDZUjg4Z2TsLJYE6gvPUDKPVPU5AndgBJf9hmiVkkfYcSC3dL5MZGiXZMbl&show_text=true&width=500",
    mapsEmbedUrl: "https://www.google.com/maps?q=Sz%C3%A9chenyi%20Istv%C3%A1n%20utca%204-6%2C%20Szombathely%2C%20Hungary&output=embed"
  },
  szepsegszalon: {
    slug: "szepsegszalon",
    category: "Szépségszalon",
    name: "Vaelora Beauty Atelier",
    eyebrow: "Finom részletek, látható ragyogás",
    subtitle:
      "Szalonélmény hajra, arcra és alkalmi megjelenésre, ahol a technikai precizitás nyugodt, puha atmoszférával találkozik.",
    theme: {
      brand: "166 68 104",
      accent: "28 126 117",
      ink: "35 29 32",
      muted: "118 100 108",
      paper: "252 249 247",
      surface: "255 255 255",
      heroOverlay: "linear-gradient(90deg, rgba(35, 29, 32, 0.84), rgba(35, 29, 32, 0.34) 58%, rgba(35, 29, 32, 0.10))"
    },
    heroImage: {
      src: `https://images.unsplash.com/photo-1560066984-138dadb4c035?${imageParams}&w=1800`,
      alt: "Szépségszalon hajformázás közben"
    },
    services: [
      {
        title: "Hajfestés és tonizálás",
        description: "Személyre szabott árnyalat, fényes finish és kíméletes termékválasztás."
      },
      {
        title: "Arcapolás",
        description: "Frissítő, nyugtató vagy ragyogást adó kezelés a bőr aktuális állapotához."
      },
      {
        title: "Alkalmi styling",
        description: "Eszközbarát forma, tartós hullámok és fotózásra is szép részletek."
      }
    ],
    prices: [
      { label: "Női hajvágás", price: "11 900 Ft", note: "60 perc" },
      { label: "Festés konzultációval", price: "24 900 Ft-tól", note: "120 perc" },
      { label: "Arcapolás", price: "16 900 Ft", note: "75 perc" },
      { label: "Alkalmi frizura", price: "18 900 Ft", note: "90 perc" }
    ],
    gallery: [
      {
        src: `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?${imageParams}&w=900`,
        alt: "Hajformázás részlet"
      },
      {
        src: `https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?${imageParams}&w=900`,
        alt: "Fényes haj és szalonmunka"
      },
      {
        src: `https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?${imageParams}&w=900`,
        alt: "Smink és szépségápolási részletek"
      },
      {
        src: `https://images.unsplash.com/photo-1600948836101-f9ffda59d250?${imageParams}&w=900`,
        alt: "Modern szépségszalon enteriőr"
      }
    ],
    why: [
      "Konzultációval indul minden nagyobb szolgáltatás.",
      "Prémium termékek, erős illatfelhő nélkül.",
      "Nyugodt időbeosztás, nem futószalagos szalonmunka.",
      "Természetes fényben is szép, hordható végeredmény."
    ],
    bookingLink: "https://cal.com/vaelora/beauty",
    address: "1052 Budapest, Vitkovics Mihaly utca 8.",
    phone: "+36 30 234 5678",
    socials: [
      { label: "Instagram", href: "https://instagram.com/vaelora" },
      { label: "Facebook", href: "https://facebook.com/vaelora" },
      { label: "Pinterest", href: "https://pinterest.com/vaelora" }
    ],
    mapsEmbedUrl: "https://maps.google.com/maps?q=1052%20Budapest%2C%20Vitkovics%20Mihaly%20utca%208&output=embed"
  },
  autokozmetika: {
    slug: "autokozmetika",
    category: "Autókozmetika",
    name: "Vaelora Auto Detail Lab",
    eyebrow: "Mélyfény, védett felület, tiszta érzet",
    subtitle:
      "Részletgazdag autókozmetika mindennapi és prémium autóknak, ahol a fényezés, az utastér és az időérték egyformán számít.",
    theme: {
      brand: "0 122 136",
      accent: "219 57 43",
      ink: "16 21 23",
      muted: "82 92 98",
      paper: "246 248 248",
      surface: "255 255 255",
      heroOverlay: "linear-gradient(90deg, rgba(10, 15, 16, 0.88), rgba(10, 15, 16, 0.36) 60%, rgba(10, 15, 16, 0.10))"
    },
    heroImage: {
      src: `https://images.unsplash.com/photo-1607860108855-64acf2078ed9?${imageParams}&w=1800`,
      alt: "Fényes autó professzionális autókozmetikai műhelyben"
    },
    services: [
      {
        title: "Külső prémium mosás",
        description: "Előmosás, kézi samponozás, felniápolás és csíkmentes szárítás karcminimalizált módszerekkel."
      },
      {
        title: "Belső mélytisztítás",
        description: "Kárpit, bőr, műanyag és üvegfelületek alapos tisztítása friss, nem tolakodó illattal."
      },
      {
        title: "Kerámia védelem",
        description: "Fényezés előkészítés, zsírtalanítás és tartós védőréteg a könnyebb tisztításért."
      }
    ],
    prices: [
      { label: "Külső prémium mosás", price: "12 900 Ft-tól", note: "60 perc" },
      { label: "Belső mélytisztítás", price: "29 900 Ft-tól", note: "3-4 óra" },
      { label: "Polír korrekció", price: "69 900 Ft-tól", note: "1 nap" },
      { label: "Kerámia csomag", price: "119 900 Ft-tól", note: "2 nap" }
    ],
    gallery: [
      {
        src: `https://images.unsplash.com/photo-1503376780353-7e6692767b70?${imageParams}&w=900`,
        alt: "Sportautó fényes felülettel"
      },
      {
        src: `https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?${imageParams}&w=900`,
        alt: "Autórészlet tisztítás közben"
      },
      {
        src: `https://images.unsplash.com/photo-1542362567-b07e54358753?${imageParams}&w=900`,
        alt: "Autó karosszéria részlet"
      },
      {
        src: `https://images.unsplash.com/photo-1541443131876-44b03de101c5?${imageParams}&w=900`,
        alt: "Autó belső tér részlet"
      }
    ],
    why: [
      "Karcminimalizált mosási folyamat, minőségi mikroszálas anyagokkal.",
      "Állapotfelmérés után ajánlott csomag, felesleges felár nélkül.",
      "Átadás előtti fény- és utastér-ellenőrzés.",
      "Rugalmas drop-off idősáv elfoglalt tulajdonosoknak."
    ],
    bookingLink: "https://cal.com/vaelora/detailing",
    address: "1117 Budapest, Budafoki út 64.",
    phone: "+36 30 345 6789",
    socials: [
      { label: "Instagram", href: "https://instagram.com/vaelora" },
      { label: "Facebook", href: "https://facebook.com/vaelora" },
      { label: "YouTube", href: "https://youtube.com/@vaelora" }
    ],
    mapsEmbedUrl: "https://maps.google.com/maps?q=1117%20Budapest%2C%20Budafoki%20ut%2064&output=embed"
  },
  "szemelyi-edzo": {
    slug: "szemelyi-edzo",
    category: "Személyi edző",
    name: "Vaelora Performance Studio",
    eyebrow: "Erő, mobilitás, követhető fejlődés",
    subtitle:
      "Személyi edzés és teljesítményprogram elfoglalt embereknek, akik mérhető eredményt akarnak túlterhelés és káosz nélkül.",
    theme: {
      brand: "38 122 79",
      accent: "193 244 64",
      ink: "22 29 25",
      muted: "87 99 90",
      paper: "248 250 245",
      surface: "255 255 255",
      heroOverlay: "linear-gradient(90deg, rgba(16, 24, 19, 0.86), rgba(16, 24, 19, 0.34) 58%, rgba(16, 24, 19, 0.10))"
    },
    heroImage: {
      src: `https://images.unsplash.com/photo-1517838277536-f5f99be501cd?${imageParams}&w=1800`,
      alt: "Személyi edzés professzionális stúdióban"
    },
    services: [
      {
        title: "1:1 személyi edzés",
        description: "Állapotfelmérésre épülő edzés, pontos technikai kontrollal és tervezett terheléssel."
      },
      {
        title: "Erő- és mobilitásprogram",
        description: "Stabil alapok, fájdalommentes mozgás és fokozatos fejlődés irodai életmód mellett is."
      },
      {
        title: "12 hetes transzformáció",
        description: "Edzésterv, kontrollpontok és életmódi ritmus, ami a mindennapokhoz illeszthető."
      }
    ],
    prices: [
      { label: "Próbaedzés", price: "7 900 Ft", note: "45 perc" },
      { label: "1 alkalom", price: "13 900 Ft", note: "60 perc" },
      { label: "8 alkalmas bérlet", price: "99 900 Ft", note: "30 nap" },
      { label: "12 hetes program", price: "249 900 Ft", note: "teljes követés" }
    ],
    gallery: [
      {
        src: `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?${imageParams}&w=900`,
        alt: "Személyi edző technikai kontroll közben"
      },
      {
        src: `https://images.unsplash.com/photo-1584466977773-e625c37cdd50?${imageParams}&w=900`,
        alt: "Súlyzós edzés részlet"
      },
      {
        src: `https://images.unsplash.com/photo-1517963628607-235ccdd5476c?${imageParams}&w=900`,
        alt: "Funkcionális edzőterem"
      },
      {
        src: `https://images.unsplash.com/photo-1599058917212-d750089bc07e?${imageParams}&w=900`,
        alt: "Edzésprogram közös munka közben"
      }
    ],
    why: [
      "Mérhető állapotfelmérés és követhető fejlődési pontok.",
      "Terhelés, ami erősíti a testet, de nem éget ki.",
      "Edzésidő az életviteledhez igazítva.",
      "Technikai figyelem minden sorozatnál, nem sablonprogram."
    ],
    bookingLink: "https://cal.com/vaelora/performance",
    address: "1137 Budapest, Pozsonyi út 22.",
    phone: "+36 30 456 7890",
    socials: [
      { label: "Instagram", href: "https://instagram.com/vaelora" },
      { label: "Facebook", href: "https://facebook.com/vaelora" },
      { label: "LinkedIn", href: "https://linkedin.com/company/vaelora" }
    ],
    mapsEmbedUrl: "https://maps.google.com/maps?q=1137%20Budapest%2C%20Pozsonyi%20ut%2022&output=embed"
  }
} satisfies Record<VariantKey, SiteVariant>;

export const variantSlugs = Object.keys(variants) as VariantKey[];

export function getVariant(slug: string): SiteVariant | undefined {
  return variants[slug as VariantKey];
}
