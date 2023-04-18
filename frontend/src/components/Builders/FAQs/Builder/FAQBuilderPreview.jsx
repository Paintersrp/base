import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tab,
  Tabs,
  Typography,
  IconButton,
  AccordionActions,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Edit } from "@material-ui/icons";
import { Skeleton } from "@mui/material";
import BaseContent from "../../../Elements/Base/BaseContent";
import ErrorMessage from "../../../Elements/Errors/ErrorMessage";
import SaveButton from "../../Parts/Buttons/SaveButton";
import DeleteButton from "../../Parts/Buttons/DeleteButton";
import ClearButton from "../../Parts/Buttons/ClearButton";
import useExampleSwitch from "../../Parts/Menus/ExampleSwitch/useExampleSwitch";
import ExampleSwitchMenu from "../../Parts/Menus/ExampleSwitch/ExampleSwitchMenu.jsx";
import FAQStandardExample from "../Display/FAQStandardExample";
import FAQExample2 from "../Display/FAQExample2";
import FAQExample3 from "../Display/FAQExample3";

const useStyles = makeStyles((theme) => ({
  tab: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.light,
    fontWeight: "700",
    fontFamily: "Roboto",
    textTransform: "uppercase",
    fontSize: "0.95rem",
    marginRight: 5,
    "&:focus": {
      color: theme.palette.background.light,
    },
    "&: .MuiTab-textColorInherit.Mui-selected": {
      color: theme.palette.background.light,
    },
  },
  tabsIndicator: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    borderBottom: `3px solid ${theme.palette.secondary.main}`,
  },
  summary: {
    backgroundColor: theme.palette.background.light,
    fontFamily: "Roboto",
    color: "black",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: 700,
    fontFamily: "Roboto",
    color: "black",
  },
  details: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.light,
    color: "black",
    fontFamily: "Roboto",
    textAlign: "left",
  },

  skeletonPreview: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  skeletonAccordion: {
    borderRadius: "4px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f5f5f5",
  },
  skeletonDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
  },

  editButton: {
    marginRight: theme.spacing(1),
    color: theme.palette.success.light,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.common.white,
    },
  },
  previewButton: {
    color: theme.palette.info.light,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
  },
}));

const layoutOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const FAQBuilderPreview = ({
  formData,
  faqItems,
  currentCategory,
  handleTabChange,
  categories,
  confirmedDelete,
  handleEdit,
  handleSubmit,
  handleClearItems,
  apiErrors,
  handleClearApiErrors,
}) => {
  const classes = useStyles();
  const { selectedOption, handleOptionSelect, showExample, handleShowExample } =
    useExampleSwitch(layoutOptions);

  return (
    <BaseContent
      fd="column"
      header="FAQ Preview"
      subheader={showExample ? "Layout Previews" : formData.name || "FAQ Name"}
    >
      <div style={{ marginTop: 0, marginBottom: 32 }}>
        <Divider />
      </div>

      <ExampleSwitchMenu
        showExample={showExample}
        handleShowExample={handleShowExample}
        selectedOption={selectedOption}
        handleOptionSelect={handleOptionSelect}
        layoutOptions={layoutOptions}
      />
      {!showExample ? (
        <React.Fragment>
          {faqItems.length > 0 && (
            <Tabs
              value={currentCategory}
              onChange={handleTabChange}
              classes={{ indicator: classes.tabsIndicator }}
            >
              {categories.map((category) => (
                <Tab
                  label={category}
                  value={category}
                  classes={{ root: classes.tab }}
                />
              ))}
            </Tabs>
          )}
          {faqItems.length > 0 ? (
            <div className={classes.preview}>
              {faqItems
                .filter((item) => item.category === currentCategory)
                .map((item, index) => (
                  <Accordion key={faqItems.indexOf(item)}>
                    <AccordionSummary
                      className={classes.summary}
                      expandIcon={<ExpandMoreIcon />}
                    >
                      <Typography className={classes.heading}>
                        {item.question}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails className={classes.details}>
                      <Typography>{item.answer}</Typography>
                    </AccordionDetails>
                    <AccordionActions style={{ padding: "0px 4px 4px 0px" }}>
                      <DeleteButton
                        item={item}
                        deleteClick={() => confirmedDelete(item)}
                      />
                      <IconButton
                        onClick={() => handleEdit(index)}
                        className={classes.editButton}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                    </AccordionActions>
                  </Accordion>
                ))}
            </div>
          ) : (
            <div className={classes.skeletonPreview}>
              <Skeleton
                variant="rectangular"
                style={{ marginBottom: 0, paddingBottom: 0 }}
              >
                <Tab />
              </Skeleton>
              <div className={classes.skeletonAccordion}>
                <Skeleton variant="rectangular" width={"100%"} height={50} />
                <div className={classes.skeletonDetails}>
                  <Skeleton variant="rectangular" width={"90%"} height={10} />
                  <Skeleton variant="rectangular" width={"80%"} height={10} />
                  <Skeleton variant="rectangular" width={"70%"} height={10} />
                </div>
              </div>
            </div>
          )}
          {faqItems.length > 0 && (
            <div
              style={{
                marginTop: 48,
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div style={{ marginRight: 6 }}>
                <SaveButton submitFunc={handleSubmit} />
              </div>
              <div style={{ marginLeft: 6 }}>
                <ClearButton clearFunc={handleClearItems} variant="button" />
              </div>
            </div>
          )}
          {apiErrors && (
            <div style={{ marginBottom: 24, width: "100%" }}>
              <ErrorMessage
                errors={apiErrors}
                clearFunc={handleClearApiErrors}
              />
            </div>
          )}
        </React.Fragment>
      ) : (
        <div style={{ width: "100%" }}>
          {selectedOption === "option1" && <FAQStandardExample />}
          {selectedOption === "option2" && <FAQExample2 />}
          {selectedOption === "option3" && <FAQExample3 />}
        </div>
      )}
    </BaseContent>
  );
};

export default FAQBuilderPreview;
