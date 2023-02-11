import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import Hero from './Hero';

const store = createStore(reducer);

const setup = (props) => {
  const component = mount(
    <Provider store={store}>
      <Hero {...props} />
    </Provider>
  );
  return component;
};

describe('Hero component', () => {
  let component;
  const items = [
    {
      id: 1,
      image: '/static/media/carousel-1.8bccb21b.jpg',
      title: 'Image 1',
      text: 'This is Image 1',
    },
    {
      id: 2,
      image: '/static/media/carousel-2.8bccb21b.jpg',
      title: 'Image 2',
      text: 'This is Image 2',
    },
  ];
  const contactData = {
    email: 'test@email.com',
    phone: '555-555-5555',
    address: '1234 Test St.',
  };
  beforeEach(() => {
    component = setup({ items, setItems, contactData });
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Hero items={items} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the HeroBlock component', () => {
    expect(component.find('HeroBlock').length).toBe(1);
  });

  it('renders the ContactButtons component', () => {
    expect(component.find('ContactButtons').length).toBe(1);
  });

  it('renders the Social component', () => {
    expect(component.find('Social').length).toBe(1);
  });

  it('renders the ImageCarousel component', () => {
    expect(component.find('ImageCarousel').length).toBe(1);
  });

  it('renders the EditButton component for superuser', () => {
    store.dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { is_superuser: true },
    });
    component.update();
    expect(component.find('EditButton').length).toBe(2);
  });

  it('does not render the EditButton component for non-superuser', () => {
    store.dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { is_superuser: false },
    });
    component.update();
    expect(component.find('EditButton').length).toBe(0);
  });

  it('updates the HeroBlock when `updateHeroBlock` is called', () => {
    const updatedHeroBlock = {
      title: 'New Title',
      heading: 'New Heading',
      text: 'New Text',
      buttonText: 'New Button Text',
    };
    component.instance().update
HeroBlock(updatedHeroBlock);
component.update();
expect(component.state().heroData).toEqual(updatedHeroBlock);
});

it('renders the HeroBlock component when editHero is false', () => {
component.setState({ editHero: false });
component.update();
expect(component.find(HeroBlock)).toHaveLength(1);
});

it('renders the HeroBlockEdit component when editHero is true', () => {
component.setState({ editHero: true });
component.update();
expect(component.find(HeroBlockEdit)).toHaveLength(1);
});

it('updates the carousel items when updateCarousel is called', () => {
const updatedCarouselItems = [{ id: 1, url: 'new-image-1.jpg' }, { id: 2, url: 'new-image-2.jpg' }];
component.instance().updateCarousel(updatedCarouselItems);
component.update();
expect(component.state().items).toEqual(updatedCarouselItems);
});

it('renders the ImageCarousel component when editCarousel is false', () => {
component.setState({ editCarousel: false });
component.update();
expect(component.find(ImageCarousel)).toHaveLength(1);
});

it('renders the CarouselEdit component when editCarousel is true', () => {
component.setState({ editCarousel: true });
component.update();
expect(component.find(CarouselEdit)).toHaveLength(1);
});

it('renders the EditButton component when user is superuser', () => {
component.setProps({ auth: { is_superuser: true } });
component.update();
expect(component.find(EditButton)).toHaveLength(2);
});

it('does not render the EditButton component when user is not superuser', () => {
component.setProps({ auth: { is_superuser: false } });
component.update();
expect(component.find(EditButton)).toHaveLength(0);
});

it('renders the ContactButtons component when contactData prop is passed', () => {
component.setProps({ contactData: { email: 'test@test.com' } });
component.update();
expect(component.find(ContactButtons)).toHaveLength(1);
});

it('renders the Social component when contactData prop is passed', () => {
component.setProps({ contactData: { email: 'test@test.com' } });
component.update();
expect(component.find(Social)).toHaveLength(1);
});

it('does not render the ContactButtons and Social components when contactData prop is not passed', () => {
component.setProps({ contactData: null });
component.update();
expect(component.find(ContactButtons)).toHaveLength(0);
expect(component.find(Social)).toHaveLength(0);
});
});

it('renders the ContactButtons and Social components when contactData prop is passed', () => {
const contactData = {
phone: '555-555-5555',
email: 'example@example.com',
address: '123 Example St',
twitter: 'https://twitter.com/example',
facebook: 'https://facebook.com/example',
instagram: 'https://instagram.com/example',
};
component.setProps({ contactData });
component.update();
expect(component.find(ContactButtons)).toHaveLength(1);
expect(component.find(Social)).toHaveLength(1);
});

