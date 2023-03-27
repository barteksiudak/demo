import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { mainTheme } from '../../../themes';
import Text from './Text';

const TEXT_MOCK_1 = 'text1';
const TEXT_MOCK_2 = 'text2';

describe('Link', () => {
  function getWrapper() {
    return mount(
      <ThemeProvider theme={mainTheme}>
        <Text typography="label">{TEXT_MOCK_1}</Text>
        <Text typography="label">{TEXT_MOCK_2}</Text>
      </ThemeProvider>,
    );
  }

  it('is the correct amount of Links', () => {
    expect(getWrapper().find(Text)).toHaveLength(2);
  });

  it('has the correct text', () => {
    expect(getWrapper().find(Text).first().text()).toEqual(TEXT_MOCK_1);
    expect(getWrapper().find(Text).last().text()).toEqual(TEXT_MOCK_2);
  });
});
