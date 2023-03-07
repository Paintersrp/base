import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CardMedia, useMediaQuery, useTheme } from "@material-ui/core";
import Container from "../../Elements/Layout/Container/Container";
import Item from "../../Elements/Layout/Item/Item";

const useStyles = makeStyles((theme) => ({
  additionalInfo: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1),
    },
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    paddingTop: "56.25%",
    height: "100%",
  },
  subtitle: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

function ServiceAbout({ data }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container spacing={4}>
      <Item xs={12} sm={12} md={12} lg={6}>
        <Container direction="column" justify="flex-start" align="left">
          <Item xs={6}>
            <div className={classes.additionalInfo}>
              <Typography variant="h5" className={classes.subtitle}>
                About Our {data.service_title}
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 8 }}>
                Our {data.service_title} provides a comprehensive solution for
                businesses looking to establish their online presence. With our
                tier, we offer custom website design, mobile-responsive design,
                SEO optimization, website maintenance and updates, as well as
                other features such as hosting, security, and performance
                monitoring.
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 8 }}>
                Our team of expert designers and developers work closely with
                our clients to ensure that their website reflects their brand
                and meets their specific needs. We provide ongoing support and
                maintenance to ensure that our clients' websites are always
                up-to-date and functioning at their best.
              </Typography>
              <Typography variant="body1" style={{ marginBottom: 16 }}>
                Our {data.service_title} is perfect for businesses that want to
                establish a strong online presence and attract more customers.
                Whether you're just starting out or looking to upgrade your
                existing website, our service tier can help take your business
                to the next level.
              </Typography>
            </div>
          </Item>
        </Container>
      </Item>
      <Item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        style={{ minHeight: 375, paddingLeft: isSmallScreen ? 0 : 24 }}
      >
        <CardMedia className={classes.image} image={data.image} />
      </Item>
    </Container>
  );
}

export default ServiceAbout;
