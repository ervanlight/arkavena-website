import { Container } from "@/components/ui/container";

/**
 * Global route-transition fallback (audit finding Q2: no loading.tsx existed
 * anywhere, so a slow navigation just froze until content appeared). Most
 * pages are statically prerendered and skip this entirely — it only shows
 * for genuinely dynamic segments or a slow initial load.
 */
export default function Loading() {
  return (
    <Container className="pt-24 pb-12 lg:pt-28 lg:pb-16">
      <div className="mx-auto w-full max-w-3xl animate-pulse">
        <div className="mb-6 h-4 w-40 rounded bg-[#E8DED0]" />
        <div className="mb-3 h-9 w-3/4 rounded bg-[#E8DED0]" />
        <div className="mb-8 h-9 w-1/2 rounded bg-[#E8DED0]" />
        <div className="mb-2 h-4 w-full rounded bg-[#E8DED0]" />
        <div className="mb-8 h-4 w-5/6 rounded bg-[#E8DED0]" />
        <div className="aspect-[16/9] w-full rounded-lg bg-[#E8DED0]" />
      </div>
    </Container>
  );
}
