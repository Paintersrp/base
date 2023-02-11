import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MemberEdit from "./MemberEdit";
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");

describe("MemberEdit", () => {
  let member;
  let onUpdate;
  let form;
  let nameInput;
  let roleInput;
  let bioInput;
  let linkedInInput;
  let githubInput;
  let twitterInput;

  beforeEach(() => {
    member = {
      id: 1,
      name: "John Doe",
      role: "Developer",
      bio: "A software engineer with 5 years of experience.",
      linkedIn: "https://www.linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      image: "https://example.com/image.png",
    };
    onUpdate = jest.fn();
    axios.get.mockResolvedValue({ data: member });
    axios.patch.mockResolvedValue();

    const { container } = render(<MemberEdit member={member} onUpdate={onUpdate} />);
    form = container.querySelector("form");
    nameInput = container.querySelector("input[name='name']");
    roleInput = container.querySelector("input[name='role']");
    bioInput = container.querySelector("textarea[name='bio']");
    linkedInInput = container.querySelector("input[name='linkedIn']");
    githubInput = container.querySelector("input[name='github']");
    twitterInput = container.querySelector("input[name='twitter']");
  });

  it("renders form inputs with initial values", () => {
    expect(nameInput.value).toBe(member.name);
    expect(roleInput.value).toBe(member.role);
    expect(bioInput.value).toBe(member.bio);
    expect(linkedInInput.value).toBe(member.linkedIn);
    expect(githubInput.value).toBe(member.github);
    expect(twitterInput.value).toBe(member.twitter);
  });

  it("updates the form inputs", () => {
    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(roleInput, { target: { value: "Designer" } });
    fireEvent.change(bioInput, { target: { value: "A UX designer with 3 years of experience." } });
    fireEvent.change(linkedInInput, { target: { value: "https://www.linkedin.com/in/janedoe" } });
    fireEvent.change(githubInput, { target: { value: "https://github.com/janedoe" } });
    fireEvent.change(twitterInput, { target: { value: "https://twitter.com/janedoe" } });
    expect(nameInput.value).toBe("Jane Doe");
    expect(roleInput.value).toBe("Designer");
    expect(bioInput.value).toBe("A UX designer with 3 years of experience.");
    expect(linkedInInput.value).toBe("https://www.linkedin.com/in/janedoe");
    expect(githubInput.value).toBe("https://github.com/janedoe");
    expect(twitterInput.value).toBe("https://twitter.com/janedoe");
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
        name: "Jane Doe",
        role: "Designer",
        bio: "A UX designer with 3 years of experience.",
        linkedIn: "https://www.linkedin.com/in/janedoe",
        github: "https://github.com/janedoe",
        twitter: "https://twitter.com/janedoe"
    });

