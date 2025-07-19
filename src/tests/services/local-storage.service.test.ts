import config from '@config/app.config';
import { storageService } from '@services';

const { STORAGE_PREFIX } = config;
const TEST_KEY = 'key';

afterEach(() => {
  localStorage.removeItem(`${STORAGE_PREFIX}_${TEST_KEY}`);
});

describe('StorageService', () => {
  it('should save and get value from localStorage', () => {
    storageService.setItem(TEST_KEY, 'value');
    const value = storageService.getItem(TEST_KEY);
    expect(value).toBe('value');
  });

  it('should remove value from localStorage', () => {
    localStorage.setItem(`${STORAGE_PREFIX}_${TEST_KEY}`, 'value');
    storageService.removeItem(TEST_KEY);
    expect(localStorage.getItem(`${STORAGE_PREFIX}${TEST_KEY}`)).toBe(null);
  });
});
