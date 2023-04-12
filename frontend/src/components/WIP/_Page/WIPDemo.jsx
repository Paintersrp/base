import Demo from "../../Elements/Demo/Demo";
import FeatureCTA from "../Features/FeatureCTA/FeatureCTA";
import Partners from "../Partners/Partners";
import { Divider, Typography, useTheme } from "@material-ui/core";
import StoryTeller from "../StoryTeller/StoryTeller";
import CaseStudiesBasic from "../CaseStudies/CaseStudiesBasic";
import Reviews from "../Reviews/Reviews";
import Infographic from "../Infographic/Infographic";
import Magazine from "../Magazine/Magazine";
import TestForm from "../TestForm";
import LayeredGradientBackground from "../../Elements/Layout/GradientContent";
import { useState } from "react";
import Loading from "../../Elements/Layout/Loading/Loading";
import TableBuilder from "../../Builders/Tables/Builder/TableBuilder";
import ListBuilder from "../../Builders/Lists/Builder/ListBuilder";
import FAQBuilder from "../../Builders/FAQs/Builder/FAQBuilder";
import ListSkeleton from "../../Builders/Parts/Skeletons/ListSkeleton";
import AccordionSkeleton from "../../Builders/Parts/Skeletons/AccordionSkeleton";
import BaseContent from "../../Elements/Base/BaseContent";
import CardSkeleton from "../../Builders/Parts/Skeletons/CardSkeleton";
import TableSkeleton from "../../Builders/Parts/Skeletons/TableSkeleton";
import IconListExample from "../../Builders/Parts/Examples/Lists/IconListExample";
import ImageListExample from "../../Builders/Parts/Examples/Lists/ImageListExample";
import ListExample from "../../Builders/Parts/Examples/Lists/ListExample";
import ListExample4 from "../../Builders/Parts/Examples/Lists/ListExample4";
import ListExample3 from "../../Builders/Parts/Examples/Lists/ListExample3";
import AvatarListExample from "../../Builders/Parts/Examples/Lists/AvatarListExample";

const salesData = [
  { label: "Jan", value: 2486 },
  { label: "Feb", value: 3199 },
  { label: "Mar", value: 3011 },
  { label: "Apr", value: 4111 },
  { label: "May", value: 3567 },
  { label: "Jun", value: 5367 },
];

const customersData = [
  { label: "John", value: 5 },
  { label: "Sarah", value: 7 },
  { label: "Tom", value: 4 },
  { label: "Mary", value: 9 },
  { label: "Bob", value: 2 },
  { label: "Lisa", value: 11 },
];

const wipComponents = [
  {
    component: Magazine,
    props: {
      showStudies: true,
    },
  },
  {
    component: Infographic,
    props: {
      salesTitle: "Sales",
      salesDescription:
        "Lorem ipsum dolorr sit amet, consectetur adipiscing elit. Sed euismod, est eget pellentesque pulvinar.",
      salesData: salesData,
      customersTitle: "Customers",
      customersDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, est eget pellentesque pulvinar.",
      customersData: customersData,
      mapTitle: "Location",
      mapDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, est eget pellentesque pulvinar.",
      ctaText: "Learn More",
      ctaHref: "https://www.example.com",
      progressTitle: "Progress",
      progressDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, est eget pellentesque pulvinar.",
      progressSubtitle1: "Goal 1",
      progressValue1: 60,
      progressSubtitle2: "Goal 2",
      progressValue2: 80,
      progressComplete: false,
      progressCompleteMessage: "Congratulations! You've reached your goals!",
    },
  },
  {
    component: Reviews,
  },
  {
    component: StoryTeller,
  },
  {
    component: CaseStudiesBasic,
  },
  {
    component: FeatureCTA,
    title: "FeatureCTA",
  },
  {
    component: Partners,
    title: "Partners",
  },
];

