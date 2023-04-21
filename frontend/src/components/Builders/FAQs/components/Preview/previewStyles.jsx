import { makeStyles } from "@material-ui/core";

export const previewStyles = makeStyles((theme) => ({
    tab: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.light,
      fontWeight: "700",
      fontFamily: "Roboto",
      textTransform: "uppercase",
      fontSize: "0.95rem",
      marginRight: 5,
      "&:focus": {
        color: theme.palette.background.light,
      },
      "&: .MuiTab-textColorInherit.Mui-selected": {
        color: theme.palette.background.light,
      },
    },
    tabsIndicator: {
      width: "100%",
      backgroundColor: theme.palette.background.light,
      borderBottom: `3px solid ${theme.palette.secondary.main}`,
    },
    summary: {
      backgroundColor: theme.palette.background.light,
      fontFamily: "Roboto",
      color: "black",
    },
    heading: {
      fontSize: "1.2rem",
      fontWeight: 700,
      fontFamily: "Roboto",
      color: "black",
    },
    details: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.light,
      color: "black",
      fontFamily: "Roboto",
      textAlign: "left",
    },
  
    skeletonPreview: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
    },
    skeletonAccordion: {
      borderRadius: "4px",
      border: "1px solid #e0e0e0",
      backgroundColor: "#f5f5f5",
    },
    skeletonDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "10px",
    },
  
    editButton: {
      marginRight: theme.spacing(1),
      color: theme.palette.success.light,
      "&:hover": {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.common.white,
      },
    },
    previewButton: {
      color: theme.palette.info.light,
      "&:hover": {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.common.white,
      },
    },
  }));