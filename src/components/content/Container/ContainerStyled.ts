import styled from 'styled-components';
import { getStyleValue } from '../../../compositions';

export default styled.div(
  ({
    theme: {
      content: {
        padding: { top, left },
      },
      breakpoints: { tablet },
    },
  }) => {
    return `
      padding: ${getStyleValue(top)} ${getStyleValue(left)}};
      @media screen and (max-width: ${getStyleValue(tablet)}) {
        padding: 0;
      }
    `;
  },
);

export const ContainerContentStyled = styled.div(
  ({
    theme: {
      size: { sm: topSpacing },
    },
  }) => {
    return `
      flex: 1;
      height: fit-content;
      margin-top: ${getStyleValue(topSpacing)};
    `;
  },
);

export const Paper = styled.div(
  ({ theme: { color, size } }) => `
    padding: ${getStyleValue(size.s)};
    background-color: ${color.contrast};
    border-radius: ${getStyleValue(size.xs)};
    width: 100%;
  `,
);