export default function WIPDemo() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div>
        <Loading loading={loading} message={"Tits?"} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "100vw", background: theme.palette.primary.main }}>
      <BaseContent
        maxWidth={1000}
        pt={2}
        pb={4}
        fd="column"
        justifyChildren="center"
        alignChildren="Center"
      >
        <div style={{ width: "100%", marginBottom: 48 }}>
          <BaseContent maxWidth={500} header="List 1" justifyChildren="center">
            <ListExample />
          </BaseContent>
        </div>
        <div style={{ width: "100%", marginBottom: 48 }}>
          <BaseContent maxWidth={500} header="List 3" justifyChildren="center">
            <ListExample3 />
          </BaseContent>
        </div>
        <div style={{ width: "100%", marginBottom: 48 }}>
          <BaseContent maxWidth={500} header="List 4" justifyChildren="center">
            <ListExample4 />
          </BaseContent>
        </div>
        <div style={{ width: "100%", marginBottom: 48 }}>
          <BaseContent
            maxWidth={500}
            header="Image List"
            justifyChildren="center"
          >
            <ImageListExample />
          </BaseContent>
        </div>
        <div style={{ width: "100%", marginBottom: 48 }}>
          <BaseContent
            maxWidth={500}
            header="Alternating Image List"
            justifyChildren="center"
          >
            <ImageListExample alternate />
          </BaseContent>
        </div>
        <div style={{ width: "100%", marginBottom: 48 }}>
          <BaseContent
            maxWidth={500}
            header="Avatar List"
            justifyChildren="center"
          >
            <AvatarListExample />
          </BaseContent>
        </div>
        <div style={{ width: "100%", marginBottom: 48 }}>
          <BaseContent
            maxWidth={500}
            header="Icon List"
            justifyChildren="center"
          >
            <IconListExample />
          </BaseContent>
        </div>

        <div style={{ width: "100%", marginBottom: 48 }}>
          <Typography variant="h3" align="center" style={{ marginBottom: 16 }}>
            Table Skeleton
          </Typography>
          <div style={{ width: "100%", marginBottom: 32 }}>
            <Divider />
          </div>
          <TableSkeleton />
        </div>
        <div style={{ width: "100%", marginBottom: 16 }}>
          <Divider />
        </div>

        <div style={{ width: "100%", marginBottom: 48 }}>
          <Typography variant="h3" align="center" style={{ marginBottom: 16 }}>
            Accordion Skeleton
          </Typography>
          <div style={{ width: "100%", marginBottom: 32 }}>
            <Divider />
          </div>
          <AccordionSkeleton />
        </div>
        <div style={{ width: "100%", marginBottom: 16 }}>
          <Divider />
        </div>
        <div
          style={{
            marginBottom: 48,
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" align="center" style={{ marginBottom: 16 }}>
            List Skeleton
          </Typography>
          <div style={{ width: "100%", marginBottom: 32 }}>
            <Divider />
          </div>
          <BaseContent maxWidth={400} pad={1}>
            <ListSkeleton />
          </BaseContent>
        </div>
        <div style={{ width: "100%", marginBottom: 16 }}>
          <Divider />
        </div>
        <div
          style={{
            width: "100%",
            marginBottom: 48,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" align="center" style={{ marginBottom: 16 }}>
            Card Skeleton
          </Typography>
          <div style={{ width: "100%", marginBottom: 32 }}>
            <Divider />
          </div>
          <CardSkeleton />
        </div>
      </BaseContent>
      <div style={{ paddingTop: 48, marginBottom: 48 }}>
        <FAQBuilder />
      </div>
      <div style={{ paddingTop: 48, marginBottom: 48 }}>
        <ListBuilder />
      </div>
      <div style={{ paddingTop: 48, marginBottom: 48 }}>
        <TableBuilder />
      </div>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          background: theme.palette.primary.main,
        }}
      >
        <svg
          xmlns="https://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
        >
          <path
            fill={theme.palette.primary.light}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          />
        </svg>
      </div>
      <LayeredGradientBackground>
        <TestForm />
      </LayeredGradientBackground>

      <Demo demoTitle="WIP Components" components={wipComponents} />
    </div>
  );
}
