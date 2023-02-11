import React from "react";
import { shallow } from "enzyme";
import MemberContent from "./MemberContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

describe("<MemberContent />", () => {
  it("should render the component", () => {
    const member = {
      bio: "Test bio",
      linkedIn: "https://www.linkedin.com",
      github: "https://www.github.com",
      twitter: "https://www.twitter.com",
    };
    const wrapper = shallow(<MemberContent member={member} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render a Typography component with the correct text", () => {
    const member = {
      bio: "Test bio",
      linkedIn: "https://www.linkedin.com",
      github: "https://www.github.com",
      twitter: "https://www.twitter.com",
    };
    const wrapper = shallow(<MemberContent member={member} />);
    expect(
      wrapper.find(Typography).contains("Test bio")
    ).toBeTruthy();
  });

  it("should render IconButtons with the correct href attributes", () => {
    const member = {
      bio: "Test bio",
      linkedIn: "https://www.linkedin.com",
      github: "https://www.github.com",
      twitter: "https://www.twitter.com",
    };
    const wrapper = shallow(<MemberContent member={member} />);
    expect(
      wrapper
        .find(IconButton)
        .first()
        .prop("href")
    ).toEqual("https://www.linkedin.com");
    expect(
      wrapper
        .find(IconButton)
        .at(1)
        .prop("href")
    ).toEqual("https://www.github.com");
    expect(
      wrapper
        .find(IconButton)
        .last()
        .prop("href")
    ).toEqual("https://www.twitter.com");
  });
});
