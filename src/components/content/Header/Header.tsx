import { Nullable } from '../../../types';
import HeaderStyled from './HeaderStyled';
import { Text } from '../../ui';

export default function Header(): Nullable<JSX.Element> {
  return (
    <HeaderStyled>
      <Text typography="h3">Demo</Text>
    </HeaderStyled>
  );
}
