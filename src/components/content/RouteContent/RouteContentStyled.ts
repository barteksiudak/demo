import styled from 'styled-components';
import { getStyleValue } from '../../../compositions';

export default styled.div(
  ({
    theme: {
      topBar: { height },
    },
  }) => `
    padding-top: ${getStyleValue(height)};
    width: 100%;
  `,
);
