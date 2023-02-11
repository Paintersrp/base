import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CardButtons from './CardButtons';

const plan = {
  title: 'Test Plan',
  price: '$99',
  features: ['Feature 1', 'Feature 2', 'Feature 3'],
};

describe('CardButtons', () => {
  it('renders the component', () => {
    const { getByText } = render(<CardButtons plan={plan} />);

    expect(getByText('View Details')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
  });

  it('opens the DetailsModal when the View Details button is clicked', () => {
    const { getByText } = render(<CardButtons plan={plan} />);

    fireEvent.click(getByText('View Details'));

    expect(getByText(plan.title)).toBeInTheDocument();
    expect(getByText(plan.price)).toBeInTheDocument();
    plan.features.forEach((feature) =>
      expect(getByText(feature)).toBeInTheDocument()
    );
  });

  it('closes the DetailsModal when the close button is clicked', () => {
    const { getByText, queryByText } = render(<CardButtons plan={plan} />);

    fireEvent.click(getByText('View Details'));
    fireEvent.click(getByText('Close'));

    expect(queryByText(plan.title)).not.toBeInTheDocument();
    expect(queryByText(plan.price)).not.toBeInTheDocument();
    plan.features.forEach((feature) =>
      expect(queryByText(feature)).not.toBeInTheDocument()
    );
  });

  it('opens the ContactModal when the Contact button is clicked', () => {
    const { getByText } = render(<CardButtons plan={plan} />);

    fireEvent.click(getByText('Contact'));

    expect(getByText('Contact Us')).toBeInTheDocument();
  });

  it('closes the ContactModal when the close button is clicked', () => {
    const { getByText, queryByText } = render(<CardButtons plan={plan} />);

    fireEvent.click(getByText('Contact'));
    fireEvent.click(getByText('Close'));

    expect(queryByText('Contact Us')).not.toBeInTheDocument();
  });
});
