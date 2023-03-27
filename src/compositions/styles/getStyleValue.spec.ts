import getStyleValue from './getStyleValue';

describe('getStyleValue', () => {
  it('is getStyleValue', () => {
    expect(getStyleValue()).toBe('');
  });

  it("should add px if it's a number", () => {
    expect(getStyleValue(0)).toBe('0px');
    expect(getStyleValue(33)).toBe('33px');
  });

  it("should return untouched value if it's string", () => {
    expect(getStyleValue('33')).toBe('33');
    expect(getStyleValue('15%')).toBe('15%');
    expect(getStyleValue('auto')).toBe('auto');
  });
});
