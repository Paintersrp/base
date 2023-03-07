import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid, TextField } from "@material-ui/core";
import StyledButton from "../../Elements/Buttons/StyledButton";
import BaseContent from "../../Elements/Base/BaseContent";
import Information from "../../Contact/Information/Information";
import Social from "../../Contact/Social/Social";

const useStyles = makeStyles((theme) => ({
  header: {
    color: theme.palette.text.dark,
    textAlign: "center",
    marginBottom: theme.spacing(1.5),
  },
}));

function ServiceContact({ data, formRef, contactData }) {
  const classes = useStyles();

  return (
    <form
      item
      xs={12}
      style={{ marginTop: 24, marginBottom: 24 }}
      id="apply-now-form"
      ref={formRef}
    >
      <BaseContent header="Contact Us" maxWidth={1000}>
        <Grid container spacing={3}>
          <Grid xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              align="center"
              variant="body1"
              gutterBottom
              style={{ maxWidth: 700, marginTop: 8 }}
            >
              Contact us today to learn more about our {data.service_title} and
              how it can help take your business to the next level. We look
              forward to hearing from you!
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField variant="outlined" label="Name" required fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Phone" required fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Message"
              required
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <StyledButton
              color="primary"
              size="small"
              type="submit"
              buttonText="Send"
            />
          </Grid>

          <Grid
            xs={12}
            style={{ display: "flex", justifyContent: "center", marginTop: 24 }}
          >
            <Typography
              align="center"
              variant="h3"
              gutterBottom
              style={{ maxWidth: 700 }}
            >
              Prefer to contact us via social media, email, or phone?
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {contactData && (
              <div style={{ maxWidth: 500 }}>
                <Information contactData={contactData} showTitle={false} />
                <div style={{ marginTop: 24 }}>
                  <Social
                    contactData={contactData}
                    showTitle={false}
                    color="dark"
                  />
                </div>
              </div>
            )}
          </div>
        </Grid>
      </BaseContent>
    </form>
  );
}

export default ServiceContact;
