import React from "react";
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

import BaseContent from "../../../../Elements/Base/BaseContent";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";

import SaveButton from "../../../Parts/Buttons/SaveButton";
import DeleteButton from "../../../Parts/Buttons/DeleteButton";
import ClearButton from "../../../Parts/Buttons/ClearButton";
import ExampleSwitchMenu from "../../../Parts/Menus/ExampleSwitch/ExampleSwitchMenu.jsx";
import useExampleSwitch from "../../../Parts/Menus/ExampleSwitch/useExampleSwitch";

import FAQTabs from "../../examples/FAQTabs";
import FAQCondensedList from "../../examples/FAQCondensedList";
import FAQList from "../../examples/FAQList";

import { faqLayoutOptions } from "../../const/faqConstants";
import { previewStyles } from "./previewStyles";

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
  const classes = previewStyles();
  const { selectedOption, handleOptionSelect, showExample, handleShowExample } =
    useExampleSwitch(faqLayoutOptions);

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
        layoutOptions={faqLayoutOptions}
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
          {selectedOption === "option1" && <FAQTabs />}
          {selectedOption === "option2" && <FAQCondensedList />}
          {selectedOption === "option3" && <FAQList />}
        </div>
      )}
    </BaseContent>
  );
};

export default FAQBuilderPreview;
