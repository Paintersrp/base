import React, { useState } from "react";
import { Tabs, Tab, Typography, Box, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const ProfileEditor = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [settings, setSettings] = useState({
    email: "",
    password: "",
    notifications: false,
  });
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    avatar: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSettingsChange = (event) => {
    setSettings({
      ...settings,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfileChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdate = () => {
    // send api call to update account settings and profile information
    console.log("Updating account settings and profile information...");
    console.log("Settings:", settings);
    console.log("Profile:", profile);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Settings" />
        <Tab label="Profile" />
        <Tab label="Security" />
      </Tabs>
      <Box p={3}>
        <Typography component="div">
          {value === 0 && (
            <div className={classes.form}>
              <h3>Settings Tab</h3>
              <TextField
                label="Email"
                name="email"
                value={settings.email}
                onChange={handleSettingsChange}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={settings.password}
                onChange={handleSettingsChange}
              />
              <TextField
                label="Notifications"
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleSettingsChange}
              />
            </div>
          )}
          {value === 1 && (
            <div className={classes.form}>
              <h3>Profile Tab</h3>
              <TextField
                label="First Name"
                name="firstName"
                value={profile.firstName}
onChange={handleProfileChange}
/>
<TextField
             label="Last Name"
             name="lastName"
             value={profile.lastName}
             onChange={handleProfileChange}
           />
<TextField
             label="Bio"
             name="bio"
             value={profile.bio}
             onChange={handleProfileChange}
           />
<TextField
             label="Avatar URL"
             name="avatar"
             value={profile.avatar}
             onChange={handleProfileChange}
           />
</div>
)}
{value === 2 && (
<div className={classes.form}>
<h3>Security Tab</h3>
<p>Add security related fields and functionality here...</p>
</div>
)}
</Typography>
<Button variant="contained" color="primary" onClick={handleUpdate}>
Update
</Button>
</Box>
</div>
);
};

export default ProfileEditor;
