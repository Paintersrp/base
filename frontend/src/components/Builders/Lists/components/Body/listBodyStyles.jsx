import { makeStyles } from "@material-ui/core";

export const listBodyStyles = makeStyles((theme) => ({
  addActions: {
    display: "flex",
    padding: "16px 4px 0px 4px",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
  list: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0),
    width: "100%",
  },
  listItemText: {
    "& .MuiTypography-root": {
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: "0.8rem",
    },
    "& .MuiTypography-colorTextSecondary": {
      fontSize: "0.8rem",
    },
  },
  deleteButton: {
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white,
    },
  },
  defaultIcon: {
    color: theme.palette.primary.main,
    fontSize: "2.5rem",
  },
  thumbnailContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2, 2, 2, 0),
    padding: theme.spacing(2, 0, 2, 0),
  },
  listThumbnailImage: {
    width: 100,
    height: 60,
    objectFit: "cover",
    borderRadius: theme.spacing(1),
  },
  listItemSkeleton: {
    border: "1px solid #e0e0e0",
    margin: theme.spacing(2, 0),
  },
}));
