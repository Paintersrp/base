import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HeroBlockEdit from "./HeroBlockEdit";
import axios from "axios";

jest.mock("axios");

const getCookie = (name) => {
  return "jwt";
};

describe("HeroBlockEdit", () => {
  let heroblock = {
    title: "Title",
    heading: "Heading",
    text: "Text",
    buttonText: "Button Text",
  };
  let updateHeroBlock = jest.fn();

  it("renders correctly", () => {
    const { getByText, getByLabelText } = render(
      <HeroBlockEdit heroblock={heroblock} updateHeroBlock={updateHeroBlock} />
    );

    expect(getByLabelText("Title").value).toBe(heroblock.title);
    expect(getByLabelText("Heading").value).toBe(heroblock.heading);
    expect(getByLabelText("Text").value).toBe(heroblock.text);
    expect(getByLabelText("Button Text").value).toBe(heroblock.buttonText);
    expect(getByText("Update").tagName).toBe("BUTTON");
  });

  it("updates title and heading on change", () => {
    const { getByLabelText } = render(
      <HeroBlockEdit heroblock={heroblock} updateHeroBlock={updateHeroBlock} />
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(getByLabelText("Heading"), {
      target: { value: "New Heading" },
    });

    expect(getByLabelText("Title").value).toBe("New Title");
    expect(getByLabelText("Heading").value).toBe("New Heading");
  });

  it("submits form correctly", async () => {
    axios.patch.mockResolvedValueOnce({
      data: {
        title: "New Title",
        heading: "New Heading",
        text: "Text",
        buttonText: "Button Text",
      },
    });

    const { getByText, getByLabelText } = render(
      <HeroBlockEdit heroblock={heroblock} updateHeroBlock={updateHeroBlock} />
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(getByLabelText("Heading"), {
      target: { value: "New Heading" },
    });

    fireEvent.submit(getByText("Update"));

    await Promise.resolve();

    expect(updateHeroBlock).toHaveBeenCalledWith({
      title: "New Title",
      heading: "New Heading",
      text: "Text",
      buttonText: "Button Text",
    });
   expect(getByLabelText("Title").value).toBe("New Title");
    expect(getByLabelText("Heading").value).toBe("New Heading");
    expect(getByLabelText("Text").value).toBe("New Text");
    expect(getByLabelText("Button Text").value).toBe("New Button Text");
});
});
