import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    "&:hover": {
      backgroundColor: theme.palette.info.main,
    },
    "& .MuiIconButton-label": {
      transition: "color 0.3s",
      color: theme.palette.info.main,
    },
    "&:hover .MuiIconButton-label": {
      color: theme.palette.common.white,
    },
    borderRadius: "50%",
    padding: 0,
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  menu: {
    padding: theme.spacing(2),
    minWidth: 300,
    maxWidth: 300,
  },
  menuItem: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    "& > span": {
      fontWeight: 600,
      marginRight: theme.spacing(1),
    },
    "& > p": {
      marginBottom: theme.spacing(1),
    },
  },
  bold: {
    fontWeight: 600,
    marginRight: theme.spacing(1),
  },
  link: {
    color: theme.palette.info.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  menuItemLabel: {
    fontWeight: 600,
    marginRight: theme.spacing(1),
    textAlign: "center",
    width: "100%",
  },
}));

const InfoTooltip = ({ text, placement = "bottom" }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItems = () => {
    return (
      <div className={classes.menu}>
        <div style={{ marginBottom: 8 }}>
          <Typography variant="h3" className={classes.menuItemLabel}>
            Purpose
          </Typography>
        </div>
        <div>
          <Typography variant="body1" component="p">
            {text.purpose}
          </Typography>
        </div>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <div>
          <Typography variant="h3" className={classes.menuItemLabel}>
            Fields
          </Typography>
        </div>
        <div>
          <List dense disablePadding style={{ padding: 0 }}>
            {Object.entries(text.fields).map(([key, value]) => (
              <ListItem key={key} disableGutters style={{ padding: 0 }}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body1",
                    component: "span",
                    className: classes.bold,
                  }}
                  primary={`${key}`}
                  secondaryTypographyProps={{
                    variant: "body1",
                    component: "span",
                  }}
                  secondary={value}
                />
              </ListItem>
            ))}
          </List>
        </div>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        {text.model_links && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <Typography variant="h3" className={classes.menuItemLabel}>
                Model Links
              </Typography>
            </div>
            <div>
              <List dense disablePadding style={{ padding: 0 }}>
                {Object.entries(text.model_links).map(([key, value]) => (
                  <ListItem key={key}>
                    <Link
                      href={value}
                      target="_blank"
                      rel="noopener"
                      className={classes.link}
                    >
                      {key}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton className={classes.iconButton} onClick={handleOpen}>
        <InfoIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        getContentAnchorEl={null}
      >
        {renderMenuItems()}
      </Menu>
    </div>
  );
};

export default InfoTooltip;
