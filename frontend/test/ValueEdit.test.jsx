import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ValueEdit from './ValueEdit';

describe('ValueEdit component', () => {
  it('renders the component with the correct initial values', () => {
    const value = { id: 1, title: 'Value 1', icon: 'value1.svg' };
    const { getByLabelText, getByText } = render(
      <ValueEdit value={value} onUpdate={() => {}} />
    );

    expect(getByLabelText('Icon').value).toBe('value1.svg');
    expect(getByLabelText('Title').value).toBe('Value 1');
    expect(getByText('Update')).toBeInTheDocument();
  });

  it('updates the form inputs', () => {
    const value = { id: 1, title: 'Value 1', icon: 'value1.svg' };
    const { getByLabelText } = render(
      <ValueEdit value={value} onUpdate={() => {}} />
    );

    fireEvent.change(getByLabelText('Icon'), { target: { value: 'value2.svg' } });
    fireEvent.change(getByLabelText('Title'), { target: { value: 'Value 2' } });

    expect(getByLabelText('Icon').value).toBe('value2.svg');
    expect(getByLabelText('Title').value).toBe('Value 2');
  });

  it('submits the form and calls the onUpdate prop', () => {
    const value = { id: 1, title: 'Value 1', icon: 'value1.svg' };
    const onUpdate = jest.fn();
    const { getByText } = render(
      <ValueEdit value={value} onUpdate={onUpdate} />
    );

    fireEvent.submit(getByText('Update'));

    expect(onUpdate).toHaveBeenCalledWith({
      id: 1,
      title: 'Value 2',
      icon: 'value2.svg'
    });
  });
});
