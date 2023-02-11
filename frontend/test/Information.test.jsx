import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Information from "./Information";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";

const initialData = {
  email: "example@email.com",
  phone: "555-555-5555",
  address: "123 Main St, City, State 12345",
};

const authenticatedUser = {
  is_superuser: true,
};

const unauthenticatedUser = {
  is_superuser: false,
};

const renderWithRedux = (component, store) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("Information", () => {
  it("displays contact information when not in editing mode", () => {
    const store = createStore(rootReducer, { auth: authenticatedUser });
    const { getByText } = renderWithRedux(
      <Information contactData={initialData} />,
      store
    );

    expect(getByText("Email:")).toBeInTheDocument();
    expect(getByText("example@email.com")).toBeInTheDocument();
    expect(getByText("Phone:")).toBeInTheDocument();
    expect(getByText("555-555-5555")).toBeInTheDocument();
    expect(getByText("Address:")).toBeInTheDocument();
    expect(getByText("123 Main St, City, State 12345")).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
  });

  it("displays the InformationEdit component when in editing mode", () => {
    const store = createStore(rootReducer, { auth: authenticatedUser });
    const { getByText, getByTestId } = renderWithRedux(
      <Information contactData={initialData} />,
      store
    );

    fireEvent.click(getByText("Edit"));

    expect(getByTestId("email-field")).toBeInTheDocument();
    expect(getByTestId("phone-field")).toBeInTheDocument();
    expect(getByTestId("address-field")).toBeInTheDocument();
    expect(getByText("Save")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  it("does not display the edit button if the user is not a superuser", () => {
    const store = createStore(rootReducer, { auth: unauthenticatedUser });
    const { queryByText } = renderWithRedux(
      <Information contactData={initialData} />,
      store
    );

    expect(queryByText("Edit")).not.toBeInTheDocument();
  });
});
