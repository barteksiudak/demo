import fetchMock from 'jest-fetch-mock';
import http, { DEFAULT_HEADERS, getHeaders, getResponseJson, validateResponse } from './http';
import { AnObject } from '../../types';

const JSON_ERROR_MESSAGE = 'Unexpected end of JSON input';
// https://github.com/facebook/jest/issues/5538
// eslint-disable-next-line @typescript-eslint/require-await
async function throws<T>(callbackFn: T, ...mock: unknown[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  callbackFn(...mock);
}

describe('http compositions', () => {
  describe('getHeaders', () => {
    it('is getHeaders', () => {
      expect(getHeaders()).toEqual(DEFAULT_HEADERS);
    });
  });

  describe('getResponseJson', () => {
    it('is getResponseJson', async () => {
      const responseMock = {
        status: 1,
        ok: true,
        headers: new Headers({ 'Content-Length': '1' }),
        json: jest.fn(() => Promise.resolve('data-mock')),
      } as unknown as Response;

      await expect(getResponseJson(responseMock)).resolves.toEqual({
        status: 1,
        ok: true,
        data: 'data-mock',
      });
    });
  });

  describe('validateResponse', () => {
    const mockData = { status: 1, ok: true, data: 'mock-data' };
    it('is validateResponse', () => {
      expect(validateResponse(mockData)).toEqual(mockData);
    });

    it('should handle not ok status', async () => {
      expect.assertions(1);
      try {
        await throws<typeof validateResponse>(validateResponse, { ...mockData, ok: false });
      } catch (e) {
        expect(String(e)).toContain('--response--');
      }
    });
  });

  describe('http', () => {
    it('is http and can handle bad json response', async () => {
      expect.assertions(1);

      fetchMock.once('', { headers: { 'Content-Length': '1' } });

      try {
        await http({ url: 'test' });
      } catch (e) {
        expect(String(e)).toContain(JSON_ERROR_MESSAGE);
      }
    });

    it('is http and can handle empty body', async () => {
      expect.assertions(1);

      const headers = { 'Content-Length': '0' };

      fetchMock.mockResponseOnce('{}', { status: 200, headers });

      const { data }: { data: AnObject } = await http({ url: '/test' });
      expect(data).toMatchObject({});
    });

    it('return a correct and parsed data', async () => {
      expect.assertions(1);

      fetchMock.mockOnce(JSON.stringify({ mockData: 'mock-data' }));

      const { data }: { data: AnObject } = await http({ url: '/test-domain' });
      expect(data.mockData).toBe('mock-data');
    });
  });
});
