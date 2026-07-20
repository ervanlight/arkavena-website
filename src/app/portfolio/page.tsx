import Link from 'next/link';
import { ProjectCard } from '@/components/sections/project-card';

export const metadata = {
  title: 'Portofolio | TEGAKARA Construction',
  description: 'Lihat berbagai proyek konstruksi dan arsitektur yang telah kami selesaikan.',
};

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "Pembangunan Rumah Tinggal Modern Minimalis",
      category: "Residensial",
      location: "CitraLand, Surabaya",
      href: "/portfolio/rumah-tinggal-citraland",
      imageUrl: "/images/house_renovation_1784551967214.jpg"
    },
    {
      id: 2,
      title: "Fasad & Perawatan Gedung Perkantoran",
      category: "Komersial",
      location: "Pusat Kota Surabaya",
      href: "/portfolio/gedung-perkantoran-surabaya",
      imageUrl: "/images/commercial_building_1784551986230.jpg"
    },
    {
      id: 3,
      title: "Pemeliharaan Fasilitas Sekolah & Lapangan",
      category: "Sekolah",
      location: "Sidoarjo",
      href: "/portfolio/fasilitas-sekolah-sidoarjo",
      imageUrl: "/images/school_facility_1784552005374.jpg"
    },
    {
      id: 4,
      title: "Waterproofing Atap Pabrik Industri",
      category: "Komersial",
      location: "Kawasan Industri Gresik",
      href: "/portfolio/waterproofing-pabrik-gresik",
      imageUrl: "/images/industrial_facility_1784552026672.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-manrope font-bold text-[#0E1B26] mb-8">Portofolio Kami</h1>
        
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          <button className="px-4 py-2 bg-[#0E1B26] text-white rounded-md whitespace-nowrap">Semua</button>
          <button className="px-4 py-2 bg-white text-[#0E1B26] border border-[#1C2D38] rounded-md whitespace-nowrap">Residensial</button>
          <button className="px-4 py-2 bg-white text-[#0E1B26] border border-[#1C2D38] rounded-md whitespace-nowrap">Komersial</button>
          <button className="px-4 py-2 bg-white text-[#0E1B26] border border-[#1C2D38] rounded-md whitespace-nowrap">Sekolah</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard 
                key={project.id}
                title={project.title}
                category={project.category}
                location={project.location}
                href={project.href}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
      </div>
    </main>
  );
}
