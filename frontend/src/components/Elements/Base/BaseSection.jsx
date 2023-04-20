import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Collapse, Divider, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.dark,
    width: "100%",
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

function BaseSection({
  header,
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
  headerAlign = "left",
  centerAlignIconPosition = "right",
  manualOpen = true,
  setManualOpen = null,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const theme = useTheme();

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
              alignItems: "center",
              width: "100%",
              order:
                headerAlign === "right" && collapse
                  ? 1
                  : headerAlign === "center" && collapse
                  ? centerAlignIconPosition === "right"
                    ? 0
                    : 1
                  : 1,
              marginLeft:
                headerAlign === "center" && collapse
                  ? centerAlignIconPosition === "right"
                    ? 30
                    : 0
                  : 0,
              marginRight:
                headerAlign === "center" && collapse
                  ? centerAlignIconPosition === "left"
                    ? 30
                    : 0
                  : 0,
            }}
          >
            {header && (
              <Typography
                variant="body2"
                align={headerAlign}
                className={classes.header}
              >
                {header}
              </Typography>
            )}
          </div>

          {collapse && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order:
                  headerAlign === "right" && collapse
                    ? 0
                    : headerAlign === "center" && collapse
                    ? centerAlignIconPosition === "right"
                      ? 1
                      : 0
                    : 1,
              }}
            >
              <IconButton
                className={`${classes.expandButton} ${
                  setManualOpen
                    ? manualOpen
                      ? "rotate"
                      : ""
                    : open
                    ? "rotate"
                    : ""
                }`}
                size="small"
                onClick={setManualOpen ? setManualOpen : () => setOpen(!open)}
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          )}
        </div>
        {divider && (
          <div style={{ width: "100%" }}>
            <Divider />
          </div>
        )}

        <Collapse in={setManualOpen ? manualOpen : open}>
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

export default BaseSection;
