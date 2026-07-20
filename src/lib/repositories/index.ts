import { 
  LeadRepository, PortfolioRepository, ContentRepository,
  MediaRepository, TrustDocumentRepository, AppModuleRepository
} from './interfaces';
import { 
  MockLeadRepository, MockPortfolioRepository, MockContentRepository,
  MockMediaRepository, MockTrustDocumentRepository, MockAppModuleRepository
} from './mock';

class RepositoryFactory {
  getLeadRepository(): LeadRepository {
    return new MockLeadRepository();
  }
  
  getPortfolioRepository(): PortfolioRepository {
    return new MockPortfolioRepository();
  }
  
  getContentRepository(): ContentRepository {
    return new MockContentRepository();
  }

  getMediaRepository(): MediaRepository {
    return new MockMediaRepository();
  }

  getTrustDocumentRepository(): TrustDocumentRepository {
    return new MockTrustDocumentRepository();
  }

  getAppModuleRepository(): AppModuleRepository {
    return new MockAppModuleRepository();
  }
}

export const repositories = new RepositoryFactory();
