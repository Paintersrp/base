import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Button, Grid } from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import ArticleControl from "../Actions/ArticleControl";
import ReactPaginate from "react-paginate";
import ArticlesDisplayBase from "../DisplayBase/ArticlesDisplayBase";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    justifyContent: "center",
    paddingBottom: 60,
  },
  gridContainer: {
    maxWidth: 1000,
    backgroundColor: theme.palette.background.light,
    paddingTop: theme.spacing(3),
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    maxWidth: 800,
    padding: 0,
    margin: 0,
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
    backgroundColor: theme.palette.background.light,
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

const ArticlesList = () => {
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [displayArticles, setDisplayArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;
  let pageCount;

  useEffect(() => {
    axiosInstance
      .get("/articles/")
      .then((response) => {
        console.log("Full");
        console.log(response.data);
        setArticles(response.data);
        setFilteredArticles(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handlePageClick = (data) => {
    const newPage = data.selected;
    if (newPage * pageSize >= filteredArticles.length) {
      setCurrentPage(Math.floor(filteredArticles.length / pageSize));
    } else {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    setDisplayArticles(
      filteredArticles.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
      )
    );
  }, [filteredArticles, currentPage]);

  pageCount = Math.ceil(filteredArticles.length / pageSize);

  const onUpdate = (onUpdate) => {
    console.log(onUpdate);
    setFilteredArticles(onUpdate);
    if (currentPage >= Math.ceil(onUpdate.length / pageSize)) {
      setCurrentPage(0);
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        justifyContent="center"
        className={classes.gridContainer}
      >
        <Grid item xs={3} style={{ paddingRight: 5 }}>
          <ArticleControl articles={articles} onUpdate={onUpdate} />
        </Grid>
        <Grid item xs={9}>
          <List className={classes.list}>
            <ArticlesDisplayBase classSet="list" articles={displayArticles} />
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

export default ArticlesList;
