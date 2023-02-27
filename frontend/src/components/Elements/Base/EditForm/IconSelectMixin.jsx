import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import {
  FaUser,
  FaUsers,
  FaShieldAlt,
  FaPencilRuler,
  FaBook,
  FaBalanceScale,
  FaCogs,
  FaGlobe,
} from "react-icons/fa";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import LockIcon from "@material-ui/icons/Lock";
import DesignIcon from "@material-ui/icons/Brush";
import DevelopIcon from "@material-ui/icons/Code";
import HostingIcon from "@material-ui/icons/Public";
import LaunchIcon from "@material-ui/icons/Launch";
import { IoLogoAngular, IoInfiniteSharp, IoMedalSharp } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    maxHeight: "64px",
    background: "#F5F5F5",
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-root": {},
    "& .MuiFormLabel-root": {
      color: "red",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 64,
      overflowY: "auto",
    },
  },
}));

const iconList = [
  { name: "FaUser", component: <FaUser /> },
  { name: "FaUsers", component: <FaUsers /> },
  { name: "FaShieldAlt", component: <FaShieldAlt /> },
  {
    name: "FaPencilRuler",
    component: <FaPencilRuler />,
  },
  { name: "FaBook", component: <FaBook /> },
  {
    name: "FaBalanceScale",
    component: <FaBalanceScale />,
  },
  { name: "FaCogs", component: <FaCogs /> },
  { name: "FaGlobe", component: <FaGlobe /> },
  { name: "DesignIcon", component: <DesignIcon /> },
  { name: "DevelopIcon", component: <DevelopIcon /> },
  { name: "LockIcon", component: <LockIcon /> },
  { name: "HostingIcon", component: <HostingIcon /> },
  { name: "LaunchIcon", component: <LaunchIcon /> },
  {
    name: "AllInclusiveIcon",
    component: <AllInclusiveIcon />,
  },
  {
    name: "IoLogoAngular",
    component: <IoLogoAngular />,
  },
  {
    name: "IoInfiniteSharp",
    component: <IoInfiniteSharp />,
  },
  {
    name: "IoMedalSharp",
    component: <IoMedalSharp />,
  },
];

function IconSelectMixin({ handleChange, formData, background = "white" }) {
  const classes = useStyles();

  return (
    <FormControl style={{ width: "100%" }} variant="outlined">
      <InputLabel shrink htmlFor="icon-select-label">
        Icon
      </InputLabel>
      <Select
        className={classes.select}
        variant="outlined"
        value={formData.icon}
        onChange={handleChange}
        displayEmpty
        name="icon"
        style={{
          minWidth: "100%",
          background: background,
          borderRadius: 4,

          "&:focus": {
            border: "2px solid #1976d2",
          },
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
          classes: {
            paper: classes.menuPaper,
          },
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
        }}
        input={<OutlinedInput label="Icon" />}
      >
        <MenuItem value="Select an icon">
          <em>Select an icon</em>
        </MenuItem>
        {iconList.map((icon) => (
          <MenuItem key={icon.name} value={icon.name}>
            <Grid container>
              <ListItemIcon
                style={{ fontSize: "1.1rem", alignItems: "center" }}
              >
                {icon.component}
              </ListItemIcon>
              <ListItemText primary={icon.name} />
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default IconSelectMixin;

{
  /* <FormControl style={{ width: "100%" }}>
        <FormControlLabel
          style={{
            fontSize: "0.8rem",
            width: "100%",
            margin: 0,
            color: "black",
          }}
          control={
            <Select
              className={classes.select}
              variant="outlined"
              // label="select"
              value={
                formData[fieldName]
                  ? formData[fieldName]
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())
                  : ""
              }
              onChange={handleInputChange}
              displayEmpty
              name={fieldName}
              margin="dense"
              style={{ minWidth: "100%", padding: 0 }}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
                classes: {
                  paper: classes.menuPaper,
                },
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
            >
              <MenuItem value="">
                <em>Select Text Alignment</em>
              </MenuItem>
              {Object.entries(choices).map(([key, value]) => (
                <MenuItem key={key} value={value.display}>
                  <span style={{ color: "black" }}>{value.display}</span>
                </MenuItem>
              ))}
            </Select>
          }
        />
      </FormControl> */
}
