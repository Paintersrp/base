import React from "react";
import PropTypes from "prop-types";
import DeblurIcon from "@mui/icons-material/Deblur";

import BaseDrawer from "../../Base/BaseDrawer/BaseDrawer";
import DrawerHead from "./components/DrawerHead/DrawerHead";

const Drawer = ({
  open,
  handleClose,
  variant,
  side,
  color,
  companyIcon,
  companyTitle,
}) => {
  return (
    <BaseDrawer variant={variant} open={open} onClose={handleClose} side={side}>
      <div style={{ color: color }}>
        <DrawerHead
          title={companyTitle ? companyTitle : null}
          icon={companyIcon ? companyIcon : null}
        />
        <h2>My Drawer</h2>
        <p>This is the content of my drawer.</p>
      </div>
    </BaseDrawer>
  );
};

Drawer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  variant: PropTypes.oneOf(["standard", "permanent", "persistent"]),
  side: PropTypes.string,
  color: PropTypes.string,
  companyIcon: PropTypes.string,
  companyTitle: PropTypes.string,
};

Drawer.defaultProps = {
  open: false,
  handleClose: () => {},
  variant: "standard",
  side: "left",
  color: "#F5F5F5",
  companyIcon: null,
  companyTitle: null,
};

export default Drawer;
