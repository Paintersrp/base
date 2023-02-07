import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "auto",
    padding: theme.spacing(2),
    backgroundColor: "#1c1c1c",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
}));

function ProfileForm() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setIsLoading(true);
    try {
      await axios.put("/api/profile", { name, email, bio });
      setIsSuccess(true);
    } catch (err) {
      setErrors(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Bio"
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
        error={!!errors.bio}
        helperText={errors.bio}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Save"}
      </Button>
      {isSuccess && (
        <Typography className={classes.success}>
          Profile Updated Successfully
        </Typography>
      )}
    </form>
  );
}

export default ProfileForm;
