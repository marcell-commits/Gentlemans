import { ClientSite } from "@/components/client-site";
import { DEFAULT_VARIANT, variants } from "@/config/variants";

export default function Home() {
  return <ClientSite site={variants[DEFAULT_VARIANT]} />;
}
