import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import Benefit from "./Benefit";
import TitleBlock from "../../Elements/TextBlocks/TitleBlock/TitleBlock";
import EditButton from "../../Elements/Buttons/EditButton";
import { useSelector } from "react-redux";
import TitleBlockEditor from "../../Elements/TextBlocks/TitleBlock/TitleBlockEditor";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(8, 0, 20, 0),
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
  },
}));

const Benefits = () => {
  const classes = useStyles();
  const [benefits, setBenefits] = useState([]);
  const [titleBlock, setTitleBlock] = useState([]);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    axiosInstance
      .get("/benefits/")
      .then((response) => {
        setBenefits(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .get("/titleblock/benefits/")
      .then((response) => {
        setTitleBlock(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateTitleBlock = (updateTitleBlock) => {
    setTitleBlock(updateTitleBlock);
    setEditing(false);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="false">
        {!editing && auth.is_superuser ? (
          <div style={{ marginTop: 20 }}>
            <EditButton
              onClick={() => setEditing(!editing)}
              editState={editing}
            />
          </div>
        ) : null}
        {!editing ? (
          <TitleBlock
            subtitle={titleBlock.subtitle}
            title={titleBlock.title}
            description={titleBlock.description}
            alignment={titleBlock.alignment}
            showDivider={titleBlock.showDivider}
          />
        ) : (
          <TitleBlockEditor
            titleBlock={titleBlock}
            onUpdate={updateTitleBlock}
            handleCancel={() => setEditing(!editing)}
            description
          />
        )}
        <div className={classes.benefitContainer}>
          <Grid container>
            {benefits.map((benefit, index) => (
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
                <Benefit benefit={benefit} />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Benefits;
