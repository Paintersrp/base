import React from "react";
import { Typography, Link } from "@material-ui/core";
import {
  FaHome,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import { GiEnergySword } from "react-icons/gi";
import "./SimpleFooter.css";

const Footer = () => {
  return (
    <footer className="footer-root">
      <div className="footer-row">
        <div className="navbar-general-links">
          <Link to="/" className="title-name-footer navbar-link">
            <GiEnergySword size="16" className="icon-nav" />
            EDGELORDS
          </Link>
        </div>
      </div>
      <div className="footer-row">
        <Link className="footer-link" href="#">
          About
        </Link>
        <Link className="footer-link" href="#">
          Services
        </Link>
        <Link className="footer-link" href="#">
          Contact
        </Link>
        <Link className="footer-link" href="#">
          Privacy Policy
        </Link>
      </div>
      <div className="footer-row">
        <a href="#" className="footer-link">
          <FaGithub />
        </a>
        <a href="#" className="footer-link">
          <FaLinkedin />
        </a>
        <a href="#" className="footer-link">
          <FaTwitter />
        </a>
        <a href="#" className="footer-link">
          <FaFacebook />
        </a>
      </div>
      <div className="footer-copyright">EDGELORDS™ - COPYRIGHT 2023</div>
    </footer>
  );
};

export default Footer;
