import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import EditButton from "../../Elements/Buttons/EditButton";
import ContentEdit from "./ContentEdit";
import DOMPurify from "dompurify";

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: theme.spacing(2),
    color: "black",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
  },
  body: {
    marginBottom: theme.spacing(1.5),
    fontWeight: 400,
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
  auth,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} className={classes.section}>
      {!editState ? (
        <>
          <Typography
            variant="h3"
            className={`${classes.sectionTitle} ${classes.fadeIn}`}
          >
            {title}
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
        />
      )}
      {auth.is_superuser ? (
        <EditButton onClick={() => setEdit(!editState)} editState={editState} />
      ) : null}
    </Grid>
  );
};

export default ContentSection;
