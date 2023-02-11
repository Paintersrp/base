import React from 'react';
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import axiosMock from 'axios';
import LatestNews from './LatestNews';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers';

const store = createStore(rootReducer);

afterEach(cleanup);

describe('LatestNews component', () => {
  it('renders loading state correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LatestNews />
      </Provider>
    );

    expect(getByText('Loading')).toBeInTheDocument();
  });

  it('renders error state correctly', async () => {
    axiosMock.get.mockRejectedValueOnce({});

    const { getByText } = render(
      <Provider store={store}>
        <LatestNews />
      </Provider>
    );

    const errorMessage = await waitForElement(() => getByText('An error occurred while loading the articles.'));
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders articles data correctly', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          title: 'Test article 1',
          body: 'Test article body 1'
        },
        {
          id: 2,
          title: 'Test article 2',
          body: 'Test article body 2'
        },
        {
          id: 3,
          title: 'Test article 3',
          body: 'Test article body 3'
        }
      ]
    });

    const { getByText } = render(
      <Provider store={store}>
        <LatestNews />
      </Provider>
    );

    const article1 = await waitForElement(() => getByText('Test article 1'));
    const article2 = await waitForElement(() => getByText('Test article 2'));
    const article3 = await waitForElement(() => getByText('Test article 3'));

    expect(article1).toBeInTheDocument();
    expect(article2).toBeInTheDocument();
    expect(article3).toBeInTheDocument();
  });

  it('renders title block data correctly', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        subtitle: 'Test subtitle',
        title: 'Test title',
        alignment: 'center',
        show_divider: true
      }
    });

    const { getByText } = render(
      <Provider store={store}>
        <LatestNews />
      </Provider>
    );

    const subtitle = await waitForElement(() => getByText('Test subtitle'));
    const title = await waitForElement(() => getByText('Test title'));

    expect(subtitle).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    expect(subtitle).toHaveStyle('text-align: center');
    expect(title).toHaveStyle('text-align: center');

    const divider = getByText('Test title').nextSibling;
    expect(divider).toHaveClass('MuiDivider-root')
});
