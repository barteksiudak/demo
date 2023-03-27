import { ReactNode } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { LandingPage, PageNotFound } from '../views';
import { Container, Header, RouteContent } from '../components';
import { LANDING_PAGE, PAGE_NOT_FOUND } from '../routes';

type RootProps = {
  key: string;
  icon: string;
  component: RouteProps['component'];
  path: string;
  title: string;
  exact?: boolean;
};

function RouteComponent({ children }: { children: ReactNode }) {
  return (
    <RouteContent>
      <Header />
      <Container>{children}</Container>
    </RouteContent>
  );
}

export const sideNavRoots: RootProps[] = [
  {
    key: 'landing-page',
    icon: '',
    component: () => (
      <RouteComponent>
        <LandingPage />
      </RouteComponent>
    ),
    path: LANDING_PAGE.path,
    exact: true,
    title: LANDING_PAGE.title,
  },
];

export const roots: RootProps[] = [
  {
    key: 'page-not-found',
    icon: '',
    component: () => (
      <RouteComponent>
        <PageNotFound />
      </RouteComponent>
    ),
    path: PAGE_NOT_FOUND.path,
    exact: true,
    title: LANDING_PAGE.title,
  },
  ...sideNavRoots,
];

export function MapRoots({ rootsList: list }: { rootsList: RootProps[] }): JSX.Element {
  return (
    <>
      {list.map(({ key, exact, path, component }) => (
        <Route key={key} path={path} component={component} exact={exact} />
      ))}
    </>
  );
}
