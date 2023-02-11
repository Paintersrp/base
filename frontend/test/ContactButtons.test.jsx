import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactButtons from './ContactButtons';

describe('ContactButtons', () => {
  it('should render two buttons', () => {
    const contactData = {
      phone: '555-555-5555',
      email: 'test@test.com',
    };
    const { getByText } = render(<ContactButtons contactData={contactData} />);
    expect(getByText('Call Us')).toBeInTheDocument();
    expect(getByText('Email Us')).toBeInTheDocument();
  });

  it('should have correct href values for the buttons', () => {
    const contactData = {
      phone: '555-555-5555',
      email: 'test@test.com',
    };
    const { getByText } = render(<ContactButtons contactData={contactData} />);
    const callUsButton = getByText('Call Us');
    const emailUsButton = getByText('Email Us');
    expect(callUsButton.getAttribute('href')).toBe('tel:555-555-5555');
    expect(emailUsButton.getAttribute('href')).toBe('mailto:test@test.com');
  });

  it('should fire events when buttons are clicked', () => {
    const contactData = {
      phone: '555-555-5555',
      email: 'test@test.com',
    };
    const { getByText } = render(<ContactButtons contactData={contactData} />);
    const callUsButton = getByText('Call Us');
    const emailUsButton = getByText('Email Us');
    const onClickCallUs = jest.fn();
    const onClickEmailUs = jest.fn();
    callUsButton.addEventListener('click', onClickCallUs);
    emailUsButton.addEventListener('click', onClickEmailUs);
    fireEvent.click(callUsButton);
    expect(onClickCallUs).toHaveBeenCalled();
    fireEvent.click(emailUsButton);
    expect(onClickEmailUs).toHaveBeenCalled();
  });
});
