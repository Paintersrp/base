import React, { useState } from "react";
import {
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Text from "../../../../Elements/Layout/Text/Text";
import FormField from "../../../../Elements/Fields/FormField";
import BaseSection from "../../../../Elements/Base/BaseSection";
import { skeletonMap } from "../../utils/skeletonMap";

const useStyles = makeStyles((theme) => ({
  list: {
    overflow: "auto",
    height: 500,
    padding: 0,
  },
}));

function ContentList({ elementData, handleElement, elementObject }) {
  const classes = useStyles();
  const contentTypeOptions = ["List", "Card", "Text", "Image", "FAQ"];
  const [selectedContentType, setSelectedContentType] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleContentTypeClick = (contentType) => {
    setSelectedContentType(contentType);
    setSelectedSubType("");
  };

  const handleSubTypeClick = (subType) => {
    setSelectedSubType(subType);
  };

  const filteredElementObjects = elementData.filter(
    (elementObject) =>
      elementObject.type === selectedContentType &&
      (!selectedSubType || elementObject.subtype === selectedSubType) &&
      elementObject.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const availableSubTypes = [
    ...new Set(
      elementData
        .filter((elementObject) => elementObject.type === selectedContentType)
        .map((elementObject) => elementObject.subtype)
    ),
  ];

  return (
    <Grid container spacing={0}>
      {/* <Grid container spacing={0} justifyContent="flex-end">
        <Grid item xs={6}>
          <FormField
            label="Search"
            variant="standard"
            margin="dense"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ margin: "8px 0px" }}
          />
        </Grid>
      </Grid> */}
      <Grid item xs={12} sm={6} style={{ padding: 12 }}>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Paper style={{ borderRadius: 0, marginRight: 0 }}>
              <Text t="subtitle1" a="c" pt={8}>
                Content Type
              </Text>
              <Divider variant="fullWidth" style={{ marginTop: 8 }} />
              <List component="nav" className={classes.list}>
                {contentTypeOptions.map((type) => (
                  <ListItem
                    button
                    selected={selectedContentType === type}
                    onClick={() => handleContentTypeClick(type)}
                  >
                    <ListItemText primary={type} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper style={{ borderRadius: 0 }}>
              <Text t="subtitle1" a="c" pt={8}>
                Subtype
              </Text>
              <Divider variant="fullWidth" style={{ marginTop: 8 }} />
              <List component="nav" className={classes.list}>
                {availableSubTypes.map((subType) => (
                  <ListItem
                    button
                    selected={selectedSubType === subType}
                    onClick={() => handleSubTypeClick(subType)}
                  >
                    <ListItemText primary={subType} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={{ borderRadius: 0 }}>
              <Text t="subtitle1" a="c" pt={8}>
                Content Object
              </Text>
              <Divider variant="fullWidth" style={{ marginTop: 8 }} />
              <List component="nav" className={classes.list}>
                {filteredElementObjects.map((contentObject) => (
                  <ListItem
                    button
                    key={contentObject.object_id}
                    onClick={() => handleElement(contentObject)}
                  >
                    <ListItemText primary={contentObject.name} />
                  </ListItem>
                ))}
                {filteredElementObjects.length === 0 && (
                  <ListItem>
                    <Typography variant="subtitle1">
                      No content objects found for selected content type
                    </Typography>
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <BaseSection
          header={"Element Set Preview"}
          justifyChildren="center"
          pad={0}
          boxShadow={0}
          pb={2}
          mt={2.5}
          headerAlign="center"
        >
          {selectedContentType && (
            <React.Fragment>
              {skeletonMap(selectedContentType, selectedSubType, elementObject)}
            </React.Fragment>
          )}
        </BaseSection>
      </Grid>
    </Grid>
  );
}

export default ContentList;
