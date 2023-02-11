import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Cookies from "js-cookie";
import axiosInstance from "../axiosInstance";
import LoginForm from "./LoginForm";
import { setAuth, setUser } from "../store/actions/auth";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../store/reducers";

jest.mock("js-cookie");
jest.mock("../axiosInstance");
jest.mock("../store/actions/auth");

const store = createStore(rootReducer);

describe("LoginForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should display error message on invalid login", async () => {
    const errorMessage = "Invalid username or password.";
    axiosInstance.post.mockRejectedValue({
      response: {
        data: {
          error: errorMessage,
        },
      },
    });

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.submit(getByText("Sign In"));
    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith("/auth/login/", {
        username: "testuser",
        password: "testpassword",
      });
    });

    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it("should call setAuth and setUser on successful login", async () => {
    const responseData = {
      authenticated: true,
      is_superuser: true,
      username: "testuser",
      jwt: "token",
    };
    axiosInstance.post.mockResolvedValue({
      data: responseData,
    });

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(getByLabelText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "testpassword" },
    });
    fireEvent.submit(getByText("Sign In"));
    await waitFor(() => {
  expect(axiosInstance.post).toHaveBeenCalledWith("/auth/login/", {
    username: "testuser",
    password: "testpassword",
  });
});

const state = store.getState();
expect(state.auth.isAuthenticated).toBe(true);
expect(state.auth.user).toEqual({ id: 1, username: "testuser" });
