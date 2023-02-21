import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  FormControlLabel,
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
import { IoLogoAngular, IoInfiniteSharp, IoMedalSharp } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    maxHeight: "64px",
    overflow: "auto",
    background: theme.palette.text.light,
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white !important",
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.dark,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 40,
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

function IconSelectMixin({ handleChange, formData }) {
  const classes = useStyles();

  return (
    <FormControl style={{ width: "100%" }}>
      <Grid container spacing={0} style={{ paddingTop: 8, paddingBottom: 8 }}>
        <Grid item xs={12} sm={12}>
          <FormControlLabel
            style={{ fontSize: "0.8rem", width: "100%", margin: 0 }}
            control={
              <Select
                className={classes.select}
                variant="outlined"
                value={formData.icon}
                onChange={handleChange}
                displayEmpty
                name="icon"
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
                  <em>Select an icon</em>
                </MenuItem>
                {iconList.map((icon) => (
                  <MenuItem key={icon.name} value={icon.name}>
                    <Grid container>
                      <ListItemIcon
                        style={{ fontSize: "1.25rem", alignItems: "center" }}
                      >
                        {icon.component}
                      </ListItemIcon>
                      <ListItemText primary={icon.name} />
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            }
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default IconSelectMixin;
