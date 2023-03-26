import { Typography } from "@material-ui/core";
import ContentSection from "../../../About/Content/ContentSection";
import AccordionQA from "../../../About/FAQ/AccordionQA";
import Heading from "../../../About/Heading/Heading";
import Value from "../../../About/Values/Value";
import Hours from "../../../Contact/Hours/Hours";
import Information from "../../../Contact/Information/Information";
import JobDetails from "../../../Contact/Jobs/Individual/JobDetails";
import Member from "../../../Contact/Members/Member";
import Social from "../../../Contact/Social/Social";
import Container from "../../../Elements/Layout/Container/Container";
import HeroBlock from "../../../Elements/TextBlocks/HeroBlock/HeroBlock";
import TitleBlock from "../../../Elements/TextBlocks/TitleBlock/TitleBlock";
import Process from "../../../Landing/Processes/Process";
import Benefit from "../../../Services/Benefits/Benefit";
import ProcessImage from "../../../Services/Individual/ServiceProcess/ProcessImage";
import ProcessText from "../../../Services/Individual/ServiceProcess/ProcessText";
import SelectedService from "../../../Services/Quiz/ResultsDisplay/SelectedService";
import ReadMessage from "../../Panel/ReadMessage";

export function renderComponentPreview(modelMetadata, formData, newImage) {
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
    case "AboutBlock":
      return <Heading data={formData} newImage={newImage} />;
    case "MissionStatement":
      return (
        <ContentSection
          editState={false}
          title={formData.title}
          body={formData.body}
          type={"missionstatement"}
        />
      );
    case "CompanyHistory":
      return (
        <ContentSection
          editState={false}
          title={formData.title}
          body={formData.body}
          type={"missionstatement"}
        />
      );
    case "Process":
      return <Process step={formData} noEdit fade={false} />;
    case "Value":
      return (
        <div>
          <Value
            value={formData}
            edit={false}
            index={0}
            start={Math.floor(Math.random() * 2)}
          />
        </div>
      );
    case "ContactInformation":
      return <Information contactData={formData} showTitle={false} />;
    case "Socials":
      return (
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Social contactData={formData} showTitle={false} color="dark" />
        </div>
      );
    case "Hours":
      return <Hours hoursData={formData} showTitle={false} />;
    case "TeamMember":
      return <Member member={formData} newImage={newImage} />;
    case "Benefits":
      return <Benefit benefit={formData} edit={false} />;
    case "ProcessTextItem":
      return <ProcessText textItem={formData} index={0} editMode={false} />;
    case "ContentTextBlock":
      return (
        <>
          <Typography variant="h5" color="primary">
            {formData.title}
          </Typography>
          <Typography variant="body2">{formData.description}</Typography>
        </>
      );
    case "ProcessImageItem":
      return (
        <Container>
          <ProcessImage imageItem={formData.image} preview={true} />
        </Container>
      );
    case "Messages":
      return (
        <ReadMessage
          message={formData}
          goBack={false}
          deleteBtn={false}
          metadata={modelMetadata.fields}
          save={false}
        />
      );
    case "JobPosting":
      return <JobDetails job={formData} />;
    case "FAQ":
      return (
        <div style={{ width: "100%" }}>
          <AccordionQA faq={formData} edit={false} />
        </div>
      );
    default:
      return null;
  }
}
