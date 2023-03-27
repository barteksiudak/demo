import getStyleValue from './getStyleValue';

export interface IShadow {
  hOffset: number;
  vOffset: number;
  blur: number;
  spread: number;
  color: string;
}

export const getBoxShadow = (shadow: IShadow): string =>
  `
    ${getStyleValue(shadow.hOffset)}
    ${getStyleValue(shadow.vOffset)}
    ${getStyleValue(shadow.blur)}
    ${getStyleValue(shadow.spread)}
    ${shadow.color}
  `;
