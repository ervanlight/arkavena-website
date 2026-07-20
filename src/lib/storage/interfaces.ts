export interface MediaStorageProvider {
  uploadFile(file: File, path: string): Promise<string>;
  deleteFile(path: string): Promise<boolean>;
  getFileUrl(path: string): string;
}
