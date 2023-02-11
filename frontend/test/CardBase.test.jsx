import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import CardBase from "./CardBase";

const mockStore = configureMockStore();

const plan = {
  title: "Free",
  price: 0,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  features: ["Feature 1", "Feature 2"],
};

const auth = {
  is_superuser: true,
};

afterEach(cleanup);

describe("CardBase component", () => {
  it("renders card data correctly", () => {
    const store = mockStore({ auth });
    const { getByText } = render(
      <Provider store={store}>
        <CardBase plan={plan} />
      </Provider>
    );

    const title = getByText(plan.title);
    const price = getByText(`$${plan.price}`);
    const description = getByText(plan.description);
    const feature1 = getByText(plan.features[0]);
    const feature2 = getByText(plan.features[1]);

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(feature1).toBeInTheDocument();
    expect(feature2).toBeInTheDocument();
  });

  it("toggles editing state when edit button is clicked", () => {
    const store = mockStore({ auth });
    const { getByTestId, queryByText } = render(
      <Provider store={store}>
        <CardBase plan={plan} />
      </Provider>
    );

    const editButton = getByTestId("edit-button");
    fireEvent.click(editButton);

    const form = queryByText("Edit Plan");
    expect(form).toBeInTheDocument();

    fireEvent.click(editButton);

    const newForm = queryByText("Edit Plan");
    expect(newForm).toBeNull();
  });
});
