import { 
  LeadRepository, PortfolioRepository, ContentRepository, 
  MediaRepository, TrustDocumentRepository, AppModuleRepository 
} from '../interfaces';
import { 
  Lead, LeadStatus, LeadQualification, PortfolioProject, 
  ProjectStatus, ManagedContent, PortfolioMedia, TrustDocument, AppModule 
} from '../../types';

export class MockLeadRepository implements LeadRepository {
  private leads: Lead[] = [
    {
      id: '1',
      reference: 'ARK-2026-A1B2',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '+628110000001',
      company: 'PT Maju Bersama',
      projectType: 'Renovasi Kantor',
      budget: 500000000,
      description: 'Butuh renovasi ruang kerja dan meeting room seluas 200m2.',
      status: LeadStatus.NEW,
      qualification: LeadQualification.PRIORITY,
      score: 60,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  async getLeads(): Promise<Lead[]> { return this.leads; }
  async getLead(id: string): Promise<Lead | null> { return this.leads.find(l => l.id === id) || null; }
  async createLead(lead: Partial<Lead>): Promise<Lead> {
    const newLead = { ...lead, id: Math.random().toString(), createdAt: new Date(), updatedAt: new Date() } as Lead;
    this.leads.push(newLead);
    return newLead;
  }
  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    const index = this.leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Not found');
    this.leads[index] = { ...this.leads[index], ...updates, updatedAt: new Date() };
    return this.leads[index];
  }
}

export class MockPortfolioRepository implements PortfolioRepository {
  private projects: PortfolioProject[] = [
    {
      id: 'p1',
      title: 'Pembangunan Rumah Tropis Modern',
      slug: 'rumah-tropis-modern',
      client: 'Keluarga Wijaya',
      description: 'Konstruksi rumah tinggal berkonsep tropis modern dengan ventilasi silang optimal.',
      location: 'Jakarta Selatan',
      completionDate: new Date('2025-10-15'),
      status: ProjectStatus.COMPLETED,
      services: ['Desain Arsitektur', 'Konstruksi Sipil'],
      featuredImage: '/images/demo/residential.jpg',
      published: false,
      createdAt: new Date()
    },
    {
      id: 'p2',
      title: 'Perawatan Gedung Sekolah Dasar',
      slug: 'perawatan-sekolah',
      client: 'Yayasan Pendidikan Mulia',
      description: 'Perbaikan fasilitas sanitasi, pengecatan ulang, dan perbaikan atap bocor.',
      location: 'Depok',
      completionDate: new Date('2026-01-20'),
      status: ProjectStatus.COMPLETED,
      services: ['Facility Maintenance', 'Plumbing', 'Painting'],
      featuredImage: '/images/demo/school.jpg',
      published: false,
      createdAt: new Date()
    },
    {
      id: 'p3',
      title: 'Waterproofing Rooftop Gedung Perkantoran',
      slug: 'waterproofing-office',
      client: 'PT Sinergi Bangun',
      description: 'Aplikasi membran bakar waterproofing untuk mengatasi kebocoran pada area rooftop.',
      location: 'Tangerang',
      completionDate: new Date('2026-03-05'),
      status: ProjectStatus.COMPLETED,
      services: ['Waterproofing'],
      featuredImage: '/images/demo/waterproofing.jpg',
      published: false,
      createdAt: new Date()
    }
  ];

  async getProjects(publishedOnly: boolean = true): Promise<PortfolioProject[]> {
    return publishedOnly ? this.projects.filter(p => p.published) : this.projects;
  }
  async getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
    return this.projects.find(p => p.slug === slug) || null;
  }
}

export class MockContentRepository implements ContentRepository {
  private contents: ManagedContent[] = [
    {
      id: 'c1',
      type: 'faq',
      key: 'faq-1',
      title: 'Apakah ARKAVENA menyediakan garansi pekerjaan?',
      content: 'Ya, setiap pekerjaan konstruksi dan perawatan kami dilengkapi dengan garansi retensi sesuai kesepakatan kontrak untuk memastikan kualitas hasil akhir.',
      order: 1,
      isActive: true
    },
    {
      id: 'c2',
      type: 'faq',
      key: 'faq-2',
      title: 'Berapa lama proses estimasi biaya (RAB) dibuat?',
      content: 'Setelah survei lokasi selesai, tim kami biasanya membutuhkan 3-5 hari kerja untuk menyusun Rencana Anggaran Biaya (RAB) yang komprehensif.',
      order: 2,
      isActive: true
    },
    {
      id: 'c3',
      type: 'process_step',
      key: 'process-1',
      title: 'Konsultasi & Survei',
      content: 'Diskusi awal kebutuhan Anda dilanjutkan dengan kunjungan tim teknis ke lokasi.',
      order: 1,
      isActive: true
    },
    {
      id: 'c4',
      type: 'process_step',
      key: 'process-2',
      title: 'Perencanaan & RAB',
      content: 'Pembuatan desain (jika diperlukan) dan penyusunan Rencana Anggaran Biaya yang transparan.',
      order: 2,
      isActive: true
    }
  ];

  async getContentByType(type: string): Promise<ManagedContent[]> {
    return this.contents.filter(c => c.type === type && c.isActive).sort((a, b) => a.order - b.order);
  }
}

export class MockAppModuleRepository implements AppModuleRepository {
  private modules: AppModule[] = [
    { id: 'm1', name: 'ProjectView', description: 'Pantau progress proyek secara real-time', icon: 'eye', isActive: true },
    { id: 'm2', name: 'ScopeLock', description: 'Transparansi cakupan pekerjaan dan biaya', icon: 'lock', isActive: true },
    { id: 'm3', name: 'SiteFlow', description: 'Laporan harian aktivitas di lapangan', icon: 'activity', isActive: true },
    { id: 'm4', name: 'Facility Passport', description: 'Rekam jejak digital aset properti Anda', icon: 'book', isActive: true }
  ];

  async getActiveModules(): Promise<AppModule[]> {
    return this.modules.filter(m => m.isActive);
  }
}

export class MockMediaRepository implements MediaRepository {
  async getProjectMedia(projectId: string): Promise<PortfolioMedia[]> { return []; }
}
export class MockTrustDocumentRepository implements TrustDocumentRepository {
  async getActiveDocuments(): Promise<TrustDocument[]> {
    return [
      { id: 't1', title: 'Sertifikat Badan Usaha (SBU) Konstruksi', type: 'certification', fileUrl: '#', isActive: true },
      { id: 't2', title: 'Izin Usaha Jasa Konstruksi (IUJK)', type: 'license', fileUrl: '#', isActive: true }
    ];
  }
}
