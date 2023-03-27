import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import { mainTheme } from '../../../themes';
import Button, { IButton } from './Button';

const TEXT_MOCK = 'button-text';

describe('Button', () => {
  function getWrapper(props?: IButton) {
    return shallow(
      <ThemeProvider theme={mainTheme}>
        <Button {...props} variant="primary">
          {TEXT_MOCK}
        </Button>
      </ThemeProvider>,
    );
  }

  it('is the Button', () => {
    expect(getWrapper().find(Button)).toHaveLength(1);
  });

  it('is clickable', () => {
    const onClick = jest.fn();
    const wrapper = getWrapper({ onClick });

    wrapper.find(Button).simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is clickable', () => {
    expect(getWrapper().find(Button).children().text()).toBe(TEXT_MOCK);
  });
});
