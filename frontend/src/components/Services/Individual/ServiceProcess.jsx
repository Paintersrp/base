import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Container from "../../Elements/Layout/Container/Container";
import Item from "../../Elements/Layout/Item/Item";
import Icon from "../../Elements/Icon/Icon";

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    borderRadius: "8px",
    paddingTop: "56.25%",
    height: "100%",
    maxHeight: 400,
  },
  processItem: {
    display: "flex",
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    textAlign: "start",
  },
  processIcon: {
    minWidth: 50,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0),
    fontSize: "1.5rem",
  },
  processIconSecondary: {
    minWidth: 50,
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0),
    fontSize: "1.5rem",
  },
  icon: {
    fontSize: "1.5rem",
  },
}));

function ServiceProcess({ processData, processImage }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container justify="flex-start" spacing={4} style={{ marginTop: 24 }}>
      <Item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        style={{
          minHeight: 375,
          paddingRight: isMediumScreen ? 0 : 24,
          alignItems: "center",
          display: "flex",
          order: isMediumScreen ? 2 : 1,
        }}
      >
        <CardMedia className={classes.image} image={processImage} />
      </Item>
      <Item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        style={{
          paddingLeft: isMediumScreen ? 8 : 24,
          display: "flex",
          flexDirection: "column",
          order: isMediumScreen ? 1 : 2,
        }}
      >
        <Typography variant="h5" color="primary">
          Our Process
        </Typography>
        <Typography variant="body2">
          We follow a proven process to ensure that our clients' websites meet
          their specific needs and reflect their brand. Our process includes the
          following steps:
        </Typography>
        <List>
          {processData.map((item, index) => (
            <ListItem className={classes.processItem}>
              <ListItemIcon
                className={
                  index % 2 === 0
                    ? classes.processIconSecondary
                    : classes.processIcon
                }
              >
                <Icon icon={item.icon} className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    align="left"
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2">{item.description}</Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Item>
    </Container>
  );
}

export default ServiceProcess;
