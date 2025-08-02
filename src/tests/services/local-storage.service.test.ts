import config from '@config/app.config';
import { storageService } from '@services';

const { DATA_PREFIX } = config;
const TEST_KEY = 'key';
const TEST_VALUE = 'value';

const storage = new Map<string, string>();

const mockedStorage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

beforeAll(() => {
  vi.stubGlobal('localStorage', mockedStorage);
});

afterEach(() => {
  storage.clear();
});

afterAll(() => {
  vi.unstubAllGlobals();
});

describe('StorageService', () => {
  it('should save value to localStorage', () => {
    storageService.setItem(TEST_KEY, TEST_VALUE);

    const key = `${DATA_PREFIX}_${TEST_KEY}`;
    const value = localStorage.getItem(key);

    expect(value).toBe(TEST_VALUE);
  });

  it('should get value from localStorage', () => {
    const key = `${DATA_PREFIX}_${TEST_KEY}`;
    localStorage.setItem(key, TEST_VALUE);

    const value = storageService.getItem(TEST_KEY);

    expect(value).toBe(TEST_VALUE);
  });

  it('should remove value from localStorage', () => {
    const key = `${DATA_PREFIX}_${TEST_KEY}`;

    localStorage.setItem(key, TEST_VALUE);
    storageService.removeItem(TEST_KEY);

    expect(localStorage.getItem(`${DATA_PREFIX}_${TEST_KEY}`)).toBe(null);
  });
});
