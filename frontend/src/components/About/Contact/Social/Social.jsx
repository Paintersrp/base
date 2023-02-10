import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Button } from "@material-ui/core";
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
}));

export default function Social({ contactData, title }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(contactData);
  const [editing, setEditing] = useState(false);

  const updateSocialData = (updateSocialData) => {
    setData(updateSocialData);
    setEditing(false);
  };

  return (
    <>
      {!editing ? (
        <>
          {title && (
            <Typography
              variant="h5"
              style={{
                paddingTop: 40,
              }}
            >
              Follow Us
            </Typography>
          )}
          <IconButton
            aria-label="facebook"
            href={`https://www.facebook.com/${data.facebook}`}
          >
            <FacebookIcon fontSize="large" className={classes.socialIcons} />
          </IconButton>
          <IconButton
            aria-label="twitter"
            href={`https://twitter.com/${data.facebook}`}
          >
            <TwitterIcon fontSize="large" className={classes.socialIcons} />
          </IconButton>
          <IconButton
            aria-label="instagram"
            href={`https://www.instagram.com/${data.instagram}`}
          >
            <InstagramIcon fontSize="large" className={classes.socialIcons} />
          </IconButton>
          <IconButton
            aria-label="linkedin"
            className={classes.socialIcons}
            href={`https://www.linkedin.com/company/${data.linkedin}`}
          >
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </>
      ) : (
        <SocialEdit initialData={data} onUpdate={updateSocialData} />
      )}
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
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
