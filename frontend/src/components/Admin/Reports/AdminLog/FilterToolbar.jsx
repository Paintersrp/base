import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FilterList } from "@material-ui/icons";
import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FilterListIcon from "@mui/icons-material/FilterList";

const useStyles = makeStyles((theme) => ({
  filterToolbar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(4, 0, 0, 0),
  },
  // filterAccordion: {
  //   width: "100%",
  //   background: `${theme.palette.background.default} !important`,
  //   marginBottom: theme.spacing(0),
  //   // margin: "0px !important",
  // },
  filterAccordion: {
    boxShadow: "none",
    border: "1px solid rgba(0, 0, 0, .01)",
    borderRadius: "4px",
    background: `${theme.palette.background.default} !important`,
    marginBottom: "16px",
    "&:before": {
      content: "none",
    },
  },
  filterAccordionSummary: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.background.paper,
    minHeight: "unset",
    "&.Mui-expanded": {
      minHeight: "unset",
    },
  },
  filterAccordionSummaryContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  // filterAccordionSummary: {
  //   justifyContent: "space-between",
  // },
  // filterButtonGroup: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   justifyContent: "flex-start",
  //   "& > *": {
  //     margin: theme.spacing(0.5),
  //   },
  // },
  filterButtonGroup: {
    display: "flex",
    flexWrap: "wrap",
  },
  filterButton: {
    border: "1px solid lightgrey",
    borderRadius: 20,
    marginRight: theme.spacing(1),
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    "&:hover": {
      backgroundColor: "#f8f8f8",
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

export default function FilterToolbar({
  appLabels,
  modelNames,
  actionFlags,
  appLabelFilter,
  modelNameFilter,
  actionFlagFilter,
  handleAppLabelFilterChange,
  handleModelNameFilterChange,
  handleActionFlagFilterChange,
  handleResetFilter,
  handleResetSort,
  orderBy,
}) {
  const classes = useStyles();

  return (
    <div className={classes.filterToolbar}>
      <Grid container>
        <Grid item xs={12} style={{ padding: "0px 0px 16px 0px" }}>
          <Accordion className={classes.filterAccordion} sx={{ p: 0.5, m: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.filterAccordionSummary}
              classes={{ content: classes.filterAccordionSummaryContent }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FilterList style={{ fontSize: "1.25rem" }} />
                  <Typography
                    variant="subtitle1"
                    style={{ marginLeft: 8, marginRight: 16 }}
                  >
                    Filter by Model Name
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {modelNameFilter.length > 0
                    ? modelNameFilter
                        .map(
                          (model) =>
                            model.charAt(0).toUpperCase() + model.slice(1)
                        )
                        .join(", ")
                    : "All Models"}
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <ToggleButtonGroup
                value={modelNameFilter}
                onChange={handleModelNameFilterChange}
                className={classes.filterButtonGroup}
                size="small"
              >
                <ToggleButton
                  value={null}
                  className={classes.filterButton}
                  aria-label="All"
                  sx={{
                    p: 1,
                    mr: 1,
                    mt: 1,
                  }}
                >
                  All Models
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                multiple
                value={modelNameFilter}
                onChange={handleModelNameFilterChange}
                className={classes.filterButtonGroup}
                size="small"
              >
                {modelNames.map((modelName) => (
                  <ToggleButton
                    className={classes.filterButton}
                    key={modelName}
                    value={modelName.toLowerCase()}
                    aria-label={modelName}
                    sx={{
                      p: 1,
                      mr: 1,
                      mt: 1,
                      border: "1px solid lightgrey !important",
                    }}
                  >
                    {modelName}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={6} style={{ padding: "0px 8px 0px 0px" }}>
          <Accordion className={classes.filterAccordion} sx={{ p: 0.5, m: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.filterAccordionSummary}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FilterList style={{ fontSize: "1.25rem" }} />
                  <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
                    Filter by App Name
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {appLabelFilter.length > 0
                    ? appLabelFilter
                        .map(
                          (label) =>
                            label.charAt(0).toUpperCase() + label.slice(1)
                        )
                        .join(", ")
                    : "All Labels"}
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <ToggleButtonGroup
                value={appLabelFilter}
                onChange={handleAppLabelFilterChange}
                className={classes.filterButtonGroup}
                size="small"
                style={{ width: "100%" }}
              >
                <ToggleButton value={null} aria-label="All">
                  All Labels
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                value={appLabelFilter}
                onChange={handleAppLabelFilterChange}
                className={classes.filterButtonGroup}
                size="small"
              >
                {appLabels.map((appLabel) => (
                  <ToggleButton
                    key={appLabel}
                    value={appLabel.toLowerCase()}
                    aria-label={appLabel}
                    sx={{
                      p: 1,
                      mr: 1,
                      mt: 1,
                      border: "1px solid lightgrey !important",
                    }}
                  >
                    {appLabel}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={6} style={{ padding: "0px 0px 0px 8px" }}>
          <Accordion className={classes.filterAccordion} sx={{ p: 0.5, m: 0 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              className={classes.filterAccordionSummary}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FilterList style={{ fontSize: "1.25rem" }} />
                  <Typography variant="subtitle1" style={{ marginLeft: 8 }}>
                    Filter by Action Flag
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                >
                  {actionFlagFilter.length > 0
                    ? actionFlagFilter
                        .map(
                          (flag) => flag.charAt(0).toUpperCase() + flag.slice(1)
                        )
                        .join(", ")
                    : "All Flags"}
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <ToggleButtonGroup
                value={modelNameFilter}
                onChange={handleActionFlagFilterChange}
                className={classes.filterButtonGroup}
                size="small"
                style={{ width: "100%" }}
              >
                <ToggleButton
                  value={null}
                  aria-label="All"
                  sx={{
                    p: 1,
                    mr: 1,
                    mt: 1,
                  }}
                >
                  All Flags
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                size="small"
                value={actionFlagFilter}
                onChange={handleActionFlagFilterChange}
                className={classes.filterGroup}
              >
                {actionFlags.map((actionFlag) => (
                  <ToggleButton
                    key={actionFlag}
                    value={actionFlag.toLowerCase()}
                    aria-label={actionFlag}
                    sx={{
                      p: 1,
                      mr: 1,
                      mt: 1,
                      border: "1px solid lightgrey !important",
                    }}
                  >
                    {actionFlag}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: orderBy !== "" ? "space-between" : "flex-end",
            marginTop: 8,
          }}
        >
          {orderBy !== "" && (
            <Tooltip
              title={`Reset Sort`}
              placement="right"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton onClick={handleResetSort}>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          )}
          {(actionFlagFilter.length > 0 ||
            appLabelFilter.length > 0 ||
            modelNameFilter.length > 0) && (
            <Tooltip
              title={`Reset Filter`}
              placement="left"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton onClick={handleResetFilter}>
                <FilterListOffIcon />
              </IconButton>
            </Tooltip>
            // <StyledButton
            //   buttonText="Reset Filter"
            //   minWidth={0}
            //   onClick={handleResetFilter}
            // />
          )}
        </div>
      </Grid>
    </div>
  );
}
