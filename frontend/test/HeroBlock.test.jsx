import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroBlock from './HeroBlock';

describe('HeroBlock component', () => {
  test('renders title, heading, text, and button when showButton is true', () => {
    render(
      <HeroBlock
        title="Title"
        heading="Heading"
        text="Text"
        btnText="Button text"
        btnLink="/"
        showButton
      />
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByText('Button text')).toBeInTheDocument();
  });

  test('renders title, heading, and text when showButton is false', () => {
    render(
      <HeroBlock
        title="Title"
        heading="Heading"
        text="Text"
        btnText="Button text"
        btnLink="/"
        showButton={false}
      />
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.queryByText('Button text')).toBeNull();
  });
});
