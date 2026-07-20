import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TEGAKARA Construction & Facility Care',
    short_name: 'TEGAKARA',
    description: 'Jasa Kontraktor Sipil, Arsitektur, dan Perawatan Fasilitas Berpengalaman.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F6F3ED',
    theme_color: '#0E1B26',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
