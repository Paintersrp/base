import React from "react";
import { shallow } from "enzyme";
import CarouselEdit from "./CarouselEdit";
import CarouselEditModal from "./CarouselEditModal";

const mockUpdateCarousel = jest.fn();
const mockHandleClickOpen = jest.fn();
const mockHandleDelete = jest.fn();
const mockHandleClose = jest.fn();

const mockItems = [  {    id: 1,    buttonText: "Button 1",    buttonLink: "Link 1",    image: "Image 1",  },  {    id: 2,    buttonText: "Button 2",    buttonLink: "Link 2",    image: "Image 2",  },];

describe("CarouselEdit component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CarouselEdit
        items={mockItems}
        updateCarousel={mockUpdateCarousel}
      />
    );
  });

  it("should render without crashing", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render all items passed in as props", () => {
    expect(wrapper.find("Card").length).toBe(2);
  });

  it("should render the CarouselEditModal component when selectedItem is truthy", () => {
    wrapper.setState({ selectedItem: mockItems[0] });
    expect(wrapper.find(CarouselEditModal).length).toBe(1);
  });

  it("should call the mockUpdateCarousel function when the updateCarousel prop is passed down to CarouselEditModal", () => {
    wrapper.setState({ selectedItem: mockItems[0] });
    expect(wrapper.find(CarouselEditModal).props().updateCarousel).toBe(
      mockUpdateCarousel
    );
  });

  it("should call the mockHandleClickOpen function when the handleClickOpen method is called", () => {
    wrapper.instance().handleClickOpen = mockHandleClickOpen;
    wrapper
      .find("IconButton")
      .at(0)
      .simulate("click");
    expect(mockHandleClickOpen).toHaveBeenCalled();
  });

  it("should call the mockHandleDelete function when the handleDelete method is called", () => {
    wrapper.instance().handleDelete = mockHandleDelete;
    wrapper
      .find("IconButton")
      .at(1)
      .simulate("click");
    expect(mockHandleDelete).toHaveBeenCalled();
  });

  it("should call the mockHandleClose function when the handleClose method is called", () => {
    wrapper.instance().handleClose = mockHandleClose;
    wrapper
      .find(CarouselEditModal)
      .props()
      .handleClose();
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
