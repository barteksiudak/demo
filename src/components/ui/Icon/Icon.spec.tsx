import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { mainTheme } from '../../../themes';
import Icon from './Icon';

describe('Icon', () => {
  function getWrapper() {
    return mount(
      <ThemeProvider theme={mainTheme}>
        <Icon color="primary" size="2xl" name="ello" />
        <Icon color="primary" size="2xl" name="check" />
      </ThemeProvider>,
    );
  }

  it('is the correct amount of Icons', () => {
    expect(getWrapper().find(Icon)).toHaveLength(2);
  });

  it('has the correct names of the icons', () => {
    expect(getWrapper().find(Icon).first().prop('name')).toBe('ello');
    expect(getWrapper().find(Icon).last().prop('name')).toBe('check');
  });
});
