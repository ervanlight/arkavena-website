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
      { label: 'Bangun Rumah', href: '/services/bangun-rumah' },
      { label: 'Renovasi Besar', href: '/services/renovasi-besar' },
      { label: 'Tambah Lantai', href: '/services/tambah-lantai' },
      { label: 'Perbaikan dan Remedial', href: '/services/perbaikan-remedial' },
      { label: 'HomeCare', href: '/services/homecare' },
    ]
  },
  {
    label: 'Facility Care',
    href: '/facility-care',
    description: 'Layanan perawatan dan perbaikan untuk bangunan komersial dan institusi.',
    children: [
      { label: 'Maintenance Sekolah', href: '/services/maintenance-sekolah' },
      { label: 'Maintenance Gedung', href: '/services/maintenance-gedung' },
      { label: 'Waterproofing dan Atap', href: '/services/waterproofing-atap' },
      { label: 'Minor Works Industri', href: '/services/minor-works-industri' },
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
      { label: 'Karir', href: '/karir' },
      { label: 'Hubungi Kami', href: '/kontak' },
    ]
  },
  {
    title: 'Sistem Kami',
    items: [
      { label: 'ProjectView', href: '/projectview' },
      { label: 'BuildTrust Ecosystem', href: '/ecosystem' },
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
