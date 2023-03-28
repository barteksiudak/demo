import styled from 'styled-components';
import { ContainerStyled, Paper } from '../../components/content/Container';

export default styled(ContainerStyled)`
  max-width: 1200px;
  margin: auto;

  grid-template-columns: 1fr 1fr 1fr 1fr;

  grid-template-rows: auto;

  grid-template-areas:
    'survayArea survayArea survayArea survayArea'
    'loremTwo loremTwo loremThree loremThree';
`;

export const SurvayAreaStyled = styled(Paper)`
  display: block;
  grid-area: survayArea;
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
