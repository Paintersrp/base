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
import Container from "../../../Elements/Layout/Container/Container";
import Item from "../../../Elements/Layout/Item/Item";
import Icon from "../../../Elements/Icon/Icon";
import ProcessText from "./ProcessText";
import ProcessImage from "./ProcessImage";

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
      <ProcessImage imageItem={processImage} />
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
            <ProcessText textItem={item} index={index} />
          ))}
        </List>
      </Item>
    </Container>
  );
}

export default ServiceProcess;
