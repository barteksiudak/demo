import { useQuery, useMutation } from 'react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { analysePersonality, AnalyseResponse, getSurvey } from '../../../api/survey';
import { Button, Spinner, Text } from '../../ui';
import { Nullable, Survey as SurveyData, Request } from '../../../types';
import Answers from './Answers';
import SurveyContainerStyled, { ActionButtonsStyled } from './styled';

export default function Survey(): JSX.Element {
  const [isValid, setIsValid] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [analyse, setAnalyse] = useState('');

  const analysedAnswersRef = useRef<string[]>([]);
  const httpRef = useRef<Request<AnalyseResponse>>();

  const { data: questions, isLoading } = useQuery<SurveyData[]>('servey', () => getSurvey());

  const authMutation = useMutation(
    (payload: string[]) => {
      if (httpRef.current && httpRef.current.cancel) {
        httpRef.current.cancel();
      }
      httpRef.current = analysePersonality(payload);
      return httpRef.current;
    },
    {
      onSuccess: (response) => {
        const { data } = response as { data: { analyse: string } };
        setAnalyse(data.analyse);
        analysedAnswersRef.current = answers;
      },
      onError: (response) => {
        // eslint-disable-next-line no-console
        console.error(response);
      },
    },
  );

  const questionsLastIndex = useMemo((): Nullable<number> => {
    if (!questions) {
      return null;
    }

    return questions.length - 1;
  }, [questions]);

  useEffect(() => {
    setIsValid(false);
  }, [questions]);

  useEffect(() => {
    const canSendForm = String(analysedAnswersRef.current) !== String(answers) || questionIndex !== questionsLastIndex;
    setIsValid(!!answers[questionIndex] && canSendForm);
  }, [answers, questionIndex, questionsLastIndex]);

  const isLastQuestion = useMemo(
    (): boolean => questionIndex === questionsLastIndex,
    [questionIndex, questionsLastIndex],
  );

  const goNext = useCallback(() => {
    if (isLastQuestion) {
      authMutation.mutate(answers);
      setIsValid(false);
      return;
    }
    setQuestionIndex((currentIndex) => currentIndex + 1);
  }, [answers, authMutation, isLastQuestion]);

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
          <Button tabIndex={currentQuestion.answers.length + 1} disabled={!isValid || isLoading} isLoading={isLoading}>
            {isLastQuestion ? 'Submit form' : 'Next question'}
          </Button>
        </ActionButtonsStyled>
      </form>
      {analyse && (
        <Text typography="h3" inline={false}>
          Your analyse!
        </Text>
      )}
      {analyse}
    </SurveyContainerStyled>
  );
}
