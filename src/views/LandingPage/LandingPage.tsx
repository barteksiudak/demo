import { useHistory } from 'react-router-dom';
import ContainerStyled, { LoremOne, LoremThree, LoremTwo, StartTestStyled } from './styled';
import { Button, Text } from '../../components/ui';
import { SURVEY_PAGE } from '../../routes';

export default function LandingPage(): JSX.Element {
  const history = useHistory();

  const goToSurvey = () => {
    history.push(SURVEY_PAGE.path);
  };

  return (
    <ContainerStyled>
      <StartTestStyled>
        <Text typography="h3">Are you an introvert or an extrovert?</Text>
        <Text inline={false}>
          Tempor adipisicing magna amet eiusmod proident sunt officia. Veniam proident proident minim ipsum labore esse
          nisi aliqua sint nisi irure elit ad adipisicing. Nostrud dolore magna anim sit consectetur nulla voluptate.
          Proident proident eiusmod enim qui velit aliquip amet dolor. Proident eiusmod adipisicing velit proident
          commodo et nostrud. Cillum irure officia consectetur quis esse consequat eiusmod et. Aliqua qui ullamco do
          veniam nisi sint reprehenderit. Incididunt consectetur qui labore ea nostrud voluptate ullamco officia
          deserunt. Laboris duis et duis ea ullamco ullamco. Consectetur eu eiusmod ea in dolor. Deserunt veniam
          occaecat excepteur cillum duis. Nulla ut qui ad irure aliquip nostrud sit minim incididunt sint do. Quis
          occaecat do dolor enim proident minim minim nulla occaecat laboris. Culpa in veniam ut irure tempor aliquip
          commodo amet non.
        </Text>
        <Text right>
          <Button tabIndex={0} onClick={goToSurvey}>
            Begin your test now!
          </Button>
        </Text>
      </StartTestStyled>
      <LoremOne>
        Cillum irure officia consectetur quis esse consequat eiusmod et. Aliqua qui ullamco do veniam nisi sint
        reprehenderit. Incididunt consectetur qui labore ea nostrud voluptate ullamco officia deserunt. Laboris duis et
        duis ea ullamco ullamco. Consectetur eu eiusmod ea in dolor. Deserunt veniam occaecat excepteur cillum duis.
        Nulla ut qui ad irure aliquip nostrud sit minim incididunt sint do. Quis occaecat do dolor enim proident minim
        minim nulla occaecat laboris. Culpa in veniam ut irure tempor aliquip commodo amet non.
      </LoremOne>
      <LoremTwo>Aute elit deserunt id ad nulla Lorem irure eu. Aute elit deserunt id ad nulla Lorem irure eu.</LoremTwo>
      <LoremThree>Aute elit deserunt id ad nulla Lorem irure eu.</LoremThree>
    </ContainerStyled>
  );
}
