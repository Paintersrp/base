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
import FAQTabs from "../../FAQs/Display/FAQTabs";
import FAQCondensedList from "../../FAQs/Display/FAQCondensedList";
import FAQList from "../../FAQs/Display/FAQList";
import TileCard from "../Display/TileCard";
import StandardCard from "../Display/StandardCard";
import DenseCard from "../Display/DenseCard";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import CardSkeleton from "../../Parts/Skeletons/Cards/CardSkeleton";
import LargeCard from "../Display/PluginBasedCard";
import TileSkeleton from "../../Parts/Skeletons/Cards/TileSkeleton";
import DenseSkeleton from "../../Parts/Skeletons/Cards/DenseSkeleton";

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
  { value: "option1", label: "Tile" },
  { value: "option2", label: "Standard" },
  { value: "option3", label: "Dense" },
];

const CardBuilderPreview = ({ formData }) => {
  const classes = useStyles();
  const { selectedOption, handleOptionSelect, showExample, handleShowExample } =
    useExampleSwitch(layoutOptions);

  return (
    <BaseContent
      fd="column"
      header="Card Preview"
      subheader={showExample ? "Layout Previews" : formData.name || "Card Name"}
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
        <Flexer j="c" mt={16}>
          {formData.cardType === "Tile" && <TileSkeleton formData={formData} />}
          {formData.cardType === "Standard" && (
            <CardSkeleton formData={formData} />
          )}
          {formData.cardType === "Dense" && (
            <DenseSkeleton formData={formData} />
          )}
          {formData.cardType === "Large" && (
            <CardSkeleton formData={formData} />
          )}
          {!formData.cardType && <CardSkeleton formData={formData} />}
        </Flexer>
      ) : (
        <Flexer j="c" mt={16}>
          {selectedOption === "option1" && <TileCard />}
          {selectedOption === "option2" && <LargeCard />}
          {selectedOption === "option3" && <DenseCard />}
          {selectedOption === "option4" && <LargeCard />}
        </Flexer>
      )}
    </BaseContent>
  );
};

export default CardBuilderPreview;
