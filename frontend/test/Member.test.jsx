import React from "react";
import { shallow, render, mount } from "enzyme";
import Member from "./Member";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";

const member = {
  name: "John Doe",
  role: "Developer",
  image: "image.jpg"
};

describe("Member component", () => {
  let store;

  beforeEach(() => {
    store = createStore(rootReducer);
  });

  it("renders without crashing", () => {
    shallow(
      <Provider store={store}>
        <Member member={member} />
      </Provider>
    );
  });

  it("renders the member data correctly", () => {
    const wrapper = render(
      <Provider store={store}>
        <Member member={member} />
      </Provider>
    );
    expect(wrapper.find(".title").text()).toBe(member.name);
    expect(wrapper.find(".subheader").text()).toBe(member.role);
    expect(wrapper.find(".MuiAvatar-rounded").prop("src")).toBe(member.image);
  });

  it("toggles editing state", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Member member={member} />
      </Provider>
    );
    expect(wrapper.find("MemberEdit").length).toBe(0);
    wrapper.find(".editButton").simulate("click");
    expect(wrapper.find("MemberEdit").length).toBe(1);
    wrapper.find(".editButton").simulate("click");
    expect(wrapper.find("MemberEdit").length).toBe(0);
  });

  it("renders edit button for superuser", () => {
    const superuserAuth = { is_superuser: true };
    store = createStore(rootReducer, { auth: superuserAuth });
    const wrapper = shallow(
      <Provider store={store}>
        <Member member={member} />
      </Provider>
    );
    expect(wrapper.find(".editButton").length).toBe(1);
  });

  it("doesn't render edit button for non-superuser", () => {
    const nonSuperuserAuth = { is_superuser: false };
    store = createStore(rootReducer, { auth: nonSuperuserAuth });
    const wrapper = shallow(
      <Provider store={store}>
        <Member member={member} />
      </Provider>
    );
    expect(wrapper.find(".editButton").length).toBe(0);
  });
});
