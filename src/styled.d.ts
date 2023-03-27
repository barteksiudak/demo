import 'styled-components';
import { mainTheme } from './themes';

export type Theme = typeof mainTheme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
