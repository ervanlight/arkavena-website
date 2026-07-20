export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const desktopNav: NavItem[] = [
  {
    label: 'Residential',
    href: '/residential',
    description: 'Layanan konstruksi dan renovasi untuk rumah tinggal Anda.',
    children: [
      { label: 'Bangun Rumah', href: '/residential/bangun-rumah-surabaya' },
      { label: 'Renovasi Besar', href: '/residential/renovasi-rumah-surabaya' },
      { label: 'Tambah Lantai', href: '/residential/tambah-lantai-rumah' },
      { label: 'Perbaikan dan Remedial', href: '/residential' },
      { label: 'HomeCare', href: '/residential' },
    ]
  },
  {
    label: 'Facility Care',
    href: '/facility-care',
    description: 'Layanan perawatan dan perbaikan untuk bangunan komersial dan institusi.',
    children: [
      { label: 'Maintenance Sekolah', href: '/facility-care/maintenance-sekolah' },
      { label: 'Maintenance Gedung', href: '/facility-care/maintenance-gedung' },
      { label: 'Waterproofing dan Atap', href: '/facility-care/waterproofing-dan-atap' },
      { label: 'Minor Works Industri', href: '/facility-care/minor-works-industri' },
    ]
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Cara Kerja', href: '/cara-kerja' },
  { label: 'ProjectView', href: '/projectview' },
  { label: 'Tentang', href: '/tentang' },
];

export const mainCta = {
  label: 'Konsultasikan Proyek',
  href: '/assessment',
};

export const footerNav: NavGroup[] = [
  {
    title: 'Layanan',
    items: [
      { label: 'Residential', href: '/residential' },
      { label: 'Facility Care', href: '/facility-care' },
      { label: 'Portfolio', href: '/portfolio' },
    ]
  },
  {
    title: 'Perusahaan',
    items: [
      { label: 'Tentang Kami', href: '/tentang' },
      { label: 'Cara Kerja', href: '/cara-kerja' },
      { label: 'Hubungi Kami', href: '/kontak' },
    ]
  },
  {
    title: 'Sistem Kami',
    items: [
      { label: 'ProjectView', href: '/projectview' },
      { label: 'BuildTrust Ecosystem', href: '/tentang' },
    ]
  },
  {
    title: 'Legal',
    items: [
      { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
      { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
    ]
  }
];
