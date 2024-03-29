import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {
  Collapse,
  Divider,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Text from "../Layout/Text/Text";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.dark,
    marginBottom: theme.spacing(1),
  },
  subheader: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  iconDefault: {
    color: theme.palette.primary.main,
  },
  expandButton: {
    marginRight: 2,
    transition: "transform 0.3s ease-in-out",
    "&.rotate": {
      transform: "rotate(180deg)",
    },
    "&:hover": {},
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
  collapse = false,
  justifyChildren = "flex-start",
  alignChildren = "flex-start",
  fd = "row",
  divider = false,
  headerAlign = "center",
  headerVar = "h3",
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
              flex: 1,
              marginLeft: collapse ? (headerAlign === "left" ? 0 : 30) : 0,
              textAlign: headerAlign,
              width: "100%",
            }}
          >
            {header && (
              <Text t={headerVar} className={classes.header} a={headerAlign}>
                {header}
              </Text>
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
              <IconButton
                className={`${classes.expandButton} ${open ? "rotate" : ""}`}
                size="small"
                onClick={() => setOpen(!open)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          )}
        </div>
        {divider && !open && (
          <div style={{ width: "100%" }}>
            <Divider />
          </div>
        )}

        <Collapse in={open}>
          {subheader && (
            <Typography variant="body2" className={classes.subheader}>
              {subheader}
            </Typography>
          )}

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
