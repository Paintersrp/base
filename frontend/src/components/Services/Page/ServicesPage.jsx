import React from "react";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import Benefits from "../Benefits/Benefits";
import CaseStudiesBasic from "../../WIP/CaseStudies/CaseStudiesBasic";
import InteractiveQuiz from "../../WIP/Interactive/InteractiveQuiz";
import Magazine from "../../WIP/Magazine/Magazine";
import Services from "../Services/Services";
import ComparisonChart from "../ComparisonChart/ComparisonChart";
import Reviews from "../Reviews/Reviews";
import { Container, Grid } from "@material-ui/core";
import Partners from "../Partners/Partners";
import ServiceStatistics from "../ServiceStatistics/ServiceStatistics";

function ServicesPage() {
  return (
    <ContentLayout
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      <Grid container justifyContent="center">
        <div style={{ maxWidth: 1400 }}>
          <Services />
          <ComparisonChart />
          <Reviews />
          <Benefits />
          <Partners />
          <ServiceStatistics
            numCustomers={1000}
            avgSatisfaction={4.5}
            numProjectsCompleted={500}
            revenue={10000}
            teamSize={10}
          />
        </div>
      </Grid>
    </ContentLayout>
  );
}

export default ServicesPage;
