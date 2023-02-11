import React from "react";
import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading component", () => {
  test("renders the title correctly", () => {
    const data = { title: "Test Title", image: "test-image-url" };
    render(<Heading data={data} />);
    expect(screen.getByText("About Test Title")).toBeInTheDocument();
  });

  test("renders the image correctly", () => {
    const data = { title: "Test Title", image: "test-image-url" };
    render(<Heading data={data} />);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "test-image-url"
    );
  });
});
