import { AnObject } from '../../types';

export default function getEndpoint(endpoint: string, attrs?: AnObject): string {
  if (!attrs) {
    return endpoint;
  }

  return Object.entries(attrs).reduce((acc, [key, value]) => acc.replace(`:${key}`, value), endpoint);
}
