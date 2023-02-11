import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import handleLogout from "../../../lib/Auth/Logout";
import NavigationLinks from "./NavigationLinks";
import NavigationUser from "./NavigationUser";
import NavigationAuthed from "./NavigationAuthed";
import NavigationUnauthed from "./NavigationUnauthed";
import NavigationAdmin from "./NavigationAdmin";

const useStyles = makeStyles(() => ({
  list: {
    width: 250,
  },
}));

export default function NavigationDrawer({ links, toggleDrawer }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <div className={classes.list}>
      {auth.username ? (
        <NavigationUser username={auth.username} toggleDrawer={toggleDrawer} />
      ) : null}
      <NavigationLinks links={links} toggleDrawer={toggleDrawer} />

      <>
        {auth.is_authenticated ? (
          <NavigationAuthed
            toggleDrawer={toggleDrawer}
            handleLogout={handleLogout}
          />
        ) : (
          <NavigationUnauthed toggleDrawer={toggleDrawer} />
        )}
        {auth.is_superuser ? (
          <NavigationAdmin toggleDrawer={toggleDrawer} />
        ) : null}
      </>
    </div>
  );
}
