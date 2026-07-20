export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Residential' | 'Facility Care';
  serviceType: string;
  location: string;
  completionYear: number;
  shortDescription: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  result: string;
  durationMonths: number;
  thumbnailUrl: string;
  gallery: ProjectImage[];
  featured: boolean;
}

// Data proyek dikosongkan (tidak ada data palsu) sesuai instruksi. 
// Data proyek riil akan ditambahkan di kemudian hari.
export const projects: Project[] = [];
