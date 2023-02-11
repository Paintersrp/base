import React from "react";
import { shallow } from "enzyme";
import ContentSection from "./ContentSection";

const setup = (props = {}) => {
  return shallow(<ContentSection {...props} />);
};

describe("ContentSection component", () => {
  it("renders without error", () => {
    const wrapper = setup();
    expect(wrapper.find("[data-test='content-section']").length).toBe(1);
  });

  it("renders the title correctly", () => {
    const wrapper = setup({ title: "My Title" });
    expect(
      wrapper.find("[data-test='section-title']").text()
    ).toContain("My Title");
  });

  it("renders the body correctly", () => {
    const wrapper = setup({ body: "My Body" });
    expect(
      wrapper.find("[data-test='section-body']").text()
    ).toContain("My Body");
  });

  it("renders the EditButton if user is superuser", () => {
    const wrapper = setup({ auth: { is_superuser: true } });
    expect(wrapper.find("[data-test='edit-button']").length).toBe(1);
  });

  it("does not render the EditButton if user is not superuser", () => {
    const wrapper = setup({ auth: { is_superuser: false } });
    expect(wrapper.find("[data-test='edit-button']").length).toBe(0);
  });

  it("renders the ContentEdit component when editState is true", () => {
    const wrapper = setup({ editState: true });
    expect(wrapper.find("ContentEdit").length).toBe(1);
  });

  it("does not render the ContentEdit component when editState is false", () => {
    const wrapper = setup({ editState: false });
    expect(wrapper.find("ContentEdit").length).toBe(0);
  });
});
