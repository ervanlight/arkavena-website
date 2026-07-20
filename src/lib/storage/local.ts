import { MediaStorageProvider } from './interfaces';

export class LocalStorageProvider implements MediaStorageProvider {
  async uploadFile(file: File, path: string): Promise<string> {
    console.log(`[Local Storage] Pretending to upload ${file.name} to ${path}`);
    return `/media/${path}/${file.name}`;
  }

  async deleteFile(path: string): Promise<boolean> {
    console.log(`[Local Storage] Pretending to delete ${path}`);
    return true;
  }

  getFileUrl(path: string): string {
    return `/media/${path}`;
  }
}
