import Demo from "../../Elements/Demo/Demo";
import EventSchedule from "../EventSchedule/EventSchedule";
import MinimalTestimonials from "../Testimonials/MinimalTestimonials/MinimalTestimonials";
import PricingTier from "../Pricing/_MinimalPricing/MinimalPricing";
import FeatureCTA from "../Features/FeatureCTA/FeatureCTA";
import Partners from "../Partners/Partners";
import BaseCard from "../../Elements/Base/BaseCard";
import { Button, Grid, Typography } from "@material-ui/core";
import StoryTeller from "../StoryTeller/StoryTeller";
import Magazine from "../Magazine/Magazine";
import CaseStudiesBasic from "../CaseStudies/CaseStudiesBasic";
import Reviews from "../../Services/Reviews/Reviews";
import Infographic from "../Infographic/Infographic";
import HeroCountdown from "../CountDown/CountdownBlock";
import ServicesResult from "../../Services/Quiz/ServicesResult";

const testimonials = [
  {
    name: "John Doe",
    company: "Acme Inc.",
    review:
      "I have been extremely satisfied with the services provided by this company. They exceeded my expectations.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Jane Smith",
    company: "XYZ Corp.",
    review:
      "The team at this company was professional and efficient. I would recommend them to anyone.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Bob Johnson",
    company: "ABC LLC.",
    review:
      "I was impressed with the level of expertise and attention to detail demonstrated by the team.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const eventSets = {
  Monday: [
    {
      date: "January 1, 2022",
      time: "9:00 AM",
      description:
        "I have been extremely satisfied with the services provided by this company. They exceeded my expectations.",
      presenter: "John Doe",
      company: "Acme Inc.",
      location: "Conference Room A",
      link: "https://www.example.com/event1",
    },
    {
      date: "January 1, 2022",
      time: "10:00 AM",
      description: "Event 2",
      presenter: "Jane Smith",
      company: "ABC Corp.",
      location: "Conference Room B",
      link: "https://www.example.com/event2",
    },
    {
      date: "January 1, 2022",
      time: "9:00 AM",
      description: "Event 3",
      presenter: "John Doe",
      company: "Acme Inc.",
      location: "Conference Room A",
      link: "https://www.example.com/event1",
    },
    {
      date: "January 1, 2022",
      time: "10:00 AM",
      description: "Event 4",
      presenter: "Jane Smith",
      company: "ABC Corp.",
      location: "Conference Room B",
      link: "https://www.example.com/event2",
    },
    {
      date: "January 1, 2022",
      time: "9:00 AM",
      description: "Event 5",
      presenter: "John Doe",
      company: "Acme Inc.",
      location: "Conference Room A",
      link: "https://www.example.com/event1",
    },
    {
      date: "January 1, 2022",
      time: "10:00 AM",
      description: "Event 6",
      presenter: "Jane Smith",
      company: "ABC Corp.",
      location: "Conference Room B",
      link: "https://www.example.com/event2",
    },
  ],
  Tuesday: [
    {
      date: "January 2, 2022",
      time: "9:00 AM",
      description: "Event 3",
      presenter: "Bob Johnson",
      company: "XYZ Inc.",
      location: "Conference Room C",
      link: "https://www.example.com/event3",
    },
    {
      date: "January 2, 2022",
      time: "10:00 AM",
      description: "Event 4",
      presenter: "Mary Brown",
      company: "MyCompany LLC.",
      location: "Conference Room D",
      link: "https://www.example.com/event4",
    },
  ],
  Wednesday: [
    {
      date: "January 2, 2022",
      time: "9:00 AM",
      description: "Event 3",
      presenter: "Bob Johnson",
      company: "XYZ Inc.",
      location: "Conference Room C",
      link: "https://www.example.com/event3",
    },
    {
      date: "January 2, 2022",
      time: "10:00 AM",
      description: "Event 4",
      presenter: "Mary Brown",
      company: "MyCompany LLC.",
      location: "Conference Room D",
      link: "https://www.example.com/event4",
    },
  ],
  Thursday: [
    {
      date: "January 2, 2022",
      time: "9:00 AM",
      description: "Event 3",
      presenter: "Bob Johnson",
      company: "XYZ Inc.",
      location: "Conference Room C",
      link: "https://www.example.com/event3",
    },
    {
      date: "January 2, 2022",
      time: "10:00 AM",
      description: "Event 4",
      presenter: "Mary Brown",
      company: "MyCompany LLC.",
      location: "Conference Room D",
      link: "https://www.example.com/event4",
    },
  ],
};
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

const wipComponents = [
  {
    component: ServicesResult,
  },
  {
    component: Infographic,
    props: {
      salesTitle: "Sales",
      salesDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, est eget pellentesque pulvinar.",
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
    component: Magazine,
  },
  {
    component: Magazine,
    title: "Magazine with Case Studies",
    props: {
      showStudies: true,
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
    component: EventSchedule,
    title: "EventSchedule",
    props: {
      eventSets,
    },
  },
  {
    component: PricingTier,
    title: "PricingTier",
  },
  {
    component: MinimalTestimonials,
    title: "MinimalTestimonials",
    props: {
      testimonials,
    },
  },
  {
    component: FeatureCTA,
    title: "FeatureCTA",
  },
  {
    component: Partners,
    title: "Partners",
  },
  {
    component: HeroCountdown,
  },
  {
    component: BaseCard,
    title: "BaseCard - Top Media",
    props: {
      title: "How I Became Danny Devito",
      subtitle: "I Paid the Troll Toll",
      children: (
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi varius
          nibh sit amet nunc auctor, quis ultricies lectus pretium. Aenean
          vehicula dui accumsan, bibendum nisi vitae, mollis mi. Fusce id
          accumsan arcu. Nam imperdiet sapien non tempor nam...
        </Typography>
      ),
      actions: actions,
      elevation: 4,
      headerTitleProps: { variant: "h5" },
      headerSubheaderProps: { variant: "body2" },
      media: "images/products/danny-devito.jpg",
      mediaPosition: "top",
    },
  },

  {
    component: BaseCard,
    title: "BaseCard - Left Media",
    props: {
      title: "How I Became Danny Devito",
      subtitle: "I Paid the Troll Toll",
      children: (
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi varius
          nibh sit amet nunc auctor, quis ultricies lectus pretium. Aenean
          vehicula dui accumsan, bibendum nisi vitae, mollis mi. Fusce id
          accumsan arcu. Nam imperdiet sapien non tempor nam...
        </Typography>
      ),
      actions: actions,
      elevation: 4,
      headerTitleProps: { variant: "h5" },
      headerSubheaderProps: { variant: "body2" },
      media: "images/products/danny-devito.jpg",
      mediaPosition: "left",
    },
  },
];

export default function WIPDemo() {
  return (
    <div style={{ maxWidth: "100vw" }}>
      <Demo demoTitle="WIP Components" components={wipComponents} />
    </div>
  );
}
