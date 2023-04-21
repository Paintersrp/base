import { makeStyles } from "@material-ui/core";

export const listPreviewStyles = makeStyles((theme) => ({
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
    editButton: {
      color: theme.palette.success.light,
      "&:hover": {
        backgroundColor: theme.palette.success.light,
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
    dragInner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.info.main,
      marginRight: 4,
    },
    dragInnerSkeleton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#aaaaaa",
      marginRight: 4,
      marginLeft: 0,
      paddingLeft: 0,
    },
    addActions: {
      display: "flex",
      padding: "16px 4px 0px 4px",
      alignItems: "flex-end",
      justifyContent: "center",
      width: "100%",
      marginTop: 24,
    },
    listItemSkeleton: {
      padding: theme.spacing(1, 1, 1, 0),
      border: "1px solid #e0e0e0",
      marginBottom: theme.spacing(1),
    },
    listItem: {
      padding: theme.spacing(1),
      border: "1px solid #e0e0e0",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
  }));