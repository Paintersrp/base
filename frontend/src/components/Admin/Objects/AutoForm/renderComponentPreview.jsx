import { Card, Chip, Paper } from "@material-ui/core";
import HeroBlock from "../../../Elements/TextBlocks/HeroBlock/HeroBlock";
import TitleBlock from "../../../Elements/TextBlocks/TitleBlock/TitleBlock";
import Process from "../../../Landing/Processes/Process";
import SelectedService from "../../../Services/Quiz/ResultsDisplay/SelectedService";

export function renderComponentPreview(modelMetadata, formData, newImage) {
  console.log(modelMetadata);
  console.log("formData", formData);

  if (modelMetadata.modelName === "HeroBlock") {
    console.log("HeroBlockers");
  }

  switch (modelMetadata.modelName) {
    case "HeroBlock":
      return (
        <HeroBlock
          title={formData.title}
          heading={formData.heading}
          btnText={formData.buttonText}
          text={formData.text}
          showButton={true}
        />
      );
    case "TitleBlock":
      return (
        <TitleBlock
          subtitle={formData.subtitle}
          title={formData.title}
          description={formData.description}
          alignment={formData.alignment}
          showDivider={formData.showDivider}
        />
      );
    case "ServiceTier":
      return (
        <SelectedService
          service={formData}
          active={true}
          recommendedId={1}
          newImage={newImage}
        />
      );
    case "Process":
      return <Process step={formData} noEdit fade={false} />;
    default:
      return null;
  }
}
