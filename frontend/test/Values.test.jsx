import React from "react";
import { render, act, waitForElement } from "@testing-library/react";
import Values from "./Values";

describe("Values component", () => {
  it("should render core values", async () => {
    const valuesData = [
      { id: 1, title: "Value 1", icon: "icon1" },
      { id: 2, title: "Value 2", icon: "icon2" }
    ];

    let component;
    await act(async () => {
      component = render(<Values valuesData={valuesData} />);
    });

    const title = await waitForElement(() => component.getByText("Core Values"));
    const value1 = await waitForElement(() => component.getByText("Value 1"));
    const value2 = await waitForElement(() => component.getByText("Value 2"));

    expect(title).toBeInTheDocument();
    expect(value1).toBeInTheDocument();
    expect(value2).toBeInTheDocument();
  });

  it("should render loading state", () => {
    const component = render(<Values valuesData={null} />);
    const title = component.queryByText("Core Values");

    expect(title).not.toBeInTheDocument();
  });
});
