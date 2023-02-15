import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, IconButton } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useSelector } from "react-redux";
import SocialEdit from "./SocialEdit";
import EditButton from "../../Elements/Buttons/EditButton";
import { baseClasses } from "../../../classes";

const useStyles = makeStyles((theme) => ({
  socialIcons: {
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.action.hover,
    },
  },
  socialIcon: {
    "&:hover": {
      color: theme.palette.primary.gold,
    },
  },
  title: {
    paddingTop: 30,
  },
}));

export default function Social({ contactData, title, color = "light" }) {
  const classes = useStyles();
  const theme = useTheme();
  const { fadeIn } = baseClasses();
  const auth = useSelector((state) => state.auth);
  const [contacts, setContacts] = useState(contactData);
  const [editing, setEditing] = useState(false);
  let finalColor;

  if (color === "light") {
    finalColor = theme.palette.text.light;
  } else if (color === "dark") {
    finalColor = theme.palette.primary.main;
  }

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
              style={{ color: finalColor }}
              aria-label="facebook"
              href={`https://www.facebook.com/${contacts.facebook}`}
            >
              <FacebookIcon fontSize="large" className={classes.socialIcon} />
            </IconButton>
            <IconButton
              style={{ color: finalColor }}
              className={classes.socialIcons}
              aria-label="twitter"
              href={`https://twitter.com/${contacts.facebook}`}
            >
              <TwitterIcon fontSize="large" className={classes.socialIcon} />
            </IconButton>
            <IconButton
              style={{ color: finalColor }}
              aria-label="instagram"
              className={classes.socialIcons}
              href={`https://www.instagram.com/${contacts.instagram}`}
            >
              <InstagramIcon fontSize="large" className={classes.socialIcon} />
            </IconButton>
            <IconButton
              style={{ color: finalColor }}
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
            color={color === "dark" ? "black" : "white"}
          />
        ) : null}
      </div>
    </>
  );
}
