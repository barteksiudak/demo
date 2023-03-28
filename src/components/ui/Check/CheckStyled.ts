import styled from 'styled-components';
import Text from '../Text';
import { getBoxShadow } from '../../../compositions';

export interface CheckStyledProps {
  hasError?: boolean;
}

export const CheckboxStyled = styled.input.attrs({ type: 'checkbox' })<CheckStyledProps>(
  ({
    theme: {
      color: { background },
      checkbox: {
        width,
        height,
        border,
        borderRadius,
        hover: { backgroundColor: backgroundColorHover, shadow: shadowHover },
        active: { backgroundColor: backgroundColorActive, border: borderActive, shadow: shadowActive },
        error: { backgroundColor: backgroundColorError, border: borderError },
      },
    },
    hasError,
  }) =>
    `
      position: relative;
      width: ${width}px;
      height: ${height}px;
      margin: 0;
      &:focus {
        outline: none;
      }
      &:focus:before {
        background: ${hasError ? backgroundColorError : backgroundColorActive};
        border: ${borderActive};
        box-shadow: ${getBoxShadow(shadowActive)};   
      }
      &:before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        width: ${width}px;
        height: ${height}px;
        background-color: ${hasError ? backgroundColorError : background};
        border: ${hasError ? borderError : border};
        border-radius: ${borderRadius}px;
      }
      &:hover:before {
        background: ${hasError ? backgroundColorError : backgroundColorHover};
        box-shadow: ${getBoxShadow(shadowHover)};
      }
      &:active:before {
        background: ${backgroundColorActive};
        border: ${borderActive};
        box-shadow: ${getBoxShadow(shadowActive)};
      }
      cursor: pointer;
    `,
);

export const RadioStyled = styled.input.attrs({ type: 'radio' })(
  ({
    theme: {
      radio: {
        width,
        height,
        border,
        hover: { backgroundColor: backgroundColorHover, shadow: shadowHover },
        active: { backgroundColor: backgroundColorActive, border: borderActive, shadow: shadowActive },
        checked: { backgroundColor: backgroundColorChecked },
      },
    },
  }) =>
    `
      position: relative;
      width: ${width}px;
      height: ${height}px;
      margin: 0;
      &:focus {
        outline: none;
      }
      &:before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background: white;
        border: ${border};
        border-radius: 50%;
      }
      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
      &:hover:before {
        background: ${backgroundColorHover};
        box-shadow: ${getBoxShadow(shadowHover)};
      }
      &:active:before {
        background: ${backgroundColorActive};
        border: ${borderActive};
        box-shadow: ${getBoxShadow(shadowActive)};
      }
      &:checked:after {
        background-color: ${backgroundColorChecked};
      }
    `,
);

export const LabelStyled = styled(Text)`
  padding-left: ${({
    theme: {
      size: { s: spaceLeft },
    },
  }) => spaceLeft}px;
  cursor: pointer;
`;

export const CheckContainerStyled = styled.div(
  ({
    theme: {
      checkbox: { width, height },
    },
  }) =>
    `
      position: relative;
      display: flex;
      svg {
        position: absolute;
        left: ${width / 2}px;
        top: ${height / 2}px;
        transform: translate(-50%, -50%);
        z-index: 1;
        pointer-events: none;
      }
    `,
);
