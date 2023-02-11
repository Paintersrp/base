import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AboutHeadingEdit from "./AboutHeadingEdit";

jest.mock("axios");
import axios from "axios";

describe("AboutHeadingEdit component", () => {
  let aboutBlock = {
    title: "Test Title",
    image: "https://example.com/image.png",
  };

  let onUpdate = jest.fn();

  it("renders the component", () => {
    let { getByText, getByLabelText } = render(
      <AboutHeadingEdit aboutBlock={aboutBlock} onUpdate={onUpdate} />
    );

    expect(getByText("About Block Change")).toBeInTheDocument();
    expect(getByLabelText("Title")).toBeInTheDocument();
    expect(getByText("Test Title")).toBeInTheDocument();
  });

  it("updates the title", () => {
    let { getByText, getByLabelText } = render(
      <AboutHeadingEdit aboutBlock={aboutBlock} onUpdate={onUpdate} />
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: "New Title" },
    });

    fireEvent.submit(getByText("Update"));

    expect(axios.patch).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalled();
  });

  it("updates the image", () => {
    let { getByText, getByLabelText } = render(
      <AboutHeadingEdit aboutBlock={aboutBlock} onUpdate={onUpdate} />
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: "New Title" },
    });

    let input = getByLabelText("Upload Image").closest("input");
    let image = new File(["(⌐□_□)"], "test.png", {
      type: "image/png",
    });
    fireEvent.change(input, { target: { files: [image] } });

    fireEvent.submit(getByText("Update"));

    expect(axios.patch).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalled();
  });
});
