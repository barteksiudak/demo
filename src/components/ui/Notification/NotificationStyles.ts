import styled from 'styled-components';
import Text from '../Text';

import { getStyleValue } from '../../../compositions';
import { Theme } from '../../../types';

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  ERROR = 'ERROR',
}

export const DEFAULT_TYPE = NotificationType.SUCCESS;
export type TType = keyof Theme['notification'];

export default styled.div(
  ({ theme: { size } }) => `
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: ${getStyleValue(size.m)};
  bottom: ${getStyleValue(size.m)};
  right: ${getStyleValue(size.m)};
  z-index: 101;
`,
);

export const MessageContainer = styled.div<{ type: NotificationType }>(({ theme, type }) => {
  const { size, notification } = theme;
  const variant = type as unknown as TType;
  const themeNotification = notification[variant];

  return `
    display: flex;
    align-items: center;
    padding: ${getStyleValue(size.s)} ${getStyleValue(size.ml)};
    background-color: ${themeNotification.backgroundColor};
    gap: ${getStyleValue(size.m)};
    border-radius: ${getStyleValue(size.s)};
    border: 1px solid ${themeNotification.borderColor};
    overflow: hidden;

    svg {
      stroke: ${themeNotification.color};
      fill: ${themeNotification.color};
    }
  `;
});

export const Pipe = styled.div<{ type: NotificationType }>(({ theme, type }) => {
  const { size, notification } = theme;
  const variant = type as unknown as TType;
  const themeNotification = notification[variant];
  return `
    background-color: ${themeNotification.color};
    width: 1px;
    height: ${getStyleValue(size.m)};
  `;
});

export const TextStyled = styled(Text)<{ type: NotificationType }>(({ theme, type }) => {
  const variant = type as unknown as TType;
  const themeNotification = theme.notification[variant];
  return `color: ${themeNotification.color};`;
});
