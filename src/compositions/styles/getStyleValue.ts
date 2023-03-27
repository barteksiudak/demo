export default function getStyleValue(value?: string | number): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return String(value || '');
}
