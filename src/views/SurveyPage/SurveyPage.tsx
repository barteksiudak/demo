import { Survey } from '../../components/content';
import SurvayContainerStyled, { LoremThree, LoremTwo, SurvayAreaStyled } from './styled';

export default function SurveyPage(): JSX.Element {
  return (
    <SurvayContainerStyled>
      <SurvayAreaStyled>
        <Survey />
      </SurvayAreaStyled>
      <LoremTwo>In nisi adipisicing cupidatat anim pariatur laboris quis deserunt sunt sit.</LoremTwo>
      <LoremThree>
        Enim dolore magna tempor cillum labore dolore ad veniam. Quis nulla eu quis pariatur in sunt minim proident
        commodo occaecat. Amet ipsum fugiat tempor deserunt voluptate non. Consectetur eu exercitation proident ex ea
        commodo commodo dolor incididunt reprehenderit irure ut ad. Irure irure ut aute nostrud consequat do pariatur
        commodo dolore duis.
      </LoremThree>
    </SurvayContainerStyled>
  );
}
