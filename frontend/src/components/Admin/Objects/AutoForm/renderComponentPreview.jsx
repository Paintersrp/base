import { List, Typography } from "@material-ui/core";
import ContentSection from "../../../About/Content/ContentSection";
import AccordionQA from "../../../About/FAQ/AccordionQA";
import Heading from "../../../About/Heading/Heading";
import Value from "../../../About/Values/Value";
import Values from "../../../About/Values/Values";
import Contact from "../../../Contact/Contact/Contact";
import Hours from "../../../Contact/Hours/Hours";
import Information from "../../../Contact/Information/Information";
import ApplicationForm from "../../../Contact/Jobs/Individual/ApplicationForm";
import JobDetails from "../../../Contact/Jobs/Individual/JobDetails";
import Member from "../../../Contact/Members/Member";
import Members from "../../../Contact/Members/Members";
import Social from "../../../Contact/Social/Social";
import Container from "../../../Elements/Layout/Container/Container";
import HeroBlock from "../../../Elements/TextBlocks/HeroBlock/HeroBlock";
import TitleBlock from "../../../Elements/TextBlocks/TitleBlock/TitleBlock";
import Hero from "../../../Landing/Hero/Hero";
import LatestNews from "../../../Landing/News/News";
import Process from "../../../Landing/Processes/Process";
import Processes from "../../../Landing/Processes/Processes";
import Benefit from "../../../Services/Benefits/Benefit";
import Benefits from "../../../Services/Benefits/Benefits";
import ProcessImage from "../../../Services/Individual/ServiceProcess/ProcessImage";
import ProcessText from "../../../Services/Individual/ServiceProcess/ProcessText";
import SelectedService from "../../../Services/Quiz/ResultsDisplay/SelectedService";
import ServicesResult from "../../../Services/Quiz/ResultsDisplay/ServicesResult";
import ComparisonTable from "../../../Services/Quiz/TablesDisplay/ComparisonTable";
import ReadMessage from "../../Panel/ReadMessage";

export function renderComponentPreview(modelName, formData, newImage) {
  console.log("modelName", modelName);
  console.log("formData", formData);

  const blockData = {
    subtitle: "Subtitle of the Block",
    title: "Title of the Block",
    alignment: "center", // or "left" or "right"
    description: "Description of the Block",
    show_divider: true, // or false
  };

  switch (modelName) {
    case "HeroBlock":
      return (
        <HeroBlock
          title={formData[0].title}
          heading={formData[0].heading}
          btnText={formData[0].buttonText}
          text={formData[0].text}
          showButton={true}
        />
      );
    case "TitleBlock":
      return (
        <TitleBlock
          subtitle={formData[0].subtitle}
          title={formData[0].title}
          description={formData[0].description}
          alignment={formData[0].alignment}
          showDivider={formData[0].showDivider}
        />
      );
    case "ServiceTier":
      return (
        <ServicesResult recommendedId={1} others={formData} editMode={false} />
      );
    case "AboutBlock":
      return <Heading data={formData[0]} newImage={newImage} />;
    case "MissionStatement":
      return (
        <ContentSection
          editState={false}
          title={formData[0].title}
          body={formData[0].body}
          type={"missionstatement"}
        />
      );
    case "CompanyHistory":
      return (
        <ContentSection
          editState={false}
          title={formData[0].title}
          body={formData[0].body}
          type={"missionstatement"}
        />
      );
    case "Processes":
      return (
        <Processes
          processData={formData[0].processes}
          blockData={formData[0].title_block}
          showTitleBlock={true}
        />
      );
    case "Process":
      return <Processes processData={formData} showTitleBlock={false} />;
    case "Value":
      return (
        <div>
          <Values valuesData={formData} editMode={false} />
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
      return <Hours hoursData={formData[0]} showTitle={false} />;
    case "TeamMember":
      return <Members membersData={formData} editMode={false} />;

    case "Benefits":
      return (
        <div style={{ width: "100%" }}>
          <Benefits
            benefits={formData}
            block={blockData}
            setBlock={console.log("Hi")}
            editMode={false}
            showBlock={false}
          />
        </div>
      );
    case "ProcessTextItem":
      return (
        <List style={{ maxWidth: "50%" }}>
          {formData.map((item, index) => (
            <ProcessText textItem={item} index={index} editMode={false} />
          ))}
        </List>
      );
    case "ContentTextBlock":
      return (
        <>
          <Typography variant="h5" color="primary">
            {formData[0].title}
          </Typography>
          <Typography variant="body2">{formData[0].description}</Typography>
        </>
      );
    case "ProcessImageItem":
      return (
        <Container>
          <ProcessImage imageItem={formData[0].image} preview={true} />
        </Container>
      );
    case "Contact":
      return (
        <Contact
          color="dark"
          contactData={formData[0].contact_info}
          hoursData={formData[0].hours}
          socialData={formData[0].socials}
          editMode={false}
        />
      );
    case "Hero":
      return (
        <Hero
          data={formData[0].hero_block}
          contactData={formData[0].contact}
          socialData={formData[0].social}
          editMode={false}
          form={true}
        />
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
    case "LatestNews":
      return (
        <LatestNews
          articlesData={formData[0].latest_articles}
          blockData={blockData}
        />
      );
    case "JobPosting":
      return <JobDetails job={formData[0]} />;
    case "ApplicationForm":
      return <ApplicationForm job={1} />;
    case "ServiceTable":
      return (
        <ComparisonTable
          tableData={formData[0]}
          heading={null}
          currentId={1}
          links={false}
          editMode={false}
        />
      );
    case "FAQ":
      return (
        <div style={{ width: "100%" }}>
          <AccordionQA faq={formData} edit={false} />
        </div>
      );
    default:
      return <div>Component Pair Not Found: {modelName}</div>;
  }
}
