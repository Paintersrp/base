import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Processes from "./Processes";
import { createStore } from "redux";
import rootReducer from "../../reducers";
import axios from "axios";
import axiosInstance from "../../config/axios";

jest.mock("axios");

describe("Processes component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = createStore(rootReducer, {
      auth: { is_superuser: true },
    });
    component = render(
      <Provider store={store}>
        <Processes />
      </Provider>
    );
  });

  afterEach(cleanup);

  it("renders title block", () => {
    expect(component.getByText("Processes")).toBeInTheDocument();
  });

  it("renders process steps", () => {
    axios.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            title: "Step 1",
            description: "Step 1 description",
            image: "image1.png",
          },
          {
            id: 2,
            title: "Step 2",
            description: "Step 2 description",
            image: "image2.png",
          },
        ],
      })
    );

    return component.findByText("Step 1").then((node) => {
      expect(node).toBeInTheDocument();
    });
  });

  it("updates title block", () => {
    fireEvent.click(component.getByTestId("edit-button"));
    expect(component.getByTestId("title-block-editor")).toBeInTheDocument();
  });
});
