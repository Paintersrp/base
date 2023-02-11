import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Testimonials from './Testimonials';

jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testimonials component', () => {
  let wrapper;
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      auth: {
        is_superuser: true,
      },
    };
    store = mockStore(initialState);
    wrapper = shallow(<Testimonials store={store} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('renders a grid container with two grid items', () => {
    axios.get.mockResolvedValueOnce({ data: [{}] });
    axios.get.mockResolvedValueOnce({ data: [{}, {}] });
    wrapper.update();
    expect(wrapper.find('Grid').length).toEqual(1);
    expect(wrapper.find('Grid').props().spacing).toEqual(4);
    expect(wrapper.find('Grid').children().length).toEqual(2);
  });

  it('renders two testimonial components', () => {
    axios.get.mockResolvedValueOnce({ data: [{}] });
    axios.get.mockResolvedValueOnce({ data: [{}, {}] });
    wrapper.update();
    expect(wrapper.find('SlideOnScroll').length).toEqual(2);
    expect(wrapper.find('Testimonial').length).toEqual(2);
  });

  it('renders an EditButton component', () => {
    axios.get.mockResolvedValueOnce({ data: [{}] });
    axios.get.mockResolvedValueOnce({ data: [{}, {}] });
    wrapper.update();
    expect(wrapper.find('EditButton').length).toEqual(1);
  });

  it('does not render an EditButton component when user is not a superuser', () => {
    initialState = {
      auth: {
        is_superuser: false,
      },
    };
    store = mockStore(initialState);
    wrapper = shallow(<Testimonials store={store} />);
    axios.get.mockResolvedValueOnce({ data: [{}] });
    axios.get.mockResolvedValueOnce({ data: [{}, {}] });
    wrapper.update();
    expect(wrapper.find('EditButton').length).toEqual(0);
  });

  it('toggles editing state when EditButton is clicked', () => {
    axios.get.mockResolvedValueOnce({ data: [{}] });
    const { getByTestId } = render(
<Provider store={store}>
<Testimonials />
</Provider>
);
const editButton = getByTestId('edit-button');
fireEvent.click(editButton);
expect(getByTestId('title-block-editor')).toBeInTheDocument();
fireEvent.click(editButton);
expect(queryByTestId('title-block-editor')).not.toBeInTheDocument();
});

it('updates title block data when TitleBlockEditor updates data', async () => {
axios.get.mockResolvedValueOnce({ data: [{}] });
axios.get.mockResolvedValueOnce({ data: [{}] });
const { getByTestId } = render(
<Provider store={store}>
<Testimonials />
</Provider>
);
const editButton = getByTestId('edit-button');
fireEvent.click(editButton);
const titleBlockEditor = getByTestId('title-block-editor');
fireEvent.change(titleBlockEditor.querySelector('input'), {
target: { value: 'Updated Title' },
});
fireEvent.click(titleBlockEditor.querySelector('button'));
await waitFor(() => {
expect(axios.patch).toHaveBeenCalledWith(
"http://localhost:8000/api/titleblocks/1/",
{
title: 'Updated Title',
},
{
headers: {
Authorization: JWT undefined,
"Content-Type": "application/json",
},
}
);
});
});

it('updates testimonial data when TestimonialEditView updates data', async () => {
axios.get.mockResolvedValueOnce({ data: [{}] });
axios.get.mockResolvedValueOnce({ data: [{}] });
const { getByTestId } = render(
<Provider store={store}>
<Testimonials />
</Provider>
);
const testimonialEditView = getByTestId('testimonial-edit-view');
fireEvent.change(testimonialEditView.querySelector('input'), {
target: { value: 'Updated Heading' },
});
fireEvent.click(testimonialEditView.querySelector('button'));
await waitFor(() => {
expect(axios.patch).toHaveBeenCalledWith(
"http://localhost:8000/api/testimonials/1/",
expect.any(FormData),
{
headers: {
Authorization: JWT undefined,
"Content-Type": "multipart/form-data",
},
}
);
});
});
};
