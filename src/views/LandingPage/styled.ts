import styled from 'styled-components';
import { ContainerStyled, Paper } from '../../components/content/Container';

export default styled(ContainerStyled)`
  grid-template-columns: 1fr 1fr 1fr 1fr;

  grid-template-rows: auto;

  grid-template-areas:
    'startTest startTest startTest loremOne'
    'loremTwo loremTwo loremThree loremThree';
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