it('calls setEditHero when the EditButton is clicked', () => {
component.setProps({ auth: { is_superuser: true } });
component.update();
const editButton = component.find(EditButton).first();
editButton.simulate('click');
expect(setEditHeroMock).toHaveBeenCalledWith(true);
});

it('calls setEditCarousel when the EditButton for the carousel is clicked', () => {
component.setProps({ auth: { is_superuser: true } });
component.update();
const editButton = component.find(EditButton).at(1);
editButton.simulate('click');
expect(setEditCarouselMock).toHaveBeenCalledWith(true);
});

it('does not render the EditButtons when the user is not a superuser', () => {
component.setProps({ auth: { is_superuser: false } });
component.update();
expect(component.find(EditButton)).toHaveLength(0);
});

it('passes the correct props to the HeroBlock component', () => {
const heroData = {
title: 'Hero Title',
heading: 'Hero Heading',
text: 'Hero Text',
buttonText: 'Hero Button Text',
};
component.setProps({ heroData });
component.update();
const heroBlock = component.find(HeroBlock);
expect(heroBlock.props().title).toEqual(heroData.title);
expect(heroBlock.props().heading).toEqual(heroData.heading);
expect(heroBlock.props().text).toEqual(heroData.text);
expect(heroBlock.props().btnText).toEqual(heroData.buttonText);
expect(heroBlock.props().btnLink).toEqual('/about');
});

it('passes the correct props to the HeroBlockEdit component', () => {
component.setProps({ editHero: true });
component.update();
const heroBlockEdit = component.find(HeroBlockEdit);
expect(heroBlockEdit.props().heroblock).toEqual(heroData);
expect(heroBlockEdit.props().updateHeroBlock).toEqual(updateHeroBlockMock);
});

it('renders the ImageCarousel component correctly when editCarousel is false', () => {
component.setProps({ editCarousel: false });
component.update();
expect(component.find(ImageCarousel)).toHaveLength(1);
expect(component.find(ImageCarousel).props().items).toEqual(items);
});

it('renders the CarouselEdit component correctly when editCarousel is true', () => {
component.setProps({ editCarousel: true });
component.update();
expect(component.find(CarouselEdit)).toHaveLength(1);
expect(component.find(CarouselEdit).props().items).toEqual(items);
expect(component.find(CarouselEdit).props().updateCarousel).toEqual(updateCarouselMock);
});

it('renders the EditButton component correctly with the correct editState prop when auth.is_superuser is true', () => {
component.setProps({ auth: { is_superuser: true } });
component.update();
expect(component.find(EditButton)).toHaveLength(2);
const heroEditButton = component.find(EditButton).at(0);
expect(heroEditButton.props().editState).toEqual(editHero);
expect(heroEditButton.props().onClick).toEqual(setEditHeroMock);
const carouselEditButton = component.find(EditButton).at(1);
expect(carouselEditButton.props().editState).toEqual(editCarousel);
expect(carouselEditButton.props().onClick).toEqual(setEditCarouselMock);
});

it('does not render the EditButton component when auth.is_superuser is false', () => {
component.setProps({ auth: { is_superuser: false } });
component.update();
expect(component.find(EditButton)).toHaveLength(0);
});

});

it('passes the correct props to the CarouselEdit component', () => {
component.setProps({ editCarousel: true });
component.update();
const carouselEdit = component.find(CarouselEdit);
expect(carouselEdit.props().items).toEqual(items);
expect(carouselEdit.props().updateCarousel).toEqual(updateCarouselMock);
});

it('renders the EditButton component with the correct props when auth.is_superuser is true', () => {
component.setProps({ auth: { is_superuser: true } });
component.update();
const heroEditButton = component.find(EditButton).at(0);
const carouselEditButton = component.find(EditButton).at(1);
expect(heroEditButton.props().onClick).toEqual(toggleEditHeroMock);
expect(heroEditButton.props().editState).toEqual(editHero);
expect(carouselEditButton.props().onClick).toEqual(toggleEditCarouselMock);
expect(carouselEditButton.props().editState).toEqual(editCarousel);
});

it('does not render the EditButton components when auth.is_superuser is false', () => {
component.setProps({ auth: { is_superuser: false } });
component.update();
expect(component.find(EditButton)).toHaveLength(0);
});

});
