import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../reducers";
import axiosInstance from "../axios";

jest.mock("axios");

describe("RegisterForm", () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer);
  });

  it("renders without crashing", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );
    expect(getByLabelText("First Name")).toBeInTheDocument();
    expect(getByLabelText("Last Name")).toBeInTheDocument();
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Email Address")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
    expect(getByText("Already have an account? Login")).toBeInTheDocument();
  });

  it("submits form data on submit", async () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    fireEvent.change(getByLabelText("First Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(getByLabelText("Last Name"), {
      target: { value: "User" },
    });
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Email Address"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.submit(getByText("Sign Up"));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://127.0.0.1:8000/api/auth/register/", {
        firstName: "Test",
        lastName: "User",
        username: "testuser",
        email: "testuser@example.com",
        password: "testpassword",
      });
    });
  });

  it("displays an error message on failed submission", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          username: ["A user with that username already exists."],
        },
      },
    });
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>

    fireEvent.change(getByLabelText("First Name"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Last Name"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Email Address"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.submit(getByText("Sign Up"));
    await waitFor(() => {
      expect(getByText("A user with that username already exists.")).toBeInTheDocument();
    });
  });

