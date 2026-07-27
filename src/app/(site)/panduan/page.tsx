import type { Metadata } from "next";
import { CollectionHub } from "@/components/content/collection-hub";
import { publicListing } from "@/lib/content/queries";
import { buildHubMetadata } from "@/lib/seo/metadata";

const TITLE = "Panduan";
const DESCRIPTION =
  "Panduan praktis seputar perencanaan, biaya, pelaksanaan, dan pengendalian proyek konstruksi serta perawatan bangunan.";

export const metadata: Metadata = buildHubMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/panduan",
});

export default function GuidesHubPage() {
  return (
    <CollectionHub
      eyebrow="Panduan"
      title={TITLE}
      description={DESCRIPTION}
      path="/panduan"
      label="Panduan"
      items={publicListing("guides", "guide")}
    />
  );
}
