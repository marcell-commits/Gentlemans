import type { Metadata } from "next";
import { ClientSite } from "@/components/client-site";
import { variants } from "@/config/variants";

const site = variants.szepsegszalon;

export const metadata: Metadata = {
  title: `${site.name} | Vaelora template`,
  description: site.subtitle
};

export default function BeautyPage() {
  return <ClientSite site={site} />;
}
