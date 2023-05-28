import React, { useEffect, useState } from "react";
import DeblurIcon from "@mui/icons-material/Deblur";

import Drawer from "../Prebuilt/Drawer/Drawer";
import Loading from "../../Elements/Layout/Loading/Loading";
import Navbar from "../Prebuilt/Navbar/Navbar";
import Page from "../Base/Containers/Page/Page";
import Tracker from "./Tracker";
import MenuButton from "../Prebuilt/Buttons/MenuButton/MenuButton";
import Flexer from "../../Elements/Layout/Container/Flexer";
import Tooltip from "../Base/Tooltip/Tooltip";
import Footer from "../Prebuilt/Footer/WWWWFooter";

const TrackerPage = ({}) => {
  const [ready, setReady] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    console.log("replace_me");
    setReady(true);
  }, []);

  if (!ready) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  const linksArray = [
    { to: "#", text: "Home" },
    { to: "#", text: "About" },
    { to: "#", text: "Contact" },
  ];

  return (
    <React.Fragment>
      <Navbar
        menuButton
        menuOpen={isDrawerOpen}
        menuOnClick={() => setIsDrawerOpen(true)}
        links={linksArray}
      />
      <Drawer
        open={isDrawerOpen}
        handleClose={handleDrawerClose}
        companyIcon={<DeblurIcon fontSize="large" />}
        companyTitle="EDGELORDS"
      />
      <Page>
        <Tracker />
        <Flexer j="c">
          <Tooltip text="View Home Page" position="bottom">
            <MenuButton />
          </Tooltip>
        </Flexer>
      </Page>
      <Footer />
    </React.Fragment>
  );
};

export default TrackerPage;
