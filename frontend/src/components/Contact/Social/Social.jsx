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
  root: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
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
    fontWeight: 600,
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

  const socialPlatforms = [
    {
      name: "facebook",
      icon: <FacebookIcon fontSize="large" className={classes.socialIcon} />,
    },
    {
      name: "twitter",
      icon: <TwitterIcon fontSize="large" className={classes.socialIcon} />,
    },
    {
      name: "instagram",
      icon: <InstagramIcon fontSize="large" className={classes.socialIcon} />,
    },
    {
      name: "linkedin",
      icon: <LinkedInIcon fontSize="large" className={classes.socialIcon} />,
    },
  ];

  return (
    <>
      {!editing ? (
        <div
          className={`${fadeIn} ${classes.root}`}
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
            {socialPlatforms.map((platform) => {
              if (contacts[platform.name]) {
                return (
                  <IconButton
                    key={platform.name}
                    className={classes.socialIcons}
                    style={{ color: finalColor }}
                    aria-label={platform.name}
                    href={`https://www.${platform.name}.com/${
                      contacts[platform.name]
                    }`}
                  >
                    {platform.icon}
                  </IconButton>
                );
              } else {
                return null;
              }
            })}
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
