import { useQuery, useMutation } from 'react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { analysePersonality, AnalyseResponse, getSurvey } from '../../../api/survey';
import { Button, Spinner, Text } from '../../ui';
import { Nullable, Survey as SurveyData, Request } from '../../../types';
import Answers from './Answers';
import SurveyContainerStyled, { ActionButtonsStyled } from './styled';
import Analyse from './Analyse';

export default function Survey(): JSX.Element {
  const [isValid, setIsValid] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [analyse, setAnalyse] = useState('');

  const analysedAnswersRef = useRef<string[]>([]);
  const httpRef = useRef<Request<AnalyseResponse>>();

  const history = useHistory();
  const { data: questions, isLoading, refetch } = useQuery<SurveyData[]>('servey', () => getSurvey());

  const analyseMutation = useMutation(
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

  const showAnalyse = useMemo((): boolean => {
    return new URLSearchParams(history.location.search).get('show') === 'analyse' && !!analyse;
  }, [history.location.search, analyse]);

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
    const isReviewingAnswers = questionIndex === questionsLastIndex && !!analyse;
    const canSendForm =
      String(analysedAnswersRef.current) !== String(answers) ||
      questionIndex !== questionsLastIndex ||
      isReviewingAnswers;
    setIsValid(!!answers[questionIndex] && canSendForm);
  }, [analyse, answers, questionIndex, questionsLastIndex]);

  const isLastQuestion = useMemo(
    (): boolean => questionIndex === questionsLastIndex,
    [questionIndex, questionsLastIndex],
  );

  const goNext = useCallback(() => {
    if (isLastQuestion) {
      if (!analyse) {
        analyseMutation.mutate(answers);
      }
      history.push({ search: '?show=analyse' });
      return;
    }
    history.push({ search: '' });
    setQuestionIndex((currentIndex) => currentIndex + 1);
  }, [isLastQuestion, history, analyse, analyseMutation, answers]);

  const goToFirstQuestion = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault();

      setQuestionIndex(0);
      history.push({ search: '' });
    },
    [history],
  );

  const resetSurvey = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      e.preventDefault();

      analysedAnswersRef.current = [];
      refetch().catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
      setIsValid(true);
      setAnalyse('');
      setQuestionIndex(0);
      setAnswers([]);
      history.push({ search: '' });
    },
    [history, refetch],
  );

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

    history.push({ search: '' });
    setQuestionIndex((currentIndex) => currentIndex - 1);
  };

  const finishTestText = analyse ? 'Show analyse' : 'Submit form';

  return (
    <SurveyContainerStyled gapSize="m">
      {!showAnalyse && (
        <>
          <Text inline={false}>
            Question {questionIndex + 1}/{questions.length}
          </Text>
          <Text typography="h5">{currentQuestion.label}</Text>
          <form name="survey" onSubmit={handleSubmit}>
            <Answers
              question={currentQuestion}
              onChange={handleChangeAnswer}
              selected={answers[questionIndex]}
              reviewMode={!!analyse}
            />
            <ActionButtonsStyled>
              {questionIndex > 0 && (
                <Button tabIndex={currentQuestion.answers.length + 2} asLink onClick={goBack}>
                  Previous
                </Button>
              )}
              <Button
                tabIndex={currentQuestion.answers.length + 1}
                disabled={!isValid || isLoading}
                isLoading={isLoading}
              >
                {isLastQuestion ? finishTestText : 'Next question'}
              </Button>
            </ActionButtonsStyled>
          </form>
        </>
      )}
      {showAnalyse && (
        <Analyse
          goToFirstQuestion={goToFirstQuestion}
          resetSurvey={resetSurvey}
          isLoading={analyseMutation.isLoading}
          text={analyse}
        />
      )}
    </SurveyContainerStyled>
  );
}
