import React from "react";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import SocialEdit from "./SocialEdit";

jest.mock("axios");

describe("SocialEdit", () => {
  const initialData = {
    facebook: "https://www.facebook.com/test",
    twitter: "https://www.twitter.com/test",
    instagram: "https://www.instagram.com/test",
    linkedin: "https://www.linkedin.com/test",
  };
  const onUpdate = jest.fn();

  it("renders form with initial data", () => {
    const { getByLabelText } = render(
      <SocialEdit initialData={initialData} onUpdate={onUpdate} />
    );

    expect(getByLabelText("Facebook").value).toBe("https://www.facebook.com/test");
    expect(getByLabelText("Twitter").value).toBe("https://www.twitter.com/test");
    expect(getByLabelText("Instagram").value).toBe("https://www.instagram.com/test");
    expect(getByLabelText("LinkedIn").value).toBe("https://www.linkedin.com/test");
  });

  it("updates form data and calls onUpdate", async () => {
    const updatedData = {
      facebook: "https://www.facebook.com/updated",
      twitter: "https://www.twitter.com/updated",
      instagram: "https://www.instagram.com/updated",
      linkedin: "https://www.linkedin.com/updated",
    };
    axios.patch.mockResolvedValue({});
    axios.get.mockResolvedValue({ data: updatedData });

    const { getByLabelText, getByText } = render(
      <SocialEdit initialData={initialData} onUpdate={onUpdate} />
    );

    fireEvent.change(getByLabelText("Facebook"), {
      target: { value: updatedData.facebook },
    });
    fireEvent.change(getByLabelText("Twitter"), {
      target: { value: updatedData.twitter },
    });
    fireEvent.change(getByLabelText("Instagram"), {
      target: { value: updatedData.instagram },
    });
    fireEvent.change(getByLabelText("LinkedIn"), {
      target: { value: updatedData.linkedin },
    });

    fireEvent.click(getByText("Update"));

    expect(getByLabelText("Facebook").value).toBe(updatedData.facebook);
    expect(getByLabelText("Twitter").value).toBe(updatedData.twitter);
    expect(getByLabelText("Instagram").value).toBe(updatedData.instagram);
    expect(getByLabelText("LinkedIn").value).toBe(updatedData.linkedin);
    expect(onUpdate).toHaveBeenCalledWith(updatedData);
  });
});
