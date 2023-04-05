import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import Benefit from "./Benefit";
import TitleBlock from "../../Elements/TextBlocks/TitleBlock/TitleBlock";
import { useSelector } from "react-redux";
import TitleBlockEditor from "../../Elements/TextBlocks/TitleBlock/TitleBlockEditor";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(8, 0, 20, 0),
    width: "100%",
  },
  gridItem: {
    display: "flex",
    padding: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
  benefitContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: "100%",
    width: "100%",
  },
}));

const Benefits = ({
  benefits,
  block,
  setBlock,
  editMode,
  showBlock = true,
}) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);
  console.log(benefits);

  const updateTitleBlock = (updateTitleBlock) => {
    setBlock(updateTitleBlock);
    setEditing(false);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xl" style={{ width: "100%" }}>
        {!editing && editMode ? (
          <div style={{ marginTop: 20, maxWidth: 1000 }}>
            <EditDeleteButtonMenu
              hideDelete
              editClick={() => setEditing(!editing)}
              adminLink="titleblock"
              text="Title Block"
            />
          </div>
        ) : null}
        {showBlock && (
          <>
            {!editing ? (
              <TitleBlock
                subtitle={block.subtitle}
                title={block.title}
                description={block.description}
                alignment={block.alignment}
                showDivider={block.showDivider}
              />
            ) : (
              <TitleBlockEditor
                titleBlock={block}
                onUpdate={updateTitleBlock}
                handleCancel={() => setEditing(!editing)}
                description
              />
            )}
          </>
        )}

        <div className={classes.benefitContainer}>
          <Grid container style={{ width: "100%" }}>
            {benefits.map((benefit, index) => {
              console.log(benefit);
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={4}
                  className={classes.gridItem}
                  key={benefit.title}
                >
                  <Benefit benefit={benefit} editMode={editMode} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Benefits;
