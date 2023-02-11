import React from 'react';
import { shallow, mount } from 'enzyme';
import ImageCarousel from './ImageCarousel';
import Carousel from './Carousel';
import { Paper, Card } from '@material-ui/core';

describe('ImageCarousel component', () => {
  let component;
  const items = [
    {
      image: 'image1.jpg',
      title: 'Image 1',
    },
    {
      image: 'image2.jpg',
      title: 'Image 2',
    },
    {
      image: 'image3.jpg',
      title: 'Image 3',
    },
  ];

  it('renders without crashing', () => {
    component = shallow(<ImageCarousel items={items} />);
    expect(component).toBeDefined();
  });

  it('renders the Paper component', () => {
    component = shallow(<ImageCarousel items={items} />);
    expect(component.find(Paper)).toHaveLength(1);
  });

  it('renders the Carousel component', () => {
    component = shallow(<ImageCarousel items={items} />);
    expect(component.find(Carousel)).toHaveLength(1);
  });

  it('passes the correct props to the Carousel component', () => {
    component = shallow(<ImageCarousel items={items} />);
    const carousel = component.find(Carousel);
    expect(carousel.props().autoPlay).toEqual(true);
    expect(carousel.props().indicators).toEqual(false);
    expect(carousel.props().pauseOnHover).toEqual(true);
    expect(carousel.props().timeout).toEqual(500);
  });

  it('renders the correct number of Card components', () => {
    component = shallow(<ImageCarousel items={items} />);
    expect(component.find(Card)).toHaveLength(items.length);
  });

  it('disables autoplay and sets isManualClick to true when handleChange is called', () => {
    component = mount(<ImageCarousel items={items} />);
    const instance = component.instance();
    instance.handleChange();
    expect(instance.state.autoPlayEnabled).toEqual(false);
    expect(instance.state.isManualClick).toEqual(true);
  });
});
