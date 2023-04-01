import { Survey } from '../../components/content';
import SurvayContainerStyled, { SurvayAreaStyled } from './styled';

export default function SurveyPage(): JSX.Element {
  return (
    <SurvayContainerStyled>
      <SurvayAreaStyled>
        <Survey />
      </SurvayAreaStyled>
    </SurvayContainerStyled>
  );
}
