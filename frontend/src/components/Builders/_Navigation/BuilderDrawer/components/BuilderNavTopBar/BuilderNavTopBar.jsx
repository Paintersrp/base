import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Divider, Fade, makeStyles, Tooltip } from "@material-ui/core";
import clsx from "clsx";
import { drawerWidth } from "../../const/drawerOptions";
import Flexer from "../../../../../Elements/Layout/Container/Flexer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BuildIcon from "@mui/icons-material/Build";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "13px",
  },
  appBar: {
    backgroundColor: "#2e3b55",
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menu: {
    "& .MuiPaper-root": {
      borderRadius: 4,
      minWidth: 120,
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: 0,
      },
      "& .MuiMenuItem-root": {
        fontSize: "0.9rem",
        fontWeight: 500,
        "& .MuiSvgIcon-root": {
          fontSize: 12,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: theme.palette.text.secondary,
        },
      },
    },
  },
}));

const builderOptions = [
  { label: "Element Set", value: "Element Set" },
  { label: "Component", value: "Component" },
  { label: "Page", value: "Page" },
  { label: "List", value: "List" },
  { label: "FAQ", value: "FAQ" },
  { label: "Card", value: "Card" },
  { label: "TaskList", value: "TaskList" },
  { label: "Table", value: "Table" },
];

export default function BuilderNavTopBar({
  open,
  handleDrawerOpen,
  currentBuilder,
  changeBuilder,
}) {
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (newBuilder) => {
    changeBuilder(newBuilder);
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: "none" }),
            color: theme.palette.primary.light,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Flexer j="sb" style={{ marginRight: 16 }}>
          <Typography
            variant="h6"
            align="center"
            noWrap
            component="div"
            color="#F5F5F5"
          >
            {currentBuilder} Builder
          </Typography>
          <div style={{ marginRight: 8 }}>
            <Tooltip
              title={`Change Builder`}
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                disableRipple
                color="inherit"
                aria-label="open drawer"
                onClick={handleClick}
                sx={{
                  color: theme.palette.primary.light,
                  marginRight: 0.5,
                }}
              >
                <BuildIcon />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={`Exit to Site`}
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Link to="/">
                <IconButton
                  color="inherit"
                  onClick={handleClick}
                  sx={{
                    color: theme.palette.primary.light,
                    marginLeft: 0.5,
                  }}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
          <Menu
            className={classes.menu}
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            TransitionComponent={Fade}
          >
            {builderOptions.map((item) => (
              <MenuItem
                key={item.value}
                divider
                onClick={() => handleChange(item.value)}
                disableRipple
                selected={item.label === currentBuilder}
              >
                {item.label}
              </MenuItem>
            ))}
          </Menu>
        </Flexer>
      </Toolbar>
    </AppBar>
  );
}
