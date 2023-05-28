import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

const BaseModal = ({ children, isOpen, onClose }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  if (!modalOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-overlay" onClick={closeModal} />
      <div className="modal">
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
};

BaseModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BaseModal;
