export interface TrustDocument {
  id: string;
  title: string;
  description: string;
  documentType: 'Legal' | 'Sertifikasi' | 'Asuransi' | 'Kebijakan';
  fileUrl?: string; // Optional for placeholder
  isConfidential: boolean;
  validUntil?: string;
}

export interface TrustCategory {
  category: string;
  documents: TrustDocument[];
}

export const trustDocuments: TrustCategory[] = [
  {
    category: 'Legalitas Perusahaan',
    documents: [
      {
        id: 'doc-legal-1',
        title: 'Akta Pendirian Perusahaan',
        description: 'Dokumen sah pendirian badan usaha berbadan hukum.',
        documentType: 'Legal',
        isConfidential: true
      },
      {
        id: 'doc-legal-2',
        title: 'Nomor Induk Berusaha (NIB)',
        description: 'Identitas pelaku usaha dalam rangka pelaksanaan kegiatan berusaha.',
        documentType: 'Legal',
        isConfidential: false
      }
    ]
  },
  {
    category: 'Sertifikasi Kepatuhan & Standar',
    documents: [
      {
        id: 'doc-cert-1',
        title: 'Standar K3 Konstruksi',
        description: 'Kepatuhan terhadap standar Keselamatan dan Kesehatan Kerja pada proyek.',
        documentType: 'Sertifikasi',
        isConfidential: false
      }
    ]
  },
  {
    category: 'Asuransi & Perlindungan',
    documents: [
      {
        id: 'doc-ins-1',
        title: 'Asuransi Konstruksi (CAR)',
        description: 'Contractor All Risk policy untuk perlindungan komprehensif pada proyek terpilih.',
        documentType: 'Asuransi',
        isConfidential: true
      }
    ]
  }
];
