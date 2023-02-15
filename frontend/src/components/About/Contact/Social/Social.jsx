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
import { baseClasses } from "../../../../classes";

const useStyles = makeStyles((theme) => ({
  socialIcons: {
    color: theme.palette.text.light,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.action.hover,
    },
    // "&:hover": {
    //   transform: "scale(1.05)",
    //   color: "gold",
    // },
  },
  socialIcon: {
    color: theme.palette.text.light,
  },
  title: {
    paddingTop: 30,
  },
}));

export default function Social({ contactData, title }) {
  const classes = useStyles();
  const { fadeIn } = baseClasses();
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
        <div
          className={fadeIn}
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {title && (
            <div>
              <Typography variant="h4" className={classes.title}>
                Follow Us
              </Typography>
            </div>
          )}
          <div>
            <IconButton
              className={classes.socialIcons}
              aria-label="facebook"
              href={`https://www.facebook.com/${contacts.facebook}`}
            >
              <FacebookIcon fontSize="large" className={classes.socialIcon} />
            </IconButton>
            <IconButton
              className={classes.socialIcons}
              aria-label="twitter"
              href={`https://twitter.com/${contacts.facebook}`}
            >
              <TwitterIcon fontSize="large" className={classes.socialIcon} />
            </IconButton>
            <IconButton
              aria-label="instagram"
              className={classes.socialIcons}
              href={`https://www.instagram.com/${contacts.instagram}`}
            >
              <InstagramIcon fontSize="large" className={classes.socialIcon} />
            </IconButton>
            <IconButton
              className={classes.socialIcons}
              aria-label="linkedin"
              href={`https://www.linkedin.com/company/${contacts.linkedin}`}
            >
              <LinkedInIcon fontSize="large" className={classes.socialIcon} />
            </IconButton>
          </div>
        </div>
      ) : (
        <SocialEdit initialData={contacts} onUpdate={updateSocialData} />
      )}
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        {auth.is_superuser ? (
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
            color="white"
          />
        ) : null}
      </div>
    </>
  );
}
