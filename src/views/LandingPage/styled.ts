import styled from 'styled-components';
import { ContainerStyled, Paper } from '../../components/content/Container';
import { getStyleValue } from '../../compositions';

export default styled(ContainerStyled)`
  grid-template-columns: 1fr 1fr 1fr 1fr;

  grid-template-rows: auto;

  grid-template-areas:
    'startTest startTest startTest loremOne'
    'loremTwo loremTwo loremThree loremThree';

  ${({
    theme: {
      breakpoints: { tablet },
    },
  }) => `
    @media screen and (max-width: ${getStyleValue(tablet)}) {
      grid-template-areas:
        'startTest startTest startTest startTest'
        'loremOne loremOne loremOne loremOne'
        'loremTwo loremTwo loremTwo loremTwo'
        'loremThree loremThree loremThree loremThree';
    }
  `}
`;

export const StartTestStyled = styled(Paper)`
  display: block;
  grid-area: startTest;
`;

export const LoremOne = styled(Paper)`
  grid-area: loremOne;
`;

export const LoremTwo = styled(Paper)`
  grid-area: loremTwo;
`;

export const LoremThree = styled(Paper)`
  grid-area: loremThree;
`;
