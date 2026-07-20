import { notFound } from 'next/navigation';

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = null;

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-4xl font-manrope font-bold text-[#0E1B26] mb-4">Detail Proyek</h1>
        {/* Project details */}
      </div>
    </main>
  );
}
