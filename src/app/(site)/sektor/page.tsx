import type { Metadata } from "next";
import { CollectionHub } from "@/components/content/collection-hub";
import { publicListing } from "@/lib/content/queries";
import { buildHubMetadata } from "@/lib/seo/metadata";

const TITLE = "Sektor Bangunan";
const DESCRIPTION =
  "Pendekatan Arkavena per jenis bangunan, mulai dari kebutuhan teknis hingga risiko yang paling sering muncul di setiap sektor.";

export const metadata: Metadata = buildHubMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/sektor",
});

export default function SectorsHubPage() {
  return (
    <CollectionHub
      eyebrow="Sektor"
      title={TITLE}
      description={DESCRIPTION}
      path="/sektor"
      label="Sektor"
      items={publicListing("sectors", "sector")}
    />
  );
}
