import React from "react";
import { shallow } from "enzyme";
import ImageCarousel from "./ImageCarousel";

describe("ImageCarousel component", () => {
  const items = [    {      title: "Image 1",      image: "image1.jpg",    },    {      title: "Image 2",      image: "image2.jpg",    },  ];

  it("renders correctly", () => {
    const wrapper = shallow(<ImageCarousel items={items} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("passes down items correctly", () => {
    const wrapper = shallow(<ImageCarousel items={items} />);
    expect(wrapper.props().items).toEqual(items);
  });

  it("toggles autoplay correctly", () => {
    const wrapper = shallow(<ImageCarousel items={items} />);
    wrapper.instance().handleChange();
    expect(wrapper.state().autoPlayEnabled).toBe(false);
    expect(wrapper.state().isManualClick).toBe(false);
    wrapper.instance().handleChange();
    expect(wrapper.state().autoPlayEnabled).toBe(true);
    expect(wrapper.state().isManualClick).toBe(false);
  });
});
