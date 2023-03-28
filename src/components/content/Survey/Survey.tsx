import { useQuery } from 'react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSurvey } from '../../../api/survey';
import { Button, Spinner, Text } from '../../ui';
import { Survey as SurveyData } from '../../../types';
import Answers from './Answers';
import SurveyContainerStyled, { ActionButtonsStyled } from './styled';

export default function Survey(): JSX.Element {
  const [isValid, setIsValid] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const { data: questions, isLoading } = useQuery<SurveyData[]>('servey', () => getSurvey());

  useEffect(() => {
    setIsValid(false);
  }, [questions]);

  useEffect(() => {
    setIsValid(!!answers[questionIndex]);
  }, [answers, questionIndex]);

  const isLastQuestion = useMemo(
    (): boolean => !!questions && questionIndex === questions.length - 1,
    [questionIndex, questions],
  );

  const goNext = useCallback(() => {
    if (isLastQuestion) {
      console.log('Send the form!', answers);
      return;
    }
    setQuestionIndex((currentIndex) => currentIndex + 1);
  }, [answers, isLastQuestion]);

  if (!questions || isLoading) {
    return <Spinner />;
  }

  const currentQuestion = questions[questionIndex];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const checkedElement = (e.target as HTMLFormElement).querySelector('input[type="checkbox"]:checked');

    if (!checkedElement) {
      return;
    }

    goNext();
  };

  const handleChangeAnswer = (answerId: string) => {
    setAnswers((currentAnswers) => {
      const currentAnswersCopy = [...currentAnswers];
      currentAnswersCopy.splice(questionIndex, 1, answerId);
      return currentAnswersCopy;
    });
    setIsValid(true);
  };

  const goBack = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();

    setQuestionIndex((currentIndex) => currentIndex - 1);
  };

  return (
    <SurveyContainerStyled gapSize="m">
      <Text inline={false}>
        Question {questionIndex + 1}/{questions.length}
      </Text>
      <Text typography="h5">{currentQuestion.label}</Text>
      <form name="survey" onSubmit={handleSubmit}>
        <Answers question={currentQuestion} onChange={handleChangeAnswer} selected={answers[questionIndex]} />
        <ActionButtonsStyled>
          {questionIndex > 0 && (
            <Button tabIndex={currentQuestion.answers.length + 2} asLink onClick={goBack}>
              Previous
            </Button>
          )}
          <Button tabIndex={currentQuestion.answers.length + 1} disabled={!isValid} isLoading={isLoading}>
            {isLastQuestion ? 'Submit form' : 'Next question'}
          </Button>
        </ActionButtonsStyled>
      </form>
    </SurveyContainerStyled>
  );
}
