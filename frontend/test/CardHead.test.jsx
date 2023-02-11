import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CardHead from './CardHead';

afterEach(cleanup);

const plan = {
  title: 'Basic Plan',
  image: 'basic.jpg',
  price: '10.00'
};

test('renders CardHead component with correct title, image and price', () => {
  const { getByText, getByAltText } = render(<CardHead plan={plan} />);

  expect(getByText(plan.title)).toBeInTheDocument();
  expect(getByAltText(plan.title)).toBeInTheDocument();
  expect(getByText(`$${plan.price}/month`)).toBeInTheDocument();
});
