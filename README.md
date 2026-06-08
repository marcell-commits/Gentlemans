# Vaelora ügyféloldal template

Statikus, egyoldalas Next.js + Tailwind CSS template Vaelora ügyféloldalakhoz.

## Variánsok

- `/` és `/barber/` - barber
- `/szepsegszalon/` - szépségszalon
- `/autokozmetika/` - autókozmetika
- `/szemelyi-edzo/` - személyi edző

Minden variáns ugyanazt az oldalkomponenst használja, az üzleti tartalom pedig itt cserélhető:

```txt
src/config/variants.ts
```

Itt szerkeszthető a név, alcím, brand szín, szolgáltatáslista, árlista, galéria, foglalási link, cím, telefonszám, social linkek és Google Maps embed URL.

## Indítás

```bash
pnpm install
pnpm dev
```

## Statikus build

```bash
pnpm build
```

A `next.config.mjs` statikus exportra van állítva, ezért a build az `out` mappát hozza létre. A projekt Vercel-ready; a `vercel.json` a Next.js frameworköt és az `out` output mappát jelöli.

## Brand színek

A brand színek variánsonként RGB stringként vannak megadva, például:

```ts
theme: {
  brand: "181 92 78",
  accent: "214 184 116",
  ink: "19 20 19",
  muted: "96 92 86",
  paper: "248 246 241",
  surface: "255 255 255"
}
```

Ezek CSS változóként kerülnek az oldalra, így a Tailwind osztályokban `bg-brand`, `text-accent`, `text-muted` formában használhatók.
