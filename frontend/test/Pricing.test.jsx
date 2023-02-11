import React from 'react';
import { act, render, wait } from '@testing-library/react';
import Pricing from './Pricing';
import axiosInstance from './axiosInstance';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('./axiosInstance');

describe('Pricing component', () => {
  it('renders pricing plans fetched from the API', async () => {
    const fakePlans = [
      {
        title: 'Free',
        bestFor: 'Startups',
        guarantee: '30-day money back guarantee',
        supportedSites: [
          {
            id: 1,
            site: 'Shopify',
          },
          {
            id: 2,
            site: 'Wix',
          },
        ],
        features: [
          {
            id: 1,
            detail: 'Up to 3 products',
          },
          {
            id: 2,
            detail: 'Limited integrations',
          },
          {
            id: 3,
            detail: '1% transaction fee',
          },
        ],
      },
      {
        title: 'Premium',
        bestFor: 'Growing businesses',
        guarantee: '30-day money back guarantee',
        supportedSites: [
          {
            id: 1,
            site: 'Shopify',
          },
          {
            id: 2,
            site: 'Wix',
          },
        ],
        features: [
          {
            id: 1,
            detail: 'Up to 10 products',
          },
          {
            id: 2,
            detail: 'Unlimited integrations',
          },
          {
            id: 3,
            detail: 'No transaction fee',
          },
        ],
      },
    ];
    axiosInstance.get.mockResolvedValueOnce({ data: fakePlans });

    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Pricing />
      </Router>
    );

    await wait(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/pricing_plans/');
      expect(getByText(fakePlans[0].title)).toBeInTheDocument();
      expect(getByText(fakePlans[1].title)).toBeInTheDocument();
    });
  });

  it('renders an error message if the API call fails', async () => {
    axiosInstance.get.mockRejectedValueOnce({
      response: {
        status: 500,
        data: { message: 'Internal server error' },
      },
    });

    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <Pricing />
      </Router>
    );

    await wait(() => {
      expect(axiosInstance.get).toHaveBeenCalledWith('/pricing_plans/');
      expect(getByText('Internal server error')).toBeInTheDocument();
});
});
});
