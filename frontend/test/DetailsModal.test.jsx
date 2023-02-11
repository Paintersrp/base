import React from "react";
import { shallow, mount } from "enzyme";
import DetailsModal from "./DetailsModal";

describe("DetailsModal", () => {
  const close = jest.fn();
  const plan = {
    title: "Test",
    bestFor: "Testing",
    guarantee: "Tested",
    supportedsites: [
      { id: 1, site: "Site 1" },
      { id: 2, site: "Site 2" },
      { id: 3, site: "Site 3" },
    ],
  };

  it("should render without crashing", () => {
    shallow(<DetailsModal plan={plan} close={close} />);
  });

  it("should call close function when the close icon is clicked", () => {
    const wrapper = mount(<DetailsModal plan={plan} close={close} />);
    wrapper.find("[className='closeIcon']").simulate("click");
    expect(close).toHaveBeenCalled();
  });

  it("should render the plan title", () => {
    const wrapper = shallow(<DetailsModal plan={plan} close={close} />);
    expect(
      wrapper.find("[className='detailsTitle']").text()
    ).toEqual("Test Plan");
  });

  it("should render the bestFor information", () => {
    const wrapper = shallow(<DetailsModal plan={plan} close={close} />);
    expect(
      wrapper.find("[gutterBottom='true']").at(1).text()
    ).toEqual("Best For: Testing");
  });

  it("should render the guarantee information", () => {
    const wrapper = shallow(<DetailsModal plan={plan} close={close} />);
    expect(
      wrapper.find("[gutterBottom='true']").at(2).text()
    ).toEqual("Guarantee: Tested");
  });

  it("should render the supported sites", () => {
    const wrapper = shallow(<DetailsModal plan={plan} close={close} />);
    expect(
      wrapper
        .find("[className='detailsList']")
        .children()
        .at(0)
        .text()
    ).toEqual("Site 1");
    expect(
      wrapper
        .find("[className='detailsList']")
        .children()
        .at(1)
        .text()
    ).toEqual("Site 2");
    expect(
      wrapper
        .find("[className='detailsList']")
        .children()
        .at(2)
        .text()
    ).toEqual("Site 3");
  });

  it("should call close function when the close button is clicked", () => {
    const wrapper = mount(<DetailsModal plan={plan} close={close} />);
    wrapper.find("[className='detailsButton']").simulate("click");
    expect(close).toHaveBeenCalled();
  });
});
