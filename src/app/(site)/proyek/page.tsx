import type { Metadata } from "next";
import { CollectionHub } from "@/components/content/collection-hub";
import { publicListing } from "@/lib/content/queries";
import { buildHubMetadata } from "@/lib/seo/metadata";

const TITLE = "Proyek";
const DESCRIPTION =
  "Dokumentasi proyek Arkavena yang telah memperoleh izin publikasi dari pemilik pekerjaan, lengkap dengan lingkup dan hasilnya.";

export const metadata: Metadata = buildHubMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/proyek",
});

export default function ProjectsHubPage() {
  return (
    <CollectionHub
      eyebrow="Proyek"
      title={TITLE}
      description={DESCRIPTION}
      path="/proyek"
      label="Proyek"
      items={publicListing("projects", "project")}
    />
  );
}
