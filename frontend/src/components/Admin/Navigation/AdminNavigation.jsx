import React, { useEffect, useState } from "react";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import AdminToolbar from "./AdminToolbar";
import AdminDrawerContent from "./AdminDrawerContent";
import NavigationBase from "../../../navigation/Components/NavigationBase";

const AdminNavigation = ({ setCount, count }) => {
  const [models, setModels] = useState({});
  const [open, setOpen] = useState(false);
  const [openLinks, setOpenLinks] = useState({});

  const handleClick = (appName) => {
    setOpenLinks((prevState) => ({
      ...prevState,
      [appName]: !prevState[appName],
    }));
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
    setTimeout(() => {
      setOpenLinks({});
    }, 300);
  };

  useEffect(() => {
    axiosInstance
      .get("/get_models/")
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <NavigationBase
      open={open}
      toggleDrawer={toggleDrawer}
      toolBarContent={
        <AdminToolbar
          open={open}
          toggleDrawer={toggleDrawer}
          setCount={setCount}
          count={count}
        />
      }
      drawerContent={
        <AdminDrawerContent
          models={models}
          toggleDrawer={toggleDrawer}
          openLinks={openLinks}
          handleClick={handleClick}
          count={count}
        />
      }
    />
  );
};

export default AdminNavigation;
