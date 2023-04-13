import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Collapse, IconButton, useMediaQuery } from "@material-ui/core";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.dark,
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  subheader: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  iconDefault: {
    color: theme.palette.primary.main,
  },
}));

function BaseContent({
  header,
  subheader,
  children,
  maxWidth,
  boxShadow = 1,
  pad = 3,
  mb = 3,
  mt = 3,
  pl = 0,
  pr = 0,
  pt = 0,
  pb = 0,
  br = 1,
  background = "#F5F5F5",
  showIcon = false,
  collapse = false,
  topIcon = <WorkSharpIcon style={{ color: "#2e3b55" }} fontSize="medium" />,
  justifyChildren = "flex-start",
  alignChildren = "flex-start",
  fd = "row",
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Grid
      item
      xs={12}
      style={{
        padding: 0,
        margin: 0,
        width: "100%",
        paddingRight: theme.spacing(pr),
        paddingLeft: theme.spacing(pl),
        paddingTop: theme.spacing(pt),
        paddingBottom: theme.spacing(pb),
        background: background,
      }}
    >
      <div
        style={{
          maxWidth: maxWidth,
          padding: theme.spacing(pad),
          marginBottom: theme.spacing(mb) || theme.spacing(2),
          marginTop: theme.spacing(mt),
          boxShadow: theme.shadows[boxShadow],
          borderRadius: theme.spacing(br),
          background: background,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            {header && (
              <Typography variant="h3" className={classes.header}>
                {header}
              </Typography>
            )}
          </div>
          {collapse && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
              }}
            >
              <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <ExpandMore /> : <ExpandLess />}
              </IconButton>
            </div>
          )}
        </div>

        {subheader && (
          <Typography variant="body2" className={classes.subheader}>
            {subheader}
          </Typography>
        )}
        <Collapse in={open}>
          <Grid
            container
            spacing={0}
            style={{
              justifyContent: justifyChildren,
              flexDirection: fd,
              alignItems: alignChildren,
            }}
          >
            {children}
          </Grid>
        </Collapse>
      </div>
    </Grid>
  );
}

export default BaseContent;
