import React from "react";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BetterContact from "../../components/Features/Contact/BetterContact/BetterContact";
import TeamMembers from "../../components/Features/Team/TileCards/MemberTiles";
import CompanyInfo from "../../components/Features/Business/CompanyInfo/CompanyInfo";
import CareersOpportunities from "../../components/Features/CareerOpportunities/CareerOpportunities";
import FAQAccordion from "../../components/Features/Accordions/FAQ/FAQAccordion";
import BusinessInformation from "../../components/Features/Business/BusinessInformation/BusinessInformation";
import ContentLayout from "../../components/Layout/ContentLayout";
import TeamCard from "../../components/Features/Team/_SquareCards/SquareCards";
import TeamMembers2 from "../../components/Features/Team/MoreMembers";

const members = [
  {
    name: "Jane Smith",
    position: "Team Lead",
    bio: "Jane is a highly skilled team lead with over 10 years of experience in the industry.",
    image: "/images/members/member1.webp",
  },
  {
    name: "John Doe",
    position: "Developer",
    bio: "John is a talented developer with a passion for solving complex problems.",
    image: "/images/members/member3.webp",
  },
  {
    name: "Jenna Williams",
    position: "Designer",
    bio: "Jenna is a creative and experienced designer with a keen eye for detail.",
  },
];

function AboutPage() {
  return (
    <ContentLayout
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      <BusinessInformation />
      <TeamMembers2 />

      {/* <CareersOpportunities /> */}
      <BetterContact />
      <FAQAccordion />
    </ContentLayout>
  );
}

export default AboutPage;
