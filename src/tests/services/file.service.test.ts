import config from '@config/app.config';
import { fileService } from '@services';

const TEST_URL = 'blob:http://localhost:5173/52fe6a8f-4c72-425e-9c85-5706c8c510d1';
const FILE_CONTENT = `id,name,image,ingredients/0,ingredients/1,ingredients/2
2,test_name-2,test_image-2,test_ingredient-2-1,test_ingredient-2-2,test_ingredient-2-3
1,test_name-1,test_image-1,test_ingredient-1-1,test_ingredient-1-2,test_ingredient-1-3
`;

beforeEach(() => {
  URL.createObjectURL = vi.fn().mockReturnValue(TEST_URL);
  URL.revokeObjectURL = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('FileService', () => {
  it('should create a correct url and file name', () => {
    const { url, fileName } = fileService.createDownloadable(
      FILE_CONTENT,
      'text/csv',
      '2-items.csv'
    );

    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(url).toBe(TEST_URL);
    expect(fileName).toBe(`${config.DATA_PREFIX}_2-items.csv`);
  });
});
