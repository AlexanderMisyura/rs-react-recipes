import { fileToBase64 } from './file-to-base64';

describe('fileToBase64', () => {
  const mockFile = new File(['content'], 'test.png', { type: 'image/png' });
  const mockBase64 = 'data:image/png;base64,Y29udGVudA==';

  it('should resolve with a base64 string on successful read', async () => {
    const mockReader = {
      readAsDataURL: vi.fn(),
      onload: vi.fn(),
      onerror: vi.fn(),
      result: mockBase64,
    };
    vi.spyOn(window, 'FileReader').mockImplementation(() => mockReader as unknown as FileReader);

    const promise = fileToBase64(mockFile);
    mockReader.onload();

    await expect(promise).resolves.toBe(mockBase64);
    expect(mockReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
  });

  it('should reject with an error on failed read', async () => {
    const mockReader = {
      readAsDataURL: vi.fn(),
      onload: vi.fn(),
      onerror: vi.fn(),
      target: { error: { message: 'Test error' } },
    };
    vi.spyOn(window, 'FileReader').mockImplementation(() => mockReader as unknown as FileReader);

    const promise = fileToBase64(mockFile);
    mockReader.onerror({ target: { error: { message: 'Test error' } } });

    await expect(promise).rejects.toThrow('Test error');
  });
});
