import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Contact from './Contact';

describe('Contact component', () => {
  it('renders without crashing', () => {
    render(<Contact contactData={{}} />);
  });

  it('renders the Contact Us section title', () => {
    render(<Contact contactData={{}} />);
    const sectionTitle = screen.getByText('Contact Us');
    expect(sectionTitle).toBeInTheDocument();
  });

  it('renders the form title', () => {
    render(<Contact contactData={{}} />);
    const formTitle = screen.getByText('Contact');
    expect(formTitle).toBeInTheDocument();
  });

  it('renders the form select options', () => {
    render(<Contact contactData={{}} />);
    const options = ['General Inquiry', 'Support', 'Partnership', 'Other'];
    options.forEach(option => {
      const formOption = screen.getByText(option);
      expect(formOption).toBeInTheDocument();
    });
  });
});
