import config from '@config/app.config';

class StorageService {
  constructor(private storagePrefix = '') {}

  public setItem(key: string, value: string): void {
    const storageKey = this.getStorageKey(key);
    localStorage.setItem(storageKey, JSON.stringify(value));
  }

  public getItem(key: string): string | null {
    const storageKey = this.getStorageKey(key);
    return localStorage.getItem(storageKey);
  }

  public removeItem(key: string): void {
    const storageKey = this.getStorageKey(key);
    localStorage.removeItem(storageKey);
  }

  private getStorageKey(key: string): string {
    return `${this.storagePrefix}_${key}`;
  }
}

const storageService = new StorageService(config.STORAGE_PREFIX);

export { storageService };
