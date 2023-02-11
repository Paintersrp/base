import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewsletterForm from './NewsletterForm';

describe('NewsletterForm', () => {
  it('renders the heading', () => {
    const { getByText } = render(<NewsletterForm />);

    expect(getByText('Subscribe to our Newsletter')).toBeInTheDocument();
  });

  it('renders the input field', () => {
    const { getByLabelText } = render(<NewsletterForm />);

    expect(getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    const { getByText } = render(<NewsletterForm />);

    expect(getByText('Submit')).toBeInTheDocument();
  });

  it('renders the success message', async () => {
    const { getByText, getByLabelText } = render(<NewsletterForm />);

    const input = getByLabelText('Email Address');
    const submit = getByText('Submit');

    fireEvent.change(input, { target: { value: 'email@example.com' } });
    fireEvent.click(submit);

    const success = await waitForElement(() => getByText('Subscribed'));
    expect(success).toBeInTheDocument();
  });

  it('renders the error message', async () => {
    const { getByText, getByLabelText } = render(<NewsletterForm />);

    const input = getByLabelText('Email Address');
    const submit = getByText('Submit');

    fireEvent.change(input, { target: { value: 'fail@example.com' } });
    fireEvent.click(submit);

    const error = await waitForElement(() => getByText('Oh no an error occured! 😢 Please try again later.'));
    expect(error).toBeInTheDocument();
  });

  it('updates the email address', () => {
    const { getByLabelText } = render(<NewsletterForm />);

    const input = getByLabelText('Email Address');

    fireEvent.change(input, { target: { value: 'email@example.com' } });

    expect(input.value).toBe('email@example.com');
  });
});
