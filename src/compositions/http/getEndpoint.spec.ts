import getEndpoint from './getEndpoint';

describe('getEndpoint', () => {
  it('is getEndpoint', () => {
    expect(getEndpoint('')).toBe('');
  });

  it('should return untouched endpoint', () => {
    const endpointMock = 'https://google.com';
    expect(getEndpoint(endpointMock)).toBe(endpointMock);
  });

  it('should replace only one attr', () => {
    const endpoint = '/my/:id';
    const attrs = {
      id: 'my-id',
    };
    const expectation = `/my/${attrs.id}`;
    expect(getEndpoint(endpoint, attrs)).toBe(expectation);
  });

  it('should replace :id and :test', () => {
    const endpoint = '/my/long/:id/test/endpoint/:test';
    const attrs = {
      test: 'my-test',
      id: 'my-id',
      nothing: 'my-nothing',
    };
    const expectation = `/my/long/${attrs.id}/test/endpoint/${attrs.test}`;
    expect(getEndpoint(endpoint, attrs)).toBe(expectation);
  });
});
