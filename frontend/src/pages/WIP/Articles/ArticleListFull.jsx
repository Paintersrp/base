import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Box,
  CardMedia,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    maxWidth: 800,
    padding: 5,
  },
  listItem: {
    marginBottom: 0,
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    transition: "0.1s",
    [`&:first-of-type`]: {
      borderTop: "1px solid black",
    },
    "&:hover": {
      borderBottom: `3px solid ${theme.palette.secondary.main}`,
    },
  },
  body: {
    color: theme.palette.text.dark,
  },
  author: {
    fontSize: "0.7rem",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontStyle: "italic",
    color: theme.palette.text.dark,
  },
  chip: {
    borderRadius: 14,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    marginRight: 5,
    marginTop: 5,
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  formControl: {
    marginTop: theme.spacing(1.5),
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formLabel: {
    fontWeight: "bold",
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.text.dark,
  },
  checkboxLabel: {
    color: theme.palette.text.dark,
    "& .MuiFormControlLabel-label": {
      fontWeight: 500,
      fontSize: "0.95rem",
      fontFamily: "Poppins",
      color: theme.palette.text.dark,
    },
  },
  searchField: {
    width: "100%",
  },
  searchIcon: {
    color: theme.palette.grey[500],
  },
  searchInput: {
    fontSize: "1rem",
  },
  searchLabel: {
    fontSize: "1rem",
  },
}));

const ArticleListFull = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/articles/")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (event) => {
    if (event.target.checked) {
      setSelectedFilters([...selectedFilters, event.target.value]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== event.target.value)
      );
    }
  };

  const filteredArticles = articles.filter((article) => {
    if (searchQuery) {
      if (
        !article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !article.author.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !article.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }
    }
    if (selectedFilters.length) {
      if (!article.tags.some((tag) => selectedFilters.includes(tag.name))) {
        return false;
      }
    }
    return true;
  });

  return (
    <Grid
      container
      spacing={0}
      justifyContent="center"
      style={{ maxWidth: 1000 }}
    >
      <Grid item xs={3} style={{ padding: 5 }}>
        <TextField
          margin="dense"
          variant="outlined"
          label="Search"
          value={searchQuery}
          onChange={handleSearch}
          className={classes.searchField}
          InputProps={{
            classes: {
              input: classes.searchInput,
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className={classes.searchIcon} />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            className: classes.searchLabel,
          }}
        />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.formLabel}>
            Filter by tags:
          </FormLabel>
          <FormGroup className={classes.formGroup}>
            {[
              ...new Set(
                articles.flatMap((article) =>
                  article.tags.map((tag) => tag.name)
                )
              ),
            ].map((tagName) => (
              <FormControlLabel
                key={tagName}
                control={<Checkbox value={tagName} onChange={handleFilter} />}
                label={tagName}
                labelPlacement="end"
                InputProps={{
                  classes: {
                    input: classes.checkboxLabel,
                  },
                }}
                InputLabelProps={{
                  className: classes.checkboxLabel,
                }}
                className={classes.checkboxLabel}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={9}>
        <List className={classes.root}>
          {filteredArticles.map((article) => (
            <div className={classes.listItem}>
              <Link to={`/articles/${article.id}`}>
                <Grid container flex spacing={0}>
                  <Grid item xs={2}>
                    <CardMedia
                      component="img"
                      alt="The house from the offer."
                      src={`${article.image}`}
                      style={{ height: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <ListItem key={article.id}>
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              variant="h3"
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "1.5rem",
                                color: "black",
                              }}
                            >
                              {article.title}
                            </Typography>
                          </>
                        }
                        secondary={
                          <>
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  article.content.substr(0, 200)
                                ),
                              }}
                              className={classes.body}
                              variant="body2"
                            />
                            <Box mt={2}>
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    paddingBottom: 5,
                                  }}
                                >
                                  {article.tags.map((tag) => (
                                    <Chip
                                      key={tag.name}
                                      label={tag.name}
                                      className={classes.chip}
                                    />
                                  ))}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    justifyContent: "end",
                                  }}
                                >
                                  <Typography className={classes.author}>
                                    By: {article.author}
                                  </Typography>
                                </div>
                              </div>
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                  </Grid>
                </Grid>
              </Link>
            </div>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ArticleListFull;
