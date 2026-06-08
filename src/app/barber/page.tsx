import type { Metadata } from "next";
import { ClientSite } from "@/components/client-site";
import { variants } from "@/config/variants";

const site = variants.barber;

export const metadata: Metadata = {
  title: `${site.name} | Szombathely`,
  description: site.subtitle
};

export default function BarberPage() {
  return <ClientSite site={site} />;
}
