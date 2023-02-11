import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../redux/rootReducer';
import Hero from './Hero';
import { act } from 'react-dom/test-utils';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const store = createStore(rootReducer, applyMiddleware(thunk));

const items = [
  {
    src:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    alt: 'Image 1',
  },
  {
    src:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    alt: 'Image 2',
  },
];

const contactData = {
  phone: '555-555-5555',
  email: 'test@email.com',
  address: '123 Main St',
};

describe('Hero component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Hero items={items} setItems={() => {}} contactData={contactData} />
      </Provider>
    );
  });

  it('renders HeroBlock component when not in edit mode', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Hero items={items} setItems={() => {}} contactData={contactData} />
      </Provider>
    );

    const title = await waitForElement(() => getByText('Hero Title'));
    const heading = await waitForElement(() => getByText('Hero Heading'));
    const text = await waitForElement(() => getByText('Hero Text'));
    const button = await waitForElement(() => getByText('Hero Button'));

    expect(title).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('renders HeroBlockEdit component when in edit mode', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Hero items={items} setItems={() => {}} contactData={contactData} />
      </Provider>
    );

    mockedAxios.get.mockResolvedValue({
      data: {
        title: 'Hero Title',
        heading: 'Hero Heading',
        text: 'Hero Text',
buttonText: 'Button Text',
},
});
