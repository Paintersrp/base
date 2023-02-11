import React from 'react';
import { shallow } from 'enzyme';
import FAQAccordion from './FAQAccordion';
import axiosInstance from '../../api/axiosInstance';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../api/axiosInstance', () => ({
  get: jest.fn(),
}));

describe('FAQAccordion component', () => {
  let wrapper;
  let mockUseSelector;
  let mockAxiosInstanceGet;

  beforeEach(() => {
    mockUseSelector = useSelector.mockImplementation((selector) => {
      if (selector === (state) => state.auth) {
        return {
          is_superuser: true,
        };
      }
    });
    mockAxiosInstanceGet = axiosInstance.get.mockResolvedValue({
      data: [
        {
          category_name: 'category 1',
          question: 'question 1',
          answer: 'answer 1',
        },
        {
          category_name: 'category 2',
          question: 'question 2',
          answer: 'answer 2',
        },
      ],
    });

    wrapper = shallow(<FAQAccordion />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders the FAQ categories and data correctly', () => {
    expect(mockUseSelector).toHaveBeenCalled();
    expect(mockAxiosInstanceGet).toHaveBeenCalledWith('/faqs/');

    expect(wrapper.find('Tabs').length).toBe(1);
    expect(wrapper.find('Tab').length).toBe(2);
    expect(
      wrapper
        .find('Tab')
        .first()
        .props().label
    ).toBe('category 1');
    expect(wrapper.find('AccordionQA').length).toBe(2);
    expect(
      wrapper
        .find('AccordionQA')
        .first()
        .props().faq
    ).toEqual({
      category_name: 'category 1',
      question: 'question 1',
      answer: 'answer 1',
    });
  });

  it('renders the edit form when the edit button is clicked', () => {
    expect(wrapper.find('FAQEdit').length).toBe(0);

    wrapper
      .find('EditButton')
      .first()
      .props()
      .onClick();

    expect(wrapper.find('FAQEdit').length).toBe(1);
  });
});
