import styled from 'styled-components';
import { getStyleValue } from '../../../compositions';
import currentTheme from '../../../themes';

export default styled.div<{ gapSize: keyof typeof currentTheme.size }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gapSize, theme: { size: sizes } }) => getStyleValue(sizes[gapSize])};
`;

export const ActionButtonsStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme: { size } }) => getStyleValue(size.l)};
`;
