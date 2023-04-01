import { useQuery, useMutation } from 'react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { analyzePersonality, getSurvey } from '../../../api/survey';
import { Button, Spinner, Text } from '../../ui';
import { Nullable, Survey as SurveyData, Request, Result } from '../../../types';
import Answers from './Answers';
import SurveyContainerStyled, { ActionButtonsStyled } from './styled';
import ResultComponent from './Result';

export default function Survey(): JSX.Element {
  const [isValid, setIsValid] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [result, setResult] = useState<Result>();

  const cachedAnswersRef = useRef<string[]>([]);
  const httpRef = useRef<Request<Result>>();

  const history = useHistory();
  const { data: questions, isFetching, refetch } = useQuery<SurveyData[]>('servey', () => getSurvey());

  const surveyMutation = useMutation(
    (payload: string[]) => {
      if (httpRef.current && httpRef.current.cancel) {
        httpRef.current.cancel();
      }
      httpRef.current = analyzePersonality(payload);
      return httpRef.current;
    },
    {
      onSuccess: (response) => {
        const { data } = response as { data: Result };
        setResult(data);
        cachedAnswersRef.current = answers;
      },
      onError: (response) => {
        // eslint-disable-next-line no-console
        console.error(response);
      },
    },
  );

  const showResult = useMemo((): boolean => {
    return new URLSearchParams(history.location.search).get('show') === 'result' && !!result;
  }, [history.location.search, result]);

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
    const isReviewingAnswers = questionIndex === questionsLastIndex && !!result;
    const canSendForm =
      String(cachedAnswersRef.current) !== String(answers) ||
      questionIndex !== questionsLastIndex ||
      isReviewingAnswers;
    setIsValid(!!answers[questionIndex] && canSendForm);
  }, [result, answers, questionIndex, questionsLastIndex]);

  const isLastQuestion = useMemo(
    (): boolean => questionIndex === questionsLastIndex,
    [questionIndex, questionsLastIndex],
  );

  const goNext = useCallback(() => {
    if (isLastQuestion) {
      if (!result) {
        surveyMutation.mutate(answers);
      }
      history.push({ search: '?show=result' });
      return;
    }
    history.push({ search: '' });
    setQuestionIndex((currentIndex) => currentIndex + 1);
  }, [isLastQuestion, history, result, surveyMutation, answers]);

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

      cachedAnswersRef.current = [];
      refetch().catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
      setIsValid(true);
      setResult(undefined);
      setQuestionIndex(0);
      setAnswers([]);
      history.push({ search: '' });
    },
    [history, refetch],
  );

  if (!questions || isFetching) {
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

  const finishTestText = result ? 'Show result' : 'Submit form';

  return (
    <SurveyContainerStyled gapSize="m">
      {!showResult && (
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
              reviewMode={!!result}
            />
            <ActionButtonsStyled>
              {questionIndex > 0 && (
                <Button tabIndex={currentQuestion.answers.length + 2} asLink onClick={goBack}>
                  Previous
                </Button>
              )}
              <Button
                tabIndex={currentQuestion.answers.length + 1}
                disabled={!isValid || isFetching || surveyMutation.isLoading}
                isLoading={isFetching || surveyMutation.isLoading}
              >
                {isLastQuestion ? finishTestText : 'Next question'}
              </Button>
            </ActionButtonsStyled>
          </form>
        </>
      )}
      {showResult && (
        <ResultComponent
          goToFirstQuestion={goToFirstQuestion}
          resetSurvey={resetSurvey}
          isLoading={surveyMutation.isLoading}
          title={result && result.title}
          text={result && result.text}
        />
      )}
    </SurveyContainerStyled>
  );
}
