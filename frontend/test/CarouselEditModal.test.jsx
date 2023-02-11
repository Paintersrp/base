import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import CarouselEditModal from "./CarouselEditModal";
import axios from "axios";
import { getCookie } from "./getCookie";
jest.mock("axios");
jest.mock("./getCookie");

describe("CarouselEditModal", () => {
  afterEach(cleanup);

  const item = {
    buttonLink: "testLink",
    buttonText: "testText",
    image: "testImage",
    title: "testTitle",
  };

  const updateCarousel = jest.fn();
  const handleClose = jest.fn();

  const open = true;
  const id = "1";

  it("renders without crashing", () => {
    render(
      <CarouselEditModal
        item={item}
        open={open}
        updateCarousel={updateCarousel}
        id={id}
        handleClose={handleClose}
      />
    );
  });

  it("updates the carousel and text fields on form submit", async () => {
    getCookie.mockImplementation(() => "testToken");
    axios.patch.mockResolvedValueOnce({ data: item });
    axios.get.mockResolvedValueOnce({ data: [item] });

    const { getByLabelText, getByText } = render(
      <CarouselEditModal
        item={item}
        open={open}
        updateCarousel={updateCarousel}
        id={id}
        handleClose={handleClose}
      />
    );

    const textField = getByLabelText("Button Text");
    const linkField = getByLabelText("Button Link");
    const saveButton = getByText("Save");

    fireEvent.change(textField, { target: { value: "updatedText" } });
    fireEvent.change(linkField, { target: { value: "updatedLink" } });
    fireEvent.click(saveButton);

    expect(updateCarousel).toHaveBeenCalledWith([item]);
    expect(textField.value).toBe("updatedText");
    expect(linkField.value).toBe("updatedLink");
  });

  it("calls the handleClose function on Cancel button click", () => {
    const { getByText } = render(
      <CarouselEditModal
        item={item}
        open={open}
        updateCarousel={updateCarousel}
        id={id}
        handleClose={handleClose}
      />
    );

    const cancelButton = getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(handleClose).toHaveBeenCalled();
  });
});
