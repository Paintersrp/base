import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import axiosMock from "axios";
import ContentEdit from "./ContentEdit";

afterEach(cleanup);

jest.mock("axios");

describe("ContentEdit component", () => {
  const content = { title: "Example Title", body: "Example Body" };
  const type = "content";

  it("renders the component correctly with initial data", () => {
    const { getByLabelText, getByText } = render(
      <ContentEdit content={content} onUpdate={() => {}} type={type} />
    );

    expect(getByLabelText("Title").value).toBe(content.title);
    expect(getByText("Example Body")).toBeTruthy();
  });

  it("updates the data on submit", async () => {
    const updatedContent = { title: "Updated Title", body: "Updated Body" };
    const onUpdate = jest.fn();
    axiosMock.patch.mockResolvedValueOnce({ data: updatedContent });
    axiosMock.get.mockResolvedValueOnce({ data: updatedContent });

    const { getByLabelText, getByText } = render(
      <ContentEdit content={content} onUpdate={onUpdate} type={type} />
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: updatedContent.title },
    });
    fireEvent.click(getByText("Update"));

    expect(axiosMock.patch).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledTimes(1);

    expect(getByLabelText("Title").value).toBe(updatedContent.title);
    expect(getByText(updatedContent.body)).toBeTruthy();
    expect(onUpdate).toHaveBeenCalledWith(updatedContent);
  });
});
