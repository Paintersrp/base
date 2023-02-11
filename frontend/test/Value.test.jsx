import React from "react";
import { shallow } from "enzyme";
import { Avatar, Icon, ListItem, Typography } from "@material-ui/core";
import Value from "./Value";
import EditButton from "./EditButton";
import ValueEdit from "./ValueEdit";

jest.mock("./EditButton", () => jest.fn(() => <div />));
jest.mock("./ValueEdit", () => jest.fn(() => <div />));

const mockUseSelector = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: (selector) => mockUseSelector(selector),
}));

describe("Value component", () => {
  let value;

  beforeEach(() => {
    value = {
      title: "title",
      icon: "icon",
    };

    mockUseSelector.mockImplementation((selector) => selector({
      auth: {
        is_superuser: false,
      },
    }));
  });

  it("renders the component in read-only mode", () => {
    const component = shallow(<Value value={value} />);

    expect(component.find(ListItem)).toHaveLength(1);
    expect(component.find(Avatar)).toHaveLength(1);
    expect(component.find(Icon)).toHaveLength(1);
    expect(component.find(Typography)).toHaveLength(1);
    expect(component.find(EditButton)).toHaveLength(0);
    expect(component.find(ValueEdit)).toHaveLength(0);
  });

  it("renders the component in edit mode for superuser", () => {
    mockUseSelector.mockImplementation((selector) => selector({
      auth: {
        is_superuser: true,
      },
    }));

    const component = shallow(<Value value={value} />);

    expect(component.find(ListItem)).toHaveLength(0);
    expect(component.find(ValueEdit)).toHaveLength(1);
    expect(component.find(EditButton)).toHaveLength(1);
  });
});
