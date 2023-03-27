import styled, { createGlobalStyle } from 'styled-components';

// fonts must be included by @import ( fonts are linked in index.html file by <link /> ) https://github.com/styled-components/styled-components/issues/400
export default createGlobalStyle(
  ({
    theme: {
      color: { text, grey6: background },
    },
  }) => `
    html {
      font-family: sans-serif;
      body {
        margin: 0;
        padding: 0;
        color: ${text};
        background-color: ${background};
      }
    }
    * {
      box-sizing: border-box;
    }
  `,
);

export const ContentStyled = styled.div`
  display: flex;
  position: relative;
`;

export const AppProviderStyled = styled.div``;
