import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useMediaQuery } from "@material-ui/core";
import WorkSharpIcon from "@mui/icons-material/WorkSharp";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.dark,
    textAlign: "center",
    marginBottom: theme.spacing(1.5),
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
  topIcon = <WorkSharpIcon style={{ color: "#2e3b55" }} fontSize="medium" />,
  justifyChildren = "flex-start",
}) {
  const classes = useStyles();
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
          marginBottom: theme.spacing(mb),
          marginTop: theme.spacing(mt),
          boxShadow: theme.shadows[boxShadow],
          borderRadius: theme.spacing(br),
          background: background,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {showIcon && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            {topIcon}
          </div>
        )}
        {header && (
          <Typography variant="h3" className={classes.header}>
            {header}
          </Typography>
        )}
        {subheader && (
          <Typography variant="body2" className={classes.subheader}>
            {subheader}
          </Typography>
        )}

        <Grid container spacing={0} style={{ justifyContent: justifyChildren }}>
          {children}
        </Grid>
      </div>
    </Grid>
  );
}

export default BaseContent;
