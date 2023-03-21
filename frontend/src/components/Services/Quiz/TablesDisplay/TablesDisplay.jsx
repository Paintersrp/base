import React from "react";
import { Grid, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ComparisonTable from "./ComparisonTable";
import { SlideIntoViewPort } from "../../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";

const TablesDisplay = ({
  tableData,
  heading = null,
  direction = "right",
  currentId = null,
  links = true,
  editMode,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <SlideIntoViewPort
        animationDuration={isSmallScreen ? 1 : 1.5}
        onScreenPercentage={0.05}
        from={direction}
      >
        <Grid container flex justifyContent="center">
          <Grid
            container
            flex
            justifyContent="center"
            style={{
              maxWidth: isSmallScreen ? 375 : null,
              width: isSmallScreen ? "100%" : 1400,
              marginTop: theme.spacing(4),
            }}
          >
            <ComparisonTable
              tableData={tableData}
              heading={heading}
              currentId={currentId}
              links={links}
              editMode={editMode}
            />
          </Grid>
        </Grid>
      </SlideIntoViewPort>
    </>
  );
};

export default TablesDisplay;
