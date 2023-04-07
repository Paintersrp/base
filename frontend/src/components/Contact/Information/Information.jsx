import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import InformationEdit from "./InformationEdit";
import { baseClasses } from "../../../classes";
import ContactButtons from "../Contact/ContactButtons";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  container: {
    // border: `1px solid ${theme.palette.divider}`,
    width: "100%",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function Information({
  contactData,
  editMode,
  showTitle = true,
}) {
  console.log(contactData);
  const classes = useStyles();
  const { fadeIn } = baseClasses();
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState(contactData);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setData(contactData);
  }, [contactData]);

  const updateContactData = (updateContactData) => {
    setData(updateContactData);
    setEditing(false);
  };

  return (
    <div className={`{${classes.container}`}>
      {!editing ? (
        <div className={fadeIn}>
          {showTitle && (
            <Typography variant="h3" className={`${classes.title}`}>
              Contact Information
            </Typography>
          )}
          <List>
            <ListItem>
              <ListItemIcon style={{ justifyContent: "center" }}>
                <EmailIcon color="primary" style={{ fontSize: "1.75rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    align="center"
                    color="primary"
                    variant="subtitle1"
                  >
                    {data.email}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                  >
                    Email
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ justifyContent: "center" }}>
                <PhoneIcon color="secondary" style={{ fontSize: "1.75rem" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    align="center"
                    color="primary"
                    variant="subtitle1"
                  >
                    {data.phone}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                  >
                    Phone
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ justifyContent: "center" }}>
                <LocationOnIcon
                  color="primary"
                  style={{ fontSize: "1.75rem" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    align="center"
                    color="primary"
                  >
                    {data.address}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    align="center"
                  >
                    Address
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ContactButtons contactData={data} />
            </ListItem>
          </List>
          {!editing && editMode ? (
            <div style={{ marginTop: 16 }}>
              <EditDeleteButtonMenu
                hideDelete
                position="center"
                placement="bottom"
                editClick={() => setEditing(!editing)}
                text={"Contact Information"}
                adminLink="contactinformation"
              />
            </div>
          ) : null}
        </div>
      ) : (
        <InformationEdit
          initialData={data}
          onUpdate={updateContactData}
          handleCancel={() => setEditing(!editing)}
        />
      )}
    </div>
  );
}
