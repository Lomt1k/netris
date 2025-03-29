import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchVideoMarks } from './VideoMark';
import { mockVideoMarks } from './__mocks__/videoMarks';

describe('fetchVideoMarks', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Возвращает данные при успешном запросе', async () => {
    const mockData = mockVideoMarks;
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    }) as unknown as typeof fetch;

    const result = await fetchVideoMarks('test-url');

    expect(result).toEqual(mockData);
    expect(globalThis.fetch).toHaveBeenCalledWith('test-url');
  });

  it('Бросает ошибку при неудачном запросе', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    }) as unknown as typeof fetch;

    await expect(fetchVideoMarks('test-url')).rejects.toThrow('Not Found');
  });
});