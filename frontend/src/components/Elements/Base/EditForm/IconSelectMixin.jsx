import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
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
import {
  IoLogoAngular,
  IoInfiniteSharp,
  IoMedalSharp,
  IoBusinessSharp,
} from "react-icons/io5";
import { GiUpgrade } from "react-icons/gi";
import { CgWebsite } from "react-icons/cg";
import Container from "../../Layout/Container/Container";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    maxHeight: "50px",
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
  label: {
    color: "black",
  },
  menuPaper: {
    background: theme.palette.background.default,
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
  { name: "GiUpgrade", component: <GiUpgrade /> },
  { name: "CgWebsite", component: <CgWebsite /> },
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
  {
    name: "IoBusinessSharp",
    component: <IoBusinessSharp />,
  },
];

function IconSelectMixin({
  fieldName,
  handleChange,
  formData,
  background = "#F5F5F5",
}) {
  const classes = useStyles();
  // console.log(fieldName);
  // console.log(formData[fieldName]);
  return (
    <FormControl style={{ width: "100%", paddingBottom: 8 }} variant="outlined">
      <Select
        className={classes.select}
        variant="outlined"
        value={fieldName ? formData[fieldName] : formData.icon}
        onChange={handleChange}
        displayEmpty
        name={fieldName}
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
      >
        <MenuItem value="Select an icon">
          <em>Select an icon</em>
        </MenuItem>
        {iconList.map((icon) => (
          <MenuItem key={icon.name} value={icon.name}>
            <Container justify="flex-start" align="center">
              <ListItemIcon
                style={{
                  fontSize: "1.1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {icon.component}
              </ListItemIcon>
              <ListItemText
                primary={icon.name}
                style={{ textAlign: "start" }}
              />
            </Container>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default IconSelectMixin;
