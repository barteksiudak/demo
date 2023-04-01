import { Button, Spinner, Text } from '../../ui';
import { ActionButtonsStyled } from './styled';

type ResultProps = {
  title?: string;
  text?: string;
  isLoading: boolean;
  goToFirstQuestion: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  resetSurvey: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
};

export default function Result({ title, text, isLoading, resetSurvey, goToFirstQuestion }: ResultProps): JSX.Element {
  if (isLoading) {
    return <Spinner />;
  }

  if (!text) {
    return <></>;
  }

  return (
    <>
      <Text typography="h3" inline={false}>
        {title}
      </Text>
      {text}
      <ActionButtonsStyled>
        <Button asLink onClick={goToFirstQuestion}>
          Show my answers
        </Button>
        <Button asLink disabled={isLoading} onClick={resetSurvey}>
          Re-take test
        </Button>
      </ActionButtonsStyled>
    </>
  );
}
