import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import AppStyled from './AppStyled';

import { mainTheme } from '../themes';
import { MapRoots, roots } from './AppRouter';
import { store } from '../redux';
import { NotificationProvider } from '../components';

export default function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}
