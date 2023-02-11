import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Hours from "./Hours";

const initialContactData = {
  monday: "9:00 AM - 5:00 PM",
  tuesday: "9:00 AM - 5:00 PM",
  wednesday: "9:00 AM - 5:00 PM",
  thursday: "9:00 AM - 5:00 PM",
  friday: "9:00 AM - 5:00 PM",
  saturday: "Closed",
  sunday: "Closed"
};

const initialAuthState = {
  is_superuser: true
};

const rootReducer = (state = initialAuthState) => {
  return state;
};

const store = createStore(rootReducer);

describe("Hours component", () => {
  test("renders the business hours correctly", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Hours contactData={initialContactData} />
      </Provider>
    );

    Object.values(initialContactData).forEach(value => {
      expect(getByText(value)).toBeInTheDocument();
    });
  });

  test("changes to editing mode when the edit button is clicked", () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <Hours contactData={initialContactData} />
      </Provider>
    );

    fireEvent.click(getByText("Edit"));
    expect(queryByText("9:00 AM - 5:00 PM")).toBeNull();
  });
});
