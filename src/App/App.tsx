import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import AppStyled from './AppStyled';

import { mainTheme } from '../themes';
import { MapRoots, roots } from './AppRouter';
import { NotificationProvider } from '../components';

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppStyled />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore: Unreachable code error */}
      <Router>
        <Switch>
          <NotificationProvider>
            <MapRoots rootsList={roots} />
          </NotificationProvider>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
