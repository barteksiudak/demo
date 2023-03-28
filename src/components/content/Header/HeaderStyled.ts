import styled from 'styled-components';
import { getStyleValue } from '../../../compositions';

export default styled.div(
  ({ theme }) => `
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 ${getStyleValue(theme.size.l)};
    height: ${getStyleValue(theme.topBar.height)};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme.color.green2};
  `,
);
