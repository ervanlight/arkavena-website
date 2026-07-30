"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Branded fallback for unhandled render errors (audit finding Q2: previously
 * missing entirely, so any error surfaced Next.js's generic unstyled page).
 * Required by Next.js to be a Client Component.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-40">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-6 tracking-tight">
            Ada yang tidak berjalan semestinya.
          </h1>
          <p className="text-xl text-[#3F4954] mb-12 leading-relaxed">
            Halaman ini mengalami error saat dimuat. Coba muat ulang, atau kembali ke halaman utama.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={() => reset()}>
              Coba Lagi
            </Button>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/">Kembali ke Halaman Utama</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
