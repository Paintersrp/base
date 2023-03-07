import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { FiberManualRecord } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  tile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    height: "100%",
  },
  tierBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  priceBox: {
    marginTop: 24,
    marginBottom: 8,
    textAlign: "center",
  },
  featureItem: {
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  featureIcon: {
    color: theme.palette.primary.main,
    minWidth: 40,
    marginBottom: theme.spacing(0),
  },
  iconPrimary: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0),
  },
  iconSecondary: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0),
  },
  tileBar: {
    background: theme.palette.primary.main,
  },
  fadeIn: {
    backgroundColor: theme.palette.background.light,
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const ServiceComparison = ({ tiers, currentId }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={`{${classes.root} ${classes.fadeIn}`}>
      <Paper style={{ background: "#F5F5F5" }} elevation={0}>
        <CardContent>
          <Typography variant="h3" align="center">
            Service Tiers
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            style={{ marginBottom: 8 }}
          >
            Compare our different service tiers
          </Typography>
          <Box mt={2}>
            <ImageList
              rowHeight="420"
              cols={isSmallScreen ? 1 : isLargeScreen ? 2 : 3}
              gap={isSmallScreen ? 0 : 20}
            >
              {tiers.map((tier) => (
                <ImageListItem key={tier.service_title}>
                  <Box className={classes.tile}>
                    <Typography variant="h5" color="primary">
                      {tier.service_title}
                    </Typography>
                    <Box className={classes.tierBox}>
                      <Box className={classes.priceBox}>
                        <Typography
                          variant="h5"
                          color="primary"
                        >{`$${tier.price}/mo`}</Typography>
                      </Box>
                      <Box>
                        {tier.features.map((feature, index) => (
                          <ListItem
                            className={classes.featureItem}
                            classes={{ root: classes.featureItem }}
                          >
                            <ListItemIcon
                              className={
                                index % 2 === 0
                                  ? classes.iconSecondary
                                  : classes.iconPrimary
                              }
                            >
                              <FiberManualRecord style={{ fontSize: "1rem" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2">
                                  {feature.detail}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                      </Box>
                    </Box>
                    <ImageListItemBar
                      title={
                        <Typography
                          variant="h5"
                          style={{ fontWeight: 600 }}
                          align="center"
                        >
                          {tier.service_title}
                        </Typography>
                      }
                      position="top"
                      className={classes.tileBar}
                    />
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {tier.id === currentId ? (
                        <StyledButton
                          size="small"
                          buttonText="Current"
                          disabled
                        />
                      ) : (
                        <Link to={`/services/${tier.id}`}>
                          <StyledButton
                            size="small"
                            buttonText="Learn More"
                            disabled={false}
                          />
                        </Link>
                      )}
                    </div>
                  </Box>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </CardContent>
      </Paper>
    </div>
  );
};

export default ServiceComparison;
