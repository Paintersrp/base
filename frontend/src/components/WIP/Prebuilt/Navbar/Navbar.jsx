import React from "react";
import PropTypes from "prop-types";
import "./Navbar.css";

import Flexer from "../../../Elements/Layout/Container/Flexer";
import MenuButton from "../Buttons/MenuButton/MenuButton";
import BaseNavbar from "../../Base/BaseNavbar/BaseNavbar";

const Navbar = ({ menuButton, menuOnClick, menuOpen, drawerSize, links }) => {
  return (
    <BaseNavbar>
      {menuButton && (
        <MenuButton
          size="lg"
          onClick={menuOnClick}
          style={{
            position: "absolute",
            marginLeft: !menuOpen ? 12 : 12 + drawerSize,
          }}
          className="menu-button"
        />
      )}
      <Flexer
        className="link-container"
        style={{ marginLeft: !menuOpen ? 80 : 80 + drawerSize }}
      >
        {links.map((item, index) => (
          <a href={item.to}>{item.text}</a>
        ))}
      </Flexer>
    </BaseNavbar>
  );
};

Navbar.propTypes = {
  menuButton: PropTypes.bool,
  drawerSize: PropTypes.number,
  menuOnClick: PropTypes.func,
  menuOpen: PropTypes.bool,
  children: PropTypes.node,
};

Navbar.defaultProps = {
  menuButton: true,
  drawerSize: 240,
  menuOnClick: () => {},
  menuOpen: false,
  children: null,
};

export default Navbar;
