import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Grid,
  ListItemIcon,
  CardActionArea,
  Badge,
  Tooltip,
} from "@material-ui/core";
import { FaCheck } from "react-icons/fa";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import { Link } from "react-router-dom";
import LinkSharpIcon from "@mui/icons-material/LinkSharp";
import PricingEdit from "../../../Landing/Pricing/PricingEdit";
import EditDeleteButtonMenu from "../../../Elements/Buttons/EditDeleteButtonMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(2),
    minHeight: 625,
    backgroundColor: theme.palette.background.light,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  content: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2),
    flex: 1,
  },
  list: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(0),
    "& .MuiListItemIcon-root": {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(0),
      marginLeft: theme.spacing(0),
      minWidth: 30,
    },
    "& .MuiListItem-root": {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(0),
    },
  },
  description: {
    paddingTop: theme.spacing(1),
  },
  price: {
    paddingTop: theme.spacing(1),
  },
  featureIcon: {
    color: theme.palette.primary.main,
  },
  recommendedBadge: {
    position: "absolute",
    top: "2.5%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "& .MuiBadge-badge": {
      fontSize: "0.9rem",
      padding: theme.spacing(1.5),
      fontWeight: 800,
      borderRadius: theme.spacing(1),
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
    marginTop: 4,
  },
}));

const SelectedService = ({
  service,
  active,
  recommendedId,
  newImage,
  editMode,
}) => {
  const classes = useStyles();
  const [hovered, setHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [serviceData, setServiceData] = useState(service);

  const updateData = (updateData) => {
    setServiceData(updateData);
    setEditing(false);
  };

  return (
    <Card
      className={`${classes.root} `}
      style={{
        minHeight: 400,
        width: active ? 325 : 325,
        opacity: active ? 1 : hovered ? 0.8 : 0.6,
        transition: "all 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Grid
        container
        flex
        style={{
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {recommendedId === service.id && (
          <Badge
            color="secondary"
            badgeContent="Recommended"
            className={classes.recommendedBadge}
          />
        )}

        <Grid xs={12} style={{ width: "100%" }}>
          {!editing ? (
            <>
              <div style={{ width: "100%" }}>
                <Grid xs={12}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={newImage ? newImage : serviceData.image}
                    title={serviceData.service_title}
                  />
                </Grid>
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography variant="h2">
                      {serviceData.service_title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.description}
                    >
                      Monthly Price: ${serviceData.price}
                    </Typography>
                  </CardContent>
                  <List dense className={classes.list}>
                    <ListItem style={{ paddingLeft: 0, marginLeft: 0 }}>
                      <ListItemText
                        secondary={`${serviceData.paragraph_one}`}
                      />
                    </ListItem>
                    <ListItem style={{ paddingLeft: 0, marginLeft: 0 }}>
                      <ListItemText primary="Features:" />
                    </ListItem>

                    {serviceData.features &&
                      serviceData.features.map((feature, index) => (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <FaCheck className={classes.featureIcon} />
                          </ListItemIcon>
                          <ListItemText secondary={feature.detail} />
                        </ListItem>
                      ))}
                  </List>
                </div>
              </div>
              <Tooltip
                title={`${serviceData.service_title} Page`}
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <Link
                  to={`/services/${serviceData.id}`}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <StyledButton
                    startIcon={<LinkSharpIcon />}
                    buttonText="Learn More"
                    noHover
                  />
                </Link>
              </Tooltip>
            </>
          ) : (
            <PricingEdit
              updatePlan={updateData}
              plan={serviceData}
              handleCancel={() => setEditing(!editing)}
              boxShadow={0}
              detailed
            />
          )}
          {!editing && editMode ? (
            <div>
              <EditDeleteButtonMenu
                editClick={() => setEditing(!editing)}
                hideDelete
                adminLink="titleblock"
                text="Title Block"
              />
            </div>
          ) : null}
        </Grid>
      </Grid>
    </Card>
  );
};

export default SelectedService;
