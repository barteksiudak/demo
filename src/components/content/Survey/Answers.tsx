import { useCallback, useEffect, useState } from 'react';
import { Survey } from '../../../types';
import { Check } from '../../ui';
import AnswersStyled from './styled';

type AnswersProps = {
  question: Survey;
  selected?: string;
  reviewMode: boolean;
  onChange: (id: string) => void;
};

export default function Answers({ question: { answers }, selected, reviewMode, onChange }: AnswersProps): JSX.Element {
  const [checkedId, setCheckedId] = useState<string>();
  const handleChange = useCallback(
    (id: string) => () => {
      if (reviewMode) {
        return;
      }

      onChange(id);
      setCheckedId(id);
    },
    [reviewMode, onChange],
  );

  useEffect(() => {
    setCheckedId(selected);
  }, [selected]);

  return (
    <AnswersStyled gapSize="s">
      {answers.map(({ id, label }, i) => (
        <Check
          key={id}
          id={id}
          onChange={handleChange(id)}
          checked={id === checkedId}
          value={id}
          label={label}
          tabIndex={i + 1}
          disabled={reviewMode}
        />
      ))}
    </AnswersStyled>
  );
}
