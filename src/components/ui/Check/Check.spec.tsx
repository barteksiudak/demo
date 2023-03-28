import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import mainTheme from '../../../themes';
import Check, { CheckProps } from './Check';
import { CheckboxStyled } from './CheckStyled';
import Icon from '../Icon';

const TEXT_MOCK = 'Test label';

describe('Check', () => {
  function getWrapper(props: CheckProps) {
    return mount(
      <ThemeProvider theme={mainTheme}>
        <Check {...props} label={TEXT_MOCK} />
      </ThemeProvider>,
    );
  }

  it('is the Check', () => {
    expect(getWrapper({ checked: true, onChange: jest.fn(), id: 'test' }).find(Check)).toHaveLength(1);
  });

  it('is checkable', () => {
    const checked = true;
    const onChange = jest.fn();
    const wrapper = getWrapper({ checked, onChange, id: 'test' });

    wrapper.find(CheckboxStyled).simulate('change');

    expect(onChange).toBeCalledTimes(1);
  });

  it('has icon when checked', () => {
    const checked = true;
    const onChange = jest.fn();
    const wrapper = getWrapper({ checked, onChange, id: 'test' });

    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it('has label', () => {
    const checked = true;
    const onChange = jest.fn();
    const wrapper = getWrapper({ checked, onChange, id: 'test' });

    expect(wrapper.find('div').last().text()).toBe(TEXT_MOCK);
  });

  it('is the Radio type', () => {
    const checked = true;
    const onChange = jest.fn();
    const wrapper = getWrapper({ checked, onChange, id: 'test', type: 'radio' });

    expect(wrapper.find('input[type="radio"]')).toHaveLength(1);
  });
});
