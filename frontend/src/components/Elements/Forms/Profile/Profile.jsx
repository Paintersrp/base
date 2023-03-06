import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PageContainer from "../../Layout/PageContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    width: "100vw",
  },
  form: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  field: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& .MuiFormLabel-root": {
      color: "black",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
  label: {
    color: "black",
  },
}));

const Profile = () => {
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
    console.log("Settings:", settings);
    console.log("Profile:", profile);
  };

  return (
    <PageContainer
      title="Landing Page"
      description="Where the land be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      <div
        style={{
          minHeight: 700,
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 500 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            style={{ padding: 0 }}
          >
            <Tab label="Profile" />
            <Tab label="Settings" />
            <Tab label="Security" />
          </Tabs>
          <Box>
            <Typography component="div" style={{ color: "black" }}>
              {value === 0 && (
                <div className={classes.form}>
                  <h2>Profile</h2>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value={profile.firstName}
                        className={classes.field}
                        onChange={handleProfileChange}
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        value={profile.lastName}
                        className={classes.field}
                        onChange={handleProfileChange}
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="username"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={profile.email}
                        className={classes.field}
                        onChange={handleProfileChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="bio"
                        label="Biography"
                        name="bio"
                        autoComplete="bio"
                        value={profile.bio}
                        className={classes.field}
                        multiline
                        minRows={5}
                        onChange={handleProfileChange}
                      />
                    </Grid>
                  </Grid>
                </div>
              )}
              {value === 1 && (
                <div className={classes.form}>
                  <h2>Settings</h2>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox color="primary" name="notifications" />
                      }
                      label="Notifications"
                    />
                  </Grid>
                </div>
              )}
              {value === 2 && (
                <div className={classes.form}>
                  <h2>Security</h2>
                </div>
              )}
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
