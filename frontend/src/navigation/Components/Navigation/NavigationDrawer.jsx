import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import handleLogout from "../../../lib/Auth/Logout";
import NavigationLinks from "./NavigationLinks";
import NavigationUser from "./NavigationUser";
import NavigationAuthed from "./NavigationAuthed";
import NavigationUnauthed from "./NavigationUnauthed";
import NavigationAdmin from "./NavigationAdmin";
import { Divider, List, ListItem, Typography } from "@material-ui/core";
import NavigationNoUser from "./NavigationNoUser";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 240,
  },
  divider: {
    background: theme.palette.primary.light,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 0),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

export default function NavigationDrawer({ links, toggleDrawer, appData }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <div className={classes.list}>
        <div className={classes.toolbar}>
          {auth.username && appData.users ? (
            <>
              <NavigationUser
                username={auth.username}
                toggleDrawer={toggleDrawer}
              />
            </>
          ) : (
            <NavigationNoUser appData={appData} />
          )}
        </div>
        <Divider className={classes.divider} />
        <NavigationLinks
          links={links}
          toggleDrawer={toggleDrawer}
          appData={appData}
        />
        {appData.users && (
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
        )}
      </div>
      <List
        style={{
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <ListItem>
          <Typography
            align="center"
            variant="caption"
            style={{ width: "100%" }}
          >
            © 2023 Edgelords
            <br />
            All rights reserved.
          </Typography>
        </ListItem>
      </List>
    </>
  );
}
