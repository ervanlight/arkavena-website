import {
  Lead,
  PortfolioProject,
  PortfolioMedia,
  TrustDocument,
  AppModule,
  ManagedContent,
  SiteSetting
} from '../types';

export interface LeadRepository {
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | null>;
  createLead(lead: Partial<Lead>): Promise<Lead>;
  updateLead(id: string, updates: Partial<Lead>): Promise<Lead>;
}

export interface PortfolioRepository {
  getProjects(publishedOnly?: boolean): Promise<PortfolioProject[]>;
  getProjectBySlug(slug: string): Promise<PortfolioProject | null>;
}

export interface ContentRepository {
  getContentByType(type: string): Promise<ManagedContent[]>;
}

export interface MediaRepository {
  getProjectMedia(projectId: string): Promise<PortfolioMedia[]>;
}

export interface TrustDocumentRepository {
  getActiveDocuments(): Promise<TrustDocument[]>;
}

export interface AppModuleRepository {
  getActiveModules(): Promise<AppModule[]>;
}

export interface SiteSettingsRepository {
  getSettings(): Promise<SiteSetting[]>;
  getSetting(key: string): Promise<SiteSetting | null>;
}
