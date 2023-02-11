import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Process from './Process';

const mockStore = configureStore([]);

describe('Process component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        is_superuser: true,
      },
    });
  });

  it('renders the process information when not editing', () => {
    const step = {
      title: 'Step 1',
      description: 'This is step 1',
      icon: 'star',
    };

    const { getByText } = render(
      <Provider store={store}>
        <Process step={step} />
      </Provider>
    );

    expect(getByText(step.title)).toBeInTheDocument();
    expect(getByText(step.description)).toBeInTheDocument();
  });

  it('renders the edit form when editing is true', () => {
    const step = {
      title: 'Step 1',
      description: 'This is step 1',
      icon: 'star',
    };

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Process step={step} />
      </Provider>
    );

    fireEvent.click(getByTestId('edit-button'));

    expect(getByText('Edit Process')).toBeInTheDocument();
  });

  it('does not render the edit button when the user is not a superuser', () => {
    store = mockStore({
      auth: {
        is_superuser: false,
      },
    });

    const step = {
      title: 'Step 1',
      description: 'This is step 1',
      icon: 'star',
    };

    const { queryByTestId } = render(
      <Provider store={store}>
        <Process step={step} />
      </Provider>
    );

    expect(queryByTestId('edit-button')).not.toBeInTheDocument();
  });
});
