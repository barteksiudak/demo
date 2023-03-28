import { useMemo, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import * as routes from '../../../routes';

import { Text } from '../../ui';
import MainContainerStyled, { ContainerContentStyled } from './ContainerStyled';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps): JSX.Element {
  const history = useHistory();

  const title = useMemo(() => {
    const { title: currentTitle } = Object.values(routes).find(({ path }) => history.location.pathname === path) || {
      title: '',
    };

    return currentTitle || '';
  }, [history]);

  return (
    <MainContainerStyled>
      <Text typography="h5">{title}</Text>
      <ContainerContentStyled>{children}</ContainerContentStyled>
    </MainContainerStyled>
  );
}
