import React from "react";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ServicesResultCarousel from "./ServicesResultCarousel";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import { quizStyles } from "../styles";
import ServicesResult from "./ServicesResult";
import TablesDisplay from "../TablesDisplay/TablesDisplay";
import Benefits from "../../Benefits/Benefits";
import StyleSharpIcon from "@mui/icons-material/StyleSharp";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";

const ResultsDisplay = ({
  services,
  setServices,
  setRecommendedServices,
  setUnrecommendedServices,
  recommendedServices,
  unrecommendedServices,
  benefitsData,
  benefitsBlock,
  setBenefitsBlock,
  servicesTableData,
  competitorsTableData,
  editMode,
}) => {
  const classes = quizStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(benefitsData);

  const handleReset = () => {
    setServices(services);
    setRecommendedServices("");
    setUnrecommendedServices([]);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box className={`${classes.fadeIn}`} style={{ width: "100%" }}>
      <Grid
        container
        flex
        justifyContent="center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {isSmallScreen ? (
          <div>
            <ServicesResultCarousel
              recommended={recommendedServices}
              others={unrecommendedServices}
              editMode={editMode}
            />
          </div>
        ) : (
          <ServicesResult
            recommendedId={recommendedServices.id}
            others={services}
            editMode={editMode}
          />
        )}
      </Grid>
      <Grid container flex justifyContent="center">
        <StyledButton
          size="small"
          startIcon={<StyleSharpIcon />}
          buttonText="Book a Service"
          minWidth={160}
        />
      </Grid>
      <Grid container flex justifyContent="center">
        <StyledButton
          size="small"
          buttonText="Reset Quiz"
          onClick={handleReset}
          startIcon={<RestartAltSharpIcon />}
          minWidth={160}
        />
      </Grid>
      <TablesDisplay
        tableData={servicesTableData}
        heading="Compare Our Services"
        editMode={editMode}
      />
      <TablesDisplay
        tableData={competitorsTableData}
        heading="How We Stack Up"
        direction="left"
        links={false}
        editMode={editMode}
      />
      <Benefits
        benefits={benefitsData}
        block={benefitsBlock}
        setBlock={setBenefitsBlock}
        editMode={editMode}
      />
    </Box>
  );
};

export default ResultsDisplay;
