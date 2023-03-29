import About from "../About/About/About";
import FAQAccordion from "../About/FAQ/FAQAccordion";
import Values from "../About/Values/Values";
import IconScroller from "../Elements/Animations/IconScroller/IconScroller";
import Hero from "../Landing/Hero/Hero";
import LatestNews from "../Landing/News/News";
import NewsletterForm from "../Landing/Newsletter/NewsletterForm";
import Pricing from "../Landing/Pricing/Pricing";
import Processes from "../Landing/Processes/Processes";
import Quiz from "../Services/Quiz/Quiz/Quiz";
import { routerStyles } from "./routerStyles";

const ComponentRouter = (props) => {
  const classes = routerStyles();
  const { apiData, type, setError, editMode, ...componentProps } = props;
  console.log("data", apiData[0].service_tiers);

  switch (type) {
    case "Value":
      return (
        <div className={classes.valueRoot}>
          <div className={classes.valueContainer}>
            <Values valuesData={apiData} editMode={false} />
          </div>
        </div>
      );
    case "ServiceTier":
      return <Pricing serviceData={apiData} />;
    case "About":
      return <About setError={setError} editMode={editMode} />;
    case "FAQ":
      return <FAQAccordion setError={setError} editMode={editMode} />;
    case "Processes":
      return (
        <Processes
          processData={apiData[0].processes}
          blockData={apiData[0].title_block}
        />
      );
    case "LatestNews":
      return (
        <LatestNews
          articlesData={apiData[0].latest_articles}
          blockData={apiData[0].title_block}
        />
      );
    case "NewsletterForm":
      return <NewsletterForm editMode={editMode} />;
    case "IconScroller":
      return (
        <div style={{ display: "flex", width: "100%" }}>
          <IconScroller />
        </div>
      );
    case "Hero":
      return (
        <Hero
          data={apiData[0].hero_block}
          contactData={apiData[0].contact}
          socialData={apiData[0].social}
          editMode={editMode}
          form={true}
        />
      );
    case "Quiz":
      return (
        <Quiz
          serviceData={apiData[0].service_tiers}
          servicesTableData={apiData[0].tiers_table}
          competitorsTableData={apiData[0].competitors_table}
          benefitsData={apiData[0].benefits}
          blockData={apiData[0].title_block}
          quizData={apiData[0].questionnaire}
          editMode={editMode}
        />
      );
    default:
      return <div>Unknown component type: {type}</div>;
  }
};

export default ComponentRouter;
