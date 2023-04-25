import React from "react";
import { Divider } from "@material-ui/core";

import BaseContent from "../../../../Elements/Base/BaseContent";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import useExampleSwitch from "../../../Parts/Menus/ExampleSwitch/useExampleSwitch";
import ExampleSwitchMenu from "../../../Parts/Menus/ExampleSwitch/ExampleSwitchMenu.jsx";

import TileCard from "../../examples/TileCard";
import DenseCard from "../../examples/DenseCard";
import StandardCard from "../../examples/StandardCard";

import CardSkeleton from "../../skeletons/CardSkeleton";
import TileSkeleton from "../../skeletons/TileSkeleton";
import DenseSkeleton from "../../skeletons/DenseSkeleton";
import LargerCard from "../../examples/LargerCard";

import { cardLayoutOptions } from "../../const/cardConstants";

const CardBuilderPreview = ({ formData }) => {
  const { selectedOption, handleOptionSelect, showExample, handleShowExample } =
    useExampleSwitch(cardLayoutOptions);

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
        layoutOptions={cardLayoutOptions}
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
          {selectedOption === "option2" && <StandardCard />}
          {selectedOption === "option3" && <DenseCard />}
          {selectedOption === "option4" && <LargerCard />}
        </Flexer>
      )}
    </BaseContent>
  );
};

export default CardBuilderPreview;
