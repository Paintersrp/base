import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";

import Flexer from "../../../Elements/Layout/Container/Flexer";

const useStyles = makeStyles((theme) => ({
  previewButton: {
    color: theme.palette.info.light,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const HeaderSkeleton = ({ headerData }) => {
  const classes = useStyles();
  return (
    <Flexer j="c" a="c" fd="column" mt={16}>
      {headerData.title ? (
        <Text t={headerData.headerType} a={headerData.alignment || "fs"}>
          {headerData.title}
        </Text>
      ) : (
        <Skeleton variant="text" width={250} height={40} />
      )}
      {headerData.subtitleToggle && (
        <React.Fragment>
          {headerData.subtitle ? (
            <Text
              t={
                headerData.headerType === "h1" || headerData.headerType === "h2"
                  ? "h4"
                  : headerData.headerType === "h3" ||
                    headerData.headerType === "h4"
                  ? "h6"
                  : null
              }
              a={headerData.alignment || "fs"}
            >
              {headerData.subtitle}
            </Text>
          ) : (
            <React.Fragment>
              <Skeleton variant="text" width={325} height={20} />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {headerData.taglineToggle && (
        <React.Fragment>
          {headerData.tagline ? (
            <Text
              t="body2"
              a={headerData.alignment || "fs"}
              c="secondary"
              s="0.8rem"
            >
              {headerData.tagline}
            </Text>
          ) : (
            <Skeleton variant="text" width={225} height={17} />
          )}
        </React.Fragment>
      )}

      <Tooltip
        title="Choose Header"
        placement="bottom"
        size="small"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton className={classes.previewButton} style={{ marginTop: 8 }}>
          <CollectionsBookmarkIcon />
        </IconButton>
      </Tooltip>
    </Flexer>
  );
};

export default HeaderSkeleton;
