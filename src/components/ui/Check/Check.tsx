import React, { ReactElement, ReactNode } from 'react';
import Icon from '../Icon';
import { CheckContainerStyled, CheckboxStyled, RadioStyled, LabelStyled } from './CheckStyled';

export interface CheckProps {
  checked?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> & React.MouseEventHandler<HTMLDivElement>;
  label?: ReactNode;
  type?: 'checkbox' | 'radio';
  value?: string;
  hasError?: boolean;
  id: string;
  tabIndex?: number;
}

export default function Check({
  checked,
  onChange,
  label,
  id,
  value,
  type = 'checkbox',
  hasError,
  tabIndex,
}: CheckProps): ReactElement {
  const isCheckbox = type === 'checkbox';

  return (
    <CheckContainerStyled>
      {isCheckbox ? (
        <>
          <CheckboxStyled id={id} checked={checked} onChange={onChange} tabIndex={tabIndex} hasError={hasError} />
          {checked && <Icon color={hasError ? 'error100' : 'primary100'} size="xl" name="check" />}
        </>
      ) : (
        <RadioStyled id={id} onChange={onChange} value={value} checked={checked} tabIndex={tabIndex} />
      )}
      {label && <LabelStyled onClick={onChange}>{label}</LabelStyled>}
    </CheckContainerStyled>
  );
}
