import React from "react";
import { Divider } from "@material-ui/core";
import BaseContent from "../../../Elements/Base/BaseContent";
import useExampleSwitch from "../../Parts/Menus/ExampleSwitch/useExampleSwitch";
import ExampleSwitchMenu from "../../Parts/Menus/ExampleSwitch/ExampleSwitchMenu.jsx";
import TileCard from "../Display/TileCard";
import DenseCard from "../Display/DenseCard";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import CardSkeleton from "../../Parts/Skeletons/Cards/CardSkeleton";
import LargeCard from "../Display/PluginBasedCard";
import TileSkeleton from "../../Parts/Skeletons/Cards/TileSkeleton";
import DenseSkeleton from "../../Parts/Skeletons/Cards/DenseSkeleton";

const layoutOptions = [
  { value: "option1", label: "Tile" },
  { value: "option2", label: "Standard" },
  { value: "option3", label: "Dense" },
];

const CardBuilderPreview = ({ formData }) => {
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
