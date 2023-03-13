import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import SubjectIcon from "@mui/icons-material/Subject";

const useStyles = makeStyles((theme) => ({
  appName: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    textAlign: "end",
    width: "100%",
  },
  appLink: {
    textAlign: "end",
    justifyContent: "end",
    fontSize: "1.25rem",
    fontWeight: 700,
    position: "relative",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  navLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  navLink: {
    color: "#fff",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    textDecoration: "none",
    textTransform: "uppercase",
    position: "relative",
    "&:hover": {
      color: theme.palette.secondary.main,
      transform: "translateY(-2px)",
      "&::after": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -5,
        height: 3,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 3,
      },
    },
    [theme.breakpoints.down("lg")]: {
      marginLeft: theme.spacing(1.5),
      marginRight: theme.spacing(1.5),
    },
  },
  altIcon: {
    color: theme.palette.secondary.main,
  },
}));

export default function AppbarContent({
  open,
  toggleDrawer,
  isSmallScreen,
  appName,
}) {
  const classes = useStyles();

  return (
    <Toolbar>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid item xs={1}>
            <IconButton
              onClick={toggleDrawer(!open)}
              edge="start"
              color="inherit"
              aria-label="menu"
              className={clsx(classes.altIcon, {
                [classes.hide]: open,
              })}
            >
              <SubjectIcon />
            </IconButton>
          </Grid>

          {!isSmallScreen && (
            <Grid
              item
              xs={10}
              alignItems="center"
              justifyContent="center"
              style={{
                display: "flex",
              }}
            >
              <div
                className={classes.navLinks}
                style={{
                  display: "flex",
                }}
              >
                <Link
                  to="/about"
                  className={classes.navLink}
                  onClick={toggleDrawer(false)}
                >
                  About
                </Link>
                <Link
                  to="/services"
                  className={classes.navLink}
                  onClick={toggleDrawer(false)}
                >
                  Services
                </Link>
                <Link
                  to="/contact"
                  className={classes.navLink}
                  onClick={toggleDrawer(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/articles"
                  className={classes.navLink}
                  onClick={toggleDrawer(false)}
                >
                  News
                </Link>
                <Link
                  to="/WIP"
                  className={classes.navLink}
                  onClick={toggleDrawer(false)}
                >
                  WIP
                </Link>

                <Link
                  to="/generator"
                  className={classes.navLink}
                  onClick={toggleDrawer(false)}
                >
                  Generator
                </Link>
              </div>
            </Grid>
          )}
          <Grid
            item
            xs={isSmallScreen ? 11 : 1}
            alignItems="center"
            justifyContent="flex-end"
            style={{ display: "flex" }}
          >
            <div
              className={classes.appName}
              style={{ width: isSmallScreen ? "100%" : null }}
            >
              <Link className={classes.appLink} to="/">
                {open && isSmallScreen ? "" : appName}
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>
    </Toolbar>
  );
}
