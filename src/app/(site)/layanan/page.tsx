import type { Metadata } from "next";
import { CollectionHub } from "@/components/content/collection-hub";
import { publicListing } from "@/lib/content/queries";
import { buildHubMetadata } from "@/lib/seo/metadata";

const TITLE = "Layanan";
const DESCRIPTION =
  "Ruang lingkup layanan konstruksi dan perawatan fasilitas Arkavena, beserta keluaran yang Anda terima di setiap layanan.";

export const metadata: Metadata = buildHubMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/layanan",
});

export default function ServicesHubPage() {
  return (
    <CollectionHub
      eyebrow="Layanan"
      title={TITLE}
      description={DESCRIPTION}
      path="/layanan"
      label="Layanan"
      items={publicListing("services", "service")}
    />
  );
}
