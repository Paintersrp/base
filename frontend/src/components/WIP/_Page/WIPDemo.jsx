import Demo from "../../Elements/Demo/Demo";
import FeatureCTA from "../Features/FeatureCTA/FeatureCTA";
import Partners from "../Partners/Partners";
import { Button, Grid, Typography, useTheme } from "@material-ui/core";
import StoryTeller from "../StoryTeller/StoryTeller";
import CaseStudiesBasic from "../CaseStudies/CaseStudiesBasic";
import Reviews from "../Reviews/Reviews";
import Infographic from "../Infographic/Infographic";
import Item from "../../Elements/Layout/Item/Item";
import Container from "../../Elements/Layout/Container/Container";
import Text from "../../Elements/Layout/Text/Text";
import Magazine from "../Magazine/Magazine";
import AdminLogReport from "../../Admin/Reports/AdminLog/AdminLogReport";
import TestForm from "../TestForm";
import LayeredGradientBackground from "../../Elements/Layout/GradientContent";
import { useState } from "react";
import Loading from "../../Elements/Layout/Loading/Loading";
import BlogPosts from "../BlogPosts/BlogPosts";

const actions = [
  <Grid
    container
    flex
    spacing={0}
    justifyContent="space-between"
    alignItems="center"
  >
    <Typography variant="subtitle2">By: Admin</Typography>
    <Button key="2" size="small" variant="contained" color="primary">
      More
    </Button>
  </Grid>,
];

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

const blogPosts = [
  {
    id: 1,
    title: "My First Blog Post",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://source.unsplash.com/1400x904/?service",
    category: "food",
  },
  {
    id: 2,
    title: "My Second Blog Post",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    image: "https://source.unsplash.com/1400x903/?service",
    category: "technology",
  },
  {
    id: 3,
    title: "My First Blog Post",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://source.unsplash.com/1400x902/?service",
    category: "food",
  },
  {
    id: 4,
    title: "My Second Blog Post",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    image: "https://source.unsplash.com/1400x901/?service",
    category: "technology",
  },
];

const wipComponents = [
  {
    component: BlogPosts,
    props: {
      blogPosts: blogPosts,
    },
  },
  {
    component: AdminLogReport,
  },
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
      <LayeredGradientBackground>
        <TestForm />

        <Container spacing={2} style={{ padding: 4 }}>
          <Item xs={12} sm={12} md={12} lg={12} xl={12} justify="center">
            <Text type="h3">Custom Container/Item Responsive Test</Text>
          </Item>
          <Item
            xs={12}
            sm={12}
            md={8}
            lg={4}
            xl={6}
            justify="flex-end"
            style={{
              background: "lightgrey",
              border: "1px solid grey",
              marginBottom: 10,
            }}
          >
            Item 1
          </Item>
          <Item
            xs={12}
            sm={12}
            md={8}
            lg={4}
            xl={6}
            justify="flex-start"
            style={{
              background: "lightgrey",
              border: "1px solid grey",
              marginBottom: 10,
            }}
          >
            Item 2
          </Item>
          <Item
            xs={12}
            sm={12}
            md={8}
            lg={4}
            xl={4}
            justify="center"
            style={{
              background: "lightblue",
              border: "1px solid grey",
              marginBottom: 10,
            }}
          >
            Item 3
          </Item>
          <Item
            xs={12}
            sm={12}
            md={8}
            lg={4}
            xl={4}
            justify="center"
            style={{
              background: "lightblue",
              border: "1px solid grey",
              marginBottom: 10,
            }}
          >
            Item 4
          </Item>
          <Item
            xs={12}
            sm={12}
            md={8}
            lg={4}
            xl={4}
            justify="center"
            style={{
              background: "lightblue",
              border: "1px solid grey",
              marginBottom: 10,
            }}
          >
            Item 5
          </Item>
          <Container spacing={2} padding={"0px !important"}>
            <Item xs={12} sm={12} md={12} lg={12} xl={12} justify="center">
              <Text type="h3">Nested Test</Text>
            </Item>
            <Item
              xs={12}
              sm={12}
              md={3}
              justify="center"
              style={{
                background: "lightgreen",
                border: "1px solid grey",
                marginBottom: 10,
              }}
            >
              Item 6
            </Item>
            <Item
              xs={12}
              sm={12}
              md={3}
              justify="flex-end"
              style={{
                background: "lightgreen",
                border: "1px solid grey",
                marginBottom: 10,
              }}
            >
              Item 7
            </Item>
            <Item
              xs={12}
              sm={12}
              md={3}
              justify="flex-start"
              style={{
                background: "lightgreen",
                border: "1px solid grey",
                marginBottom: 10,
              }}
            >
              Item 8
            </Item>
            <Item
              xs={12}
              sm={12}
              md={3}
              justify="center"
              style={{
                background: "lightgreen",
                border: "1px solid grey",
                marginBottom: 10,
              }}
            >
              Item 9
            </Item>
          </Container>
        </Container>
      </LayeredGradientBackground>
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          background: theme.palette.primary.light,
        }}
      >
        <svg
          xmlns="https://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
        >
          <path
            fill={theme.palette.primary.main}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          />
        </svg>
      </div>

      <Demo demoTitle="WIP Components" components={wipComponents} />
    </div>
  );
}
