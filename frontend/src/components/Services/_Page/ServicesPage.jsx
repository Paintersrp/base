import React, { useState } from "react";
import PageContainer from "../../Elements/Layout/PageContainer";
import Benefits from "../Benefits/Benefits";
import Timeline from "../../WIP/Timeline/Timeline";
import { Grid, makeStyles } from "@material-ui/core";
import Quiz from "../Quiz/Quiz/Quiz";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";

const useStyles = makeStyles((theme) => ({
  quizContainer: {
    color: theme.palette.text.dark,
    maxWidth: "100%",
  },
}));

function ServicesPage({ handleUpdate }) {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      backgroundColor="#F5F5F5"
      page_name="Services"
    >
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
      <Grid container justifyContent="center" style={{ display: "flex" }}>
        <div style={{ maxWidth: 1400, width: "100%" }}>
          <div className={classes.quizContainer}>
            <Quiz />
          </div>
        </div>
      </Grid>
    </PageContainer>
  );
}

export default ServicesPage;
