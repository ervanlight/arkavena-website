export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  ASSESSING = 'ASSESSING',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATING = 'NEGOTIATING',
  WON = 'WON',
  LOST = 'LOST'
}

export enum LeadQualification {
  PRIORITY = 'PRIORITY',
  QUALIFIED = 'QUALIFIED',
  NURTURE = 'NURTURE',
  REVIEW = 'REVIEW',
  NOT_SUITABLE = 'NOT_SUITABLE'
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Lead {
  id: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget?: number;
  timeline?: string;
  description: string;
  status: LeadStatus;
  qualification?: LeadQualification;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadAttachment {
  id: string;
  leadId: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  createdAt: Date;
}

export interface LeadNote {
  id: string;
  leadId: string;
  content: string;
  createdBy: string;
  createdAt: Date;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  type: string;
  description: string;
  createdAt: Date;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  client: string;
  description: string;
  location: string;
  completionDate: Date;
  status: ProjectStatus;
  services: string[];
  featuredImage: string;
  published: boolean;
  createdAt: Date;
}

export interface PortfolioMedia {
  id: string;
  projectId: string;
  url: string;
  type: 'image' | 'video';
  alt: string;
  order: number;
}

export interface TrustDocument {
  id: string;
  title: string;
  type: 'certification' | 'license' | 'insurance';
  fileUrl: string;
  expiryDate?: Date;
  isActive: boolean;
}

export interface AppModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export interface ManagedContent {
  id: string;
  type: 'faq' | 'process_step' | 'testimonial';
  key: string;
  title: string;
  content: string;
  order: number;
  isActive: boolean;
  meta?: any;
}

export interface SiteSetting {
  key: string;
  value: any;
}
