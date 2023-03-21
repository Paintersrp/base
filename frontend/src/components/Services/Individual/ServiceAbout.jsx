import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { CardMedia, useMediaQuery, useTheme } from "@material-ui/core";
import Container from "../../Elements/Layout/Container/Container";
import Item from "../../Elements/Layout/Item/Item";
import ServiceAboutEdit from "./ServiceAboutEdit";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";

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

function ServiceAbout({ data, editMode }) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [featureData, setFeatureData] = useState(data);
  const [editing, setEditing] = useState(false);

  const updateService = (updateService) => {
    setFeatureData(updateService);
    setEditing(false);
  };

  return (
    <Container spacing={4}>
      {!editing ? (
        <>
          <Item xs={12} sm={12} md={12} lg={6}>
            <Container direction="column" justify="flex-start" align="left">
              <Item xs={6}>
                <div className={classes.additionalInfo}>
                  <Typography variant="h5" className={classes.subtitle}>
                    About Our {featureData.service_title}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: 8 }}>
                    {featureData.paragraph_one}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: 8 }}>
                    {featureData.paragraph_two}
                  </Typography>
                  <Typography variant="body1" style={{ marginBottom: 16 }}>
                    {featureData.paragraph_three}
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
            <CardMedia className={classes.image} image={featureData.image} />
          </Item>
        </>
      ) : (
        <ServiceAboutEdit
          service={featureData}
          updateService={updateService}
          handleCancel={() => setEditing(!editing)}
        />
      )}
      {!editing && editMode ? (
        <div style={{ width: "100%", marginTop: 8 }}>
          <EditDeleteButtonMenu
            editClick={() => setEditing(!editing)}
            hideDelete
            position="end"
            adminLink="servicetier"
            text="Service"
            obj={featureData.id}
          />
        </div>
      ) : null}
    </Container>
  );
}

export default ServiceAbout;
