import type { Metadata } from "next";
import { CollectionHub } from "@/components/content/collection-hub";
import { publicListing } from "@/lib/content/queries";
import { buildHubMetadata } from "@/lib/seo/metadata";

const TITLE = "Area Layanan";
const DESCRIPTION =
  "Wilayah kerja Arkavena beserta kondisi lokal dan pertimbangan logistik yang memengaruhi pelaksanaan proyek.";

export const metadata: Metadata = buildHubMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/wilayah",
});

export default function LocationsHubPage() {
  return (
    <CollectionHub
      eyebrow="Wilayah"
      title={TITLE}
      description={DESCRIPTION}
      path="/wilayah"
      label="Wilayah"
      items={publicListing("locations", "location")}
    />
  );
}
