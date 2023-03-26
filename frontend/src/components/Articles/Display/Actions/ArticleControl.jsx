import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1.5),
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  formLabel: {
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

const ArticleControl = ({ articles, onUpdate }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

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

  const handleClick = (e) => {
    onUpdate(filteredArticles);
  };

  useEffect(() => {
    onUpdate(filteredArticles);
  }, [searchQuery, selectedFilters]);

  return (
    <>
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
              articles.flatMap((article) => article.tags.map((tag) => tag.name))
            ),
          ].map((tagName) => (
            <FormControlLabel
              key={tagName}
              control={
                <Checkbox
                  value={tagName}
                  onChange={handleFilter}
                  onClick={handleClick}
                />
              }
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
    </>
  );
};

export default ArticleControl;
