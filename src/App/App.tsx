import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppStyled from './AppStyled';

import { mainTheme } from '../themes';
import { MapRoots, roots } from './AppRouter';
import { NotificationProvider } from '../components';

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppStyled />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore: Unreachable code error */}
      <Router>
        <Switch>
          <QueryClientProvider client={queryClient}>
            <NotificationProvider>
              <MapRoots rootsList={roots} />
            </NotificationProvider>
          </QueryClientProvider>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
