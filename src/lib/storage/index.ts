import { MediaStorageProvider } from './interfaces';
import { LocalStorageProvider } from './local';

export const storage: MediaStorageProvider = new LocalStorageProvider();
