import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Social from "./Social";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../store/reducers";

const initialContacts = {
  facebook: "facebook",
  twitter: "twitter",
  instagram: "instagram",
  linkedin: "linkedin",
};

const store = createStore(rootReducer);

describe("Social component", () => {
  test("Social component should render with social icons and a title", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Social contactData={initialContacts} title />
      </Provider>
    );

    const facebookIcon = getByLabelText("facebook");
    const twitterIcon = getByLabelText("twitter");
    const instagramIcon = getByLabelText("instagram");
    const linkedinIcon = getByLabelText("linkedin");
    const title = getByLabelText("Follow Us");

    expect(facebookIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test("Social component should render without a title", () => {
    const { queryByLabelText } = render(
      <Provider store={store}>
        <Social contactData={initialContacts} />
      </Provider>
    );

    const title = queryByLabelText("Follow Us");

    expect(title).not.toBeInTheDocument();
  });

  test("Social component should render in editing mode", () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Social contactData={initialContacts} />
      </Provider>
    );

    const editButton = getByLabelText("Edit");
    fireEvent.click(editButton);

    const facebookInput = getByLabelText("Facebook");
    const twitterInput = getByLabelText("Twitter");
    const instagramInput = getByLabelText("Instagram");
    const linkedinInput = getByLabelText("LinkedIn");

    expect(facebookInput).toBeInTheDocument();
    expect(twitterInput).toBeInTheDocument();
    exit(instagramInput).toBeInTheDocument();
    expect(linkedinInput).toBeInTheDocument();
  });
});
