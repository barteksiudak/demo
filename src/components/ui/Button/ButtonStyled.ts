import { HTMLProps, ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from '../../../types';
import { getBoxShadow, getStyleValue } from '../../../compositions';
import Spinner from '../Spinner';

export const THEME_VARIANT = 'variants';

export type Variant = keyof Theme['button'];

interface IButtonProps {
  variant?: Variant;
  children?: ReactNode;
  disabled?: boolean;
  bold?: boolean;
  uppercase?: boolean;
  color?: string;
  backgroundColor?: keyof Theme['color'];
  asLink?: boolean;
  underline?: boolean;
  width?: number | string;
  rotateIcon?: number;
  iconSize?: string;
}

export interface IButton extends HTMLProps<HTMLButtonElement>, IButtonProps {}

export interface ILink extends HTMLProps<HTMLAnchorElement>, IButtonProps {}

interface IButtonStyled extends IButton {
  theme: Theme;
}

interface ILinkStyled extends ILink {
  theme: Theme;
}

export const DEFAULT_VARIANT = 'primary';
export const LINK_VARIANT = 'link';

const getStyles = ({
  variant = DEFAULT_VARIANT,
  theme: { button, color: themeColors, animationTime },
  bold = false,
  uppercase = false,
  disabled = false,
  color,
  backgroundColor: customBackgroundColor,
  selected,
  underline = false,
  width,
  rotateIcon,
}: IButtonStyled | ILinkStyled): string => {
  const {
    [variant]: {
      typography: { fontFamily, fontFamilyBold, fontSize, lineHeight },
      color: colorInitial,
      backgroundColor: defaultBackgroundColor,
      border,
      borderRadius,
      padding,
      shadow,
      iconMarginRight,
      width: widthTheme,
      height,
      textAlign,
      inline,
      iconSize,
      hover: {
        border: borderHover,
        backgroundColor: backgroundColorHover,
        shadow: shadowHover,
        color: colorHover,
        textDecoration: textDecorationHover,
        fill: fillHover,
      },
      disabled: { color: colorDisabled, backgroundColor: backgroundColorDisabled, border: borderDisabled },
      active: {
        color: colorActive,
        backgroundColor: backgroundColorActive,
        border: borderActive,
        shadow: shadowActive,
        fill: fillActive,
        borderRadius: borderRadiusActive,
        padding: paddingActive,
        textDecoration: textDecorationActive,
      },
    },
  } = button;
  const currentColor = themeColors[color as keyof typeof themeColors] || color;
  const backgroundColor = customBackgroundColor ? themeColors[customBackgroundColor] : defaultBackgroundColor;

  const activeStyles = `
    background-color: ${disabled ? backgroundColorDisabled : backgroundColorActive};
    color: ${disabled ? colorDisabled : colorActive};
    border: ${disabled ? borderDisabled : borderActive};
    padding: ${paddingActive};
    box-shadow: ${disabled ? 'none' : getBoxShadow(shadowActive)};
    border-radius: ${borderRadiusActive};
    text-decoration: ${textDecorationActive};
    svg {
      fill: ${disabled ? colorDisabled : fillActive};
      stroke: ${disabled ? colorDisabled : fillActive};
    }
  `;

  return `
      background-color: ${backgroundColor};
      color: ${currentColor || colorInitial};
      padding: ${getStyleValue(padding)};
      border: ${border};
      border-radius: ${getStyleValue(borderRadius)};
      font-family: ${bold ? fontFamilyBold : fontFamily};
      font-size: ${getStyleValue(fontSize)};
      line-height: ${getStyleValue(lineHeight)};
      text-transform: ${uppercase ? 'uppercase' : 'none'};
      box-shadow: ${getBoxShadow(shadow)};
      cursor: pointer;
      display: ${inline ? 'inline' : 'flex'};
      justify-content: ${textAlign};
      align-items: center;
      text-decoration: none;
      z-index: 1;
      width: ${getStyleValue(width || widthTheme)};
      height: ${getStyleValue(height)};
      text-decoration: ${underline ? 'underline' : 'none'};
      white-space: nowrap;
      svg {
        fill: ${currentColor || colorInitial};
        stroke: ${currentColor || colorInitial};
        margin-right: ${getStyleValue(iconMarginRight)};
        pointer-events: none;
        width: ${getStyleValue(iconSize)};
        height: ${getStyleValue(iconSize)};

        ${
          typeof rotateIcon !== 'undefined'
            ? `
              transition: transform ${animationTime.normal}s;
              transform: rotate(${rotateIcon}deg);
            `
            : ''
        }
      }
      &:hover {
        border: ${disabled ? borderHover : borderDisabled};
        background-color: ${disabled ? backgroundColorDisabled : backgroundColorHover};
        box-shadow: ${getBoxShadow(shadowHover)};
        color: ${disabled ? colorDisabled : colorHover};
        text-decoration: ${textDecorationHover};
        svg {
          fill: ${disabled ? colorDisabled : fillHover} !important;
          stroke: ${disabled ? colorDisabled : fillHover} !important;
        }
      }
      &:active {
        ${activeStyles}
      }
      ${
        disabled
          ? `
        background-color: ${backgroundColorDisabled};
        color: ${colorDisabled};
        border: ${borderDisabled};
        cursor: default;
        box-shadow: none;
        &:hover {
          box-shadow: none;
        }
        svg {
          fill: ${colorDisabled};
          stroke: ${colorDisabled};
        }
      `
          : ''
      }

      ${selected ? activeStyles : ''};
    `;
};

export const ButtonStyled = styled.button<IButton>(getStyles);

export const LinkStyled = styled.a<IButton>(getStyles);

export const ContentStyled = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => getStyleValue(theme.size.s)};
`;

export const SpinnerButton = styled(Spinner)`
  position: absolute;
  top: -3px;
  left: -36px;
  font-size: 2.5px;
  margin: 0;
`;
