import React from "react";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Dropdown from "./Dropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: theme.spacing(0, 0, 6, 0),
    minHeight: 100,
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0, 0, 7, 0),
    },
  },
  button: {
    padding: theme.spacing(0.5, 1, 0.5, 1),
    background: theme.palette.primary.main,
  },
  option: {
    fontSize: "0.85rem",
    fontWeight: 500,
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  span: {
    margin: theme.spacing(0, 2, 0, 2),
  },
  iconButton: {
    padding: theme.spacing(0.5, 0.5, 0.5, 0.5),
    margin: theme.spacing(0, 0.5, 0, 0.5),
  },
}));

export const Pagination = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  rowOptions,
}) => {
  const classes = useStyles();
  const totalPages = Math.ceil(count / rowsPerPage);
  const startIndex = page * rowsPerPage + 1;
  const endIndex = Math.min(startIndex + rowsPerPage - 1, count);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage - 1);
    }
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(+event);
  };

  return (
    <div className={classes.root}>
      <div className={classes.select}>
        <Dropdown
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          options={rowOptions}
        />
      </div>
      <div>
        <span className={classes.span}>
          {startIndex}-{endIndex} of {count}
        </span>
      </div>
      <div>
        <IconButton
          disabled={page === 0}
          onClick={() => handlePageChange(page)}
          className={classes.iconButton}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <IconButton
          disabled={page === totalPages - 1}
          onClick={() => handlePageChange(page + 2)}
          className={classes.iconButton}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>
    </div>
  );
};
