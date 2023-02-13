import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Button, Grid } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ArticleControl from "./ArticleControl";
import ArticleListItem from "./ArticleListItem";
import ReactPaginate from "react-paginate";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    paddingBottom: 60,
  },
  gridContainer: {
    maxWidth: 1000,
    backgroundColor: "white",
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    maxWidth: 800,
    padding: 5,
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
  pages: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
  },
  page: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#E8E8E8",
    color: "#4F4F4F",
    margin: "0 5px",
    cursor: "pointer",
    "&.active": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  previousButton: {
    color: theme.palette.primary.contrastText,
    borderRadius: "5px",
    padding: "5px 10px",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginRight: "5px",
  },
  nextButton: {
    color: theme.palette.primary.contrastText,
    borderRadius: "5px",
    padding: "5px 10px",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginLeft: "5px",
  },
  breakLabel: {
    padding: "0 10px",
  },
  activePage: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 10px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  pages: {
    display: "flex",
    listStyle: "none",
  },
  pageItem: {
    display: "flex",
    margin: 0,
    "&:not(:first-child)": {},
  },
  pageLink: {
    backgroundColor: "white",
    color: theme.palette.text.primary,
    borderRadius: "50%",
    padding: "8px",
    margin: "0 5px",
    "&:hover": {
      color: "white",
      cursor: "pointer",
    },
  },
  breakMe: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  breakLink: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  active: {
    color: theme.palette.text.light,
    fontWeight: "bold",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  activeLink: {
    border: "1px solid #3f51b5",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}));

const ArticleListFull = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

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

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 1;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const filteredArticlesToDisplay = filteredArticles.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const pageCount = Math.ceil(filteredArticles.length / pageSize);

  const onUpdate = (onUpdate) => {
    setFilteredArticles(onUpdate);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        className={classes.gridContainer}
      >
        <ArticleControl articles={articles} onUpdate={onUpdate} />
        <Grid item xs={9}>
          <List className={classes.list}>
            {filteredArticlesToDisplay.map((article) => (
              <ArticleListItem article={article} />
            ))}
          </List>
          <ReactPaginate
            previousLabel={
              <Button
                variant="contained"
                color="primary"
                className={classes.previousButton}
              >
                Previous
              </Button>
            }
            nextLabel={
              <Button
                variant="contained"
                color="primary"
                className={classes.nextButton}
              >
                Next
              </Button>
            }
            breakLabel={<span className={classes.breakLink}>...</span>}
            breakClassName={classes.breakMe}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={classes.pagination}
            subContainerClassName={classes.pages}
            pageClassName={classes.pageItem}
            pageLinkClassName={classes.pageLink}
            activeClassName={classes.activeLink}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ArticleListFull;
