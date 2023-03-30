import { Nullable } from '../../../types';
import HeaderStyled from './HeaderStyled';
import { Button, Text } from '../../ui';

export default function Header(): Nullable<JSX.Element> {
  return (
    <HeaderStyled>
      <Button asLink href="/" tabIndex={-1}>
        <Text color="text" typography="h3">
          Demo
        </Text>
      </Button>
    </HeaderStyled>
  );
}
