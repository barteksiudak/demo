import { ReactNode } from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { SurveyPage, LandingPage } from '../views';
import { Container, Header, RouteContent } from '../components';
import { SURVEY_PAGE, LANDING_PAGE } from '../routes';

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

export const roots: RootProps[] = [
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
  {
    key: 'survay-page',
    icon: '',
    component: () => (
      <RouteComponent>
        <SurveyPage />
      </RouteComponent>
    ),
    path: SURVEY_PAGE.path,
    exact: true,
    title: SURVEY_PAGE.title,
  },
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
