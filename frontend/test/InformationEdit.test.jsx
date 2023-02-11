import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import InformationEdit from "./InformationEdit";

jest.mock("axios");

describe("InformationEdit", () => {
  it("renders without crashing", () => {
    const initialData = {
      email: "test@example.com",
      phone: "555-555-5555",
      address: "123 Main St",
    };
    render(<InformationEdit initialData={initialData} onUpdate={() => {}} />);
  });

  it("updates contact information successfully", async () => {
    const initialData = {
      email: "test@example.com",
      phone: "555-555-5555",
      address: "123 Main St",
    };

    const onUpdate = jest.fn();
    const { getByLabelText, getByText } = render(
      <InformationEdit initialData={initialData} onUpdate={onUpdate} />
    );

    const emailInput = getByLabelText("Email");
    const phoneInput = getByLabelText("Phone");
    const addressInput = getByLabelText("Address");
    const updateButton = getByText("Update");

    axios.patch.mockResolvedValue({
      data: {
        email: "newemail@example.com",
        phone: "555-555-5556",
        address: "456 Main St",
      },
    });

    fireEvent.change(emailInput, { target: { value: "newemail@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "555-555-5556" } });
    fireEvent.change(addressInput, { target: { value: "456 Main St" } });
    fireEvent.click(updateButton);

    await new Promise((resolve) => setImmediate(resolve));

    expect(axios.patch).toHaveBeenCalledWith(
      "http://localhost:8000/api/contact/",
      expect.any(FormData),
      expect.any(Object)
    );

    expect(onUpdate).toHaveBeenCalledWith({
      email: "newemail@example.com",
      phone: "555-555-5556",
      address: "456 Main St",
    });
  });

  it("handles error when updating contact information", async () => {
    const initialData = {
      email: "test@example.com",
      phone: "555-555-5555",
      address: "123 Main St",
    };

    const onUpdate = jest.fn();
    const { getByLabelText, getByText } = render(
      <InformationEdit initialData={initialData} onUpdate={onUpdate} />
    );

    const emailInput = getByLabelText("Email");
    const phoneInput = getByLabelText("Phone");
    const addressInput = getByLabelText("Address");
    const updateButton = getByText("Update");

    axios.patch.mockRejectedValue(new Error("Request failed with status code 400"));

    fireEvent.change(emailInput, { target: { value: "newemail@test.com" } });
    fireEvent.change(phoneInput, { target: { value: "555-555-5555" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.click(updateButton);

    await waitForElement(() => getByText("Request failed with status code 400"));

    expect(onUpdate).not.toHaveBeenCalled();
});
});
