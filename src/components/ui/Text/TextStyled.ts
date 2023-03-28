import styled from 'styled-components';
import { getStyleValue } from '../../../compositions';
import { Theme } from '../../../types';

export interface IText {
  typography?: keyof Theme['typography'];
  bold?: boolean;
  uppercase?: boolean;
  capitalize?: boolean;
  color?: keyof Theme['color'];
  className?: string;
  inline?: boolean;
  center?: boolean;
  right?: boolean;
}

interface Attrs {
  className?: string;
}

export default styled.span.attrs<Attrs>({})<IText>(
  ({
    typography: typographyName = 'p',
    bold = false,
    uppercase = false,
    capitalize = false,
    theme: { typography: typographyTheme, color: colorTheme },
    color,
    inline = true,
    center = false,
    right = false,
  }) => {
    const {
      [typographyName]: { fontFamily, fontFamilyBold, fontSize, lineHeight },
    } = typographyTheme;

    const hasTextTransform = uppercase || capitalize;

    return `
      text-align: ${center ? 'center' : 'left'};
      text-align: ${right ? 'right' : 'left'};
      font-family: ${bold ? fontFamilyBold : fontFamily};
      font-size: ${getStyleValue(fontSize)};
      line-height: ${getStyleValue(lineHeight)};
      ${color ? `color: ${colorTheme[color]};` : ''}
      ${inline ? '' : 'display: block;'}
      ${right ? `display: flex; justify-content: flex-end; width: 100%;` : ''}
      ${
        !hasTextTransform
          ? ''
          : `
        text-transform: ${capitalize ? 'capitalize' : 'uppercase'};
      `
      }
    `;
  },
);
