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

const useStyles = makeStyles((theme) => ({
  list: {
    width: 240,
  },
  divider: {
    background: theme.palette.primary.light,
  },
}));

export default function NavigationDrawer({ links, toggleDrawer }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <div className={classes.list}>
        {auth.username ? (
          <>
            <NavigationUser
              username={auth.username}
              toggleDrawer={toggleDrawer}
            />
            <Divider className={classes.divider} />
          </>
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
