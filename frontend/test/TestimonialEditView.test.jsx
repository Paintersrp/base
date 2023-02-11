import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import TestimonialEditView from "./TestimonialEditView";

jest.mock("axios");

const testimonial = {
  id: 1,
  heading: "Test Heading",
  text: "Test Text",
  name: "Test Name",
  position: "Test Position",
};

const onUpdate = jest.fn();

describe("TestimonialEditView", () => {
  it("renders correctly", () => {
    const { getByLabelText, getByText } = render(
      <TestimonialEditView testimonial={testimonial} onUpdate={onUpdate} />
    );

    const headingInput = getByLabelText("Heading");
    expect(headingInput.value).toBe("Test Heading");

    const testimonialInput = getByLabelText("Testimonial");
    expect(testimonialInput.value).toBe("Test Text");

    const nameInput = getByLabelText("Name");
    expect(nameInput.value).toBe("Test Name");

    const positionInput = getByLabelText("Position");
    expect(positionInput.value).toBe("Test Position");

    const submitButton = getByText("Update");
    expect(submitButton).toBeInTheDocument();
  });

  it("updates testimonial on form submit", async () => {
    const { getByLabelText, getByText } = render(
      <TestimonialEditView testimonial={testimonial} onUpdate={onUpdate} />
    );

    axios.patch.mockResolvedValue({
      data: [
        {
          id: 1,
          heading: "Updated Heading",
          text: "Updated Text",
          name: "Updated Name",
          position: "Updated Position",
        },
      ],
    });

    const headingInput = getByLabelText("Heading");
    fireEvent.change(headingInput, { target: { value: "Updated Heading" } });

    const testimonialInput = getByLabelText("Testimonial");
    fireEvent.change(testimonialInput, { target: { value: "Updated Text" } });

    const nameInput = getByLabelText("Name");
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });

    const positionInput = getByLabelText("Position");
    fireEvent.change(positionInput, { target: { value: "Updated Position" } });

    const submitButton = getByText("Update");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        "http://localhost:8000/api/testimonials/1/",
        expect.any(FormData),
        {
          headers: {
            Authorization: `JWT undefined`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    });

    it("calls onUpdate with updated testimonials data", async () => {
    const onUpdate = jest.fn();
    const { getByText, getByLabelText } = render(
      <TestimonialEditView testimonial={testimonial} onUpdate={onUpdate} />
    );

    fireEvent.change(getByLabelText("Heading"), {
      target: { value: "New Heading" },
    });
    fireEvent.change(getByLabelText("Testimonial"), {
      target: { value: "New Testimonial Text" },
    });
    fireEvent.change(getByLabelText("Name"), {
      target: { value: "New Name" },
    });
    fireEvent.change(getByLabelText("Position"), {
      target: { value: "New Position" },
    });
    fireEvent.click(getByText("Update"));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8000/api/testimonials/");
      expect(onUpdate).toHaveBeenCalledWith([{ id: 1, ...updatedTestimonial }]);
    });
  });
       
