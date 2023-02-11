import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardList from './CardList';

describe('CardList', () => {
  it('renders without crashing', () => {
    render(<CardList data={{ features: [] }} />);
  });

  it('renders the list of features', () => {
    const data = {
      features: [
        { detail: 'Feature 1' },
        { detail: 'Feature 2' },
        { detail: 'Feature 3' },
      ],
    };

    render(<CardList data={data} />);

    data.features.forEach((feature, index) => {
      expect(screen.getByTestId(`feature-${index}`)).toHaveTextContent(feature.detail);
    });
  });
});
