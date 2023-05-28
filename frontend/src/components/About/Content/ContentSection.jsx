import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import ContentEdit from "./ContentEdit";
import DOMPurify from "dompurify";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(2),
    color: "black",
    background: theme.palette.background.default,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
  },
  body: {
    marginBottom: theme.spacing(0),
    fontWeight: 400,
    fontSize: "1.01rem",
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const ContentSection = ({
  title,
  body,
  editState,
  setEdit,
  onUpdate,
  type,
  editMode,
  adminLink,
  text = "",
}) => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);

  return (
    <Grid item xs={12} sm={12} className={classes.section}>
      {!editState ? (
        <>
          <Typography
            variant="h3"
            className={`${classes.sectionTitle} ${classes.fadeIn}`}
          >
            <Grid container justifyContent="space-between">
              {title}
              {!editState && editMode ? (
                <EditDeleteButtonMenu
                  hideDelete
                  editClick={() => setEdit(!editState)}
                  adminLink={adminLink}
                  text={text}
                />
              ) : null}
            </Grid>
          </Typography>
          {body ? (
            <Typography
              variant="body1"
              className={`${classes.body} ${classes.fadeIn}`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(body),
              }}
            />
          ) : null}
        </>
      ) : (
        <ContentEdit
          content={{ title, body }}
          onUpdate={onUpdate}
          type={type}
          handleCancel={() => setEdit(!editState)}
        />
      )}
    </Grid>
  );
};

export default ContentSection;
