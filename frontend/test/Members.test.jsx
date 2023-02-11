import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Members from "./Members";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Members component", () => {
  it("renders without crashing", () => {
    act(() => {
      render(<Members />, container);
    });
  });

  it("renders with given data", () => {
    const membersData = [
      {
        name: "John Doe",
        role: "Developer",
        bio: "A Full-Stack Developer with 5 years of experience.",
        linkedIn: "https://www.linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
        twitter: "https://twitter.com/johndoe",
      },
      {
        name: "Jane Doe",
        role: "Designer",
        bio: "A UX designer with 3 years of experience.",
        linkedIn: "https://www.linkedin.com/in/janedoe",
        github: "https://github.com/janedoe",
        twitter: "https://twitter.com/janedoe",
      },
    ];

    act(() => {
      render(<Members membersData={membersData} />, container);
    });

    const sectionTitle = container.querySelector(".sectionTitle");
    expect(sectionTitle.textContent).toBe("Company Management");

    const memberCount = container.querySelectorAll(".member").length;
    expect(memberCount).toBe(2);
  });

  it("renders with empty data", () => {
    act(() => {
      render(<Members membersData={[]} />, container);
    });

    const sectionTitle = container.querySelector(".sectionTitle");
    expect(sectionTitle.textContent).toBe("Company Management");

    const memberCount = container.querySelectorAll(".member").length;
    expect(memberCount).toBe(0);
  });
});
