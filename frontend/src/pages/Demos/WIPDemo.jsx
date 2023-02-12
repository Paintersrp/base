import { FaCode, FaPencilRuler, FaServer } from "react-icons/fa";
import Demo from "./Demo";
import EventSchedule from "../../components/WIP/EventSchedule-WIP/EventSchedule";
import MinimalTestimonials from "../../components/WIP/Testimonials/_MinimalTestimonials/MinimalTestimonials";
import PricingTier from "../../components/WIP/Pricing/_MinimalPricing/MinimalPricing";
import CategoryTiles from "../../components/WIP/Categories/Categories";
import FeatureCTA from "../../components/WIP/Features/FeatureCTA/FeatureCTA";
import FeatureTiles from "../../components/WIP/Features/FeatureTiles/FeatureTiles";
import Partners from "../../components/WIP/Partners/Partners";
import Reviews from "../../components/WIP/Reviews/Reviews";
import FeaturedProducts from "../../components/WIP/FeaturedProducts/FeaturedProduct";
import BaseCard from "../../components/Elements/Base/BaseCard";
import { Button, Grid, Typography } from "@material-ui/core";

const products = [
  {
    id: 1,
    name: "Camera",
    image: "images/products/product1.webp",
    rating: 4,
    price: "10.99",
    description: "Takes Pictures",
  },
  {
    id: 2,
    name: "Titty Camera",
    image: "images/products/product2.jpeg",
    rating: 3,
    price: "20.99",
    description: "It's a fucking camera",
  },
  {
    id: 3,
    name: "Drugs",
    image: "images/products/product3.jpeg",
    rating: 5,
    price: "30.99",
    description: "Take em",
  },
];

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

const wipComponents = [
  {
    component: BaseCard,
    title: "BaseCard - Top Media",
    props: {
      title: "How I Became Danny Devito",
      subtitle: "I Paid the Troll Toll",
      // headerAction: (
      //   <Button variant="contained" color="primary" style={{ marginRight: 7 }}>
      //     Test 1
      //   </Button>
      // ),
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
      // headerAction: [],
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
    component: CategoryTiles,
    title: "CategoryTiles",
  },
  {
    component: FeatureCTA,
    title: "FeatureCTA",
  },
  {
    component: FeaturedProducts,
    title: "FeaturedProducts",
    props: { products },
  },
  {
    component: FeatureTiles,
    title: "FeatureTiles",
  },
  {
    component: Partners,
    title: "Partners",
  },
  {
    component: Reviews,
    title: "Reviews",
  },
];

export default function FeatureDemo() {
  return (
    <div style={{ maxWidth: "100vw" }}>
      <Demo demoTitle="WIP Components" components={wipComponents} />
    </div>
  );
}
