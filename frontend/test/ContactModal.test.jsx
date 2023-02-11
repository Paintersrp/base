import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactModal from "./ContactModal";

describe("ContactModal", () => {
  it("renders correctly", () => {
    const close = jest.fn();
    const { getByTestId } = render(<ContactModal close={close} />);

    expect(getByTestId("contact-modal")).toBeInTheDocument();
  });

  it("calls close function when close icon is clicked", () => {
    const close = jest.fn();
    const { getByTestId } = render(<ContactModal close={close} />);

    fireEvent.click(getByTestId("close-icon"));

    expect(close).toHaveBeenCalled();
  });
});
