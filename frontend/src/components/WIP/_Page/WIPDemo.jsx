import Demo from "../../Elements/Demo/Demo";
import FeatureCTA from "../Features/FeatureCTA/FeatureCTA";
import Partners from "../Partners/Partners";
import { Collapse, Divider, Typography, useTheme } from "@material-ui/core";
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
import PollingListExample from "../../Builders/Parts/Examples/Lists/ListExample";
import TaskListExample from "../../Builders/Parts/Examples/Lists/TaskListExample";
import AvatarListExample from "../../Builders/Parts/Examples/Lists/AvatarListExample";
import TaskListBuilder from "../../Builders/Lists/TaskBuilder/TaskBuilder";
import DemoItem from "../../Elements/Demo/DemoItem";

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
      <div style={{ paddingTop: 0, marginBottom: 48 }}>
        <DemoItem item="avatar-list" />
      </div>
      <div style={{ paddingTop: 0, marginBottom: 48 }}>
        <TaskListBuilder />
      </div>
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
