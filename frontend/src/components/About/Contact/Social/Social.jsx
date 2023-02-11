import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useSelector } from "react-redux";
import SocialEdit from "./SocialEdit";
import EditButton from "../../../Elements/Buttons/EditButton";

const useStyles = makeStyles((theme) => ({
  socialIcons: {
    color: theme.palette.primary.main,
    "&:hover": {
      transform: "scale(1.05)",
      color: theme.palette.secondary.main,
    },
  },
  title: {
    paddingTop: 30,
  },
}));

export default function Social({ contactData, title }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [contacts, setContacts] = useState(contactData);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setContacts(contactData);
  }, [contactData]);

  const updateSocialData = (updateSocialData) => {
    setContacts(updateSocialData);
    setEditing(false);
  };

  return (
    <>
      {!editing ? (
        <div style={{ justifyContent: "center", display: "flex" }}>
          {title && (
            <Typography variant="h5" className={classes.title}>
              Follow Us
            </Typography>
          )}
          <IconButton
            aria-label="facebook"
            href={`https://www.facebook.com/${contacts.facebook}`}
          >
            <FacebookIcon fontSize="large" className={classes.socialIcons} />
          </IconButton>
          <IconButton
            aria-label="twitter"
            href={`https://twitter.com/${contacts.facebook}`}
          >
            <TwitterIcon fontSize="large" className={classes.socialIcons} />
          </IconButton>
          <IconButton
            aria-label="instagram"
            href={`https://www.instagram.com/${contacts.instagram}`}
          >
            <InstagramIcon fontSize="large" className={classes.socialIcons} />
          </IconButton>
          <IconButton
            aria-label="linkedin"
            className={classes.socialIcons}
            href={`https://www.linkedin.com/company/${contacts.linkedin}`}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </div>
      ) : (
        <SocialEdit initialData={contacts} onUpdate={updateSocialData} />
      )}
      <div style={{ display: "flex" }}>
        {auth.is_superuser ? (
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
          />
        ) : null}
      </div>
    </>
  );
}
