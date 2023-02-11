import React from 'react';
import { shallow } from 'enzyme';
import ProcessEdit from './ProcessEdit';

describe('ProcessEdit component', () => {
  let wrapper;
  const process = {
    id: 1,
    title: 'Step 1',
    description: 'This is step 1',
    icon: 'step1.png'
  };
  const updateProcess = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<ProcessEdit process={process} updateProcess={updateProcess} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders form elements', () => {
    expect(wrapper.find('TextField').length).toEqual(3);
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('updates the state when input values change', () => {
    const title = wrapper.find('TextField').at(1);
    title.simulate('change', { target: { value: 'New Title' } });
    expect(wrapper.state().title).toEqual('New Title');

    const description = wrapper.find('TextField').at(2);
    description.simulate('change', { target: { value: 'New Description' } });
    expect(wrapper.state().description).toEqual('New Description');
  });

  it('calls the updateProcess function on form submit', () => {
    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault: () => {} });
    expect(updateProcess).toHaveBeenCalled();
  });
});
