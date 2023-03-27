import { ReactNode } from 'react';
import RouteContentStyled from './RouteContentStyled';

export default function RouteContent({ children }: { children: ReactNode }): JSX.Element {
  return <RouteContentStyled>{children}</RouteContentStyled>;
}
