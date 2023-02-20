import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { SlideIntoViewPort } from "../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";
import Icon from "../../Elements/Icon/Icon";
import EditButton from "../../Elements/Buttons/EditButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import BenefitEdit from "./BenefitEdit";

const useStyles = makeStyles((theme) => ({
  benefit: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0),
    },
  },
  benefitTitle: {
    fontWeight: 600,
    color: theme.palette.primary.black,
    marginBottom: theme.spacing(2),
  },
  benefitDescription: {
    color: "#6B6B6B",
    marginBottom: theme.spacing(2),
    minHeight: 100,
  },

  icon: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 20,
    color: theme.palette.primary.dark,
    fontSize: "2rem",
  },
}));

const Benefit = ({ benefit, minHeight }) => {
  const [data, setData] = useState(benefit);
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updateBenefit = (updateBenefit) => {
    setData(updateBenefit);
    setEditing(false);
  };

  return (
    <SlideIntoViewPort
      addition={900}
      animationDuration={1}
      onScreenPercentage={0.9}
    >
      {!editing ? (
        <Card className={classes.benefit}>
          <CardContent>
            <Container disableGutters display="flex">
              <Grid item xs={12}>
                <div className={classes.icon}>
                  <Icon icon={data.icon} />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" className={classes.benefitTitle}>
                  {data.title}
                </Typography>
              </Grid>
            </Container>
            <Typography
              variant="body2"
              className={classes.benefitDescription}
              style={{ minHeight: minHeight }}
            >
              {data.description}
            </Typography>

            {benefit.buttonText && (
              <Container
                disableGutters
                style={{ display: "flex", justifyContent: "center" }}
              >
                <StyledButton size="small" buttonText={data.buttonText} />
              </Container>
            )}
          </CardContent>
        </Card>
      ) : (
        <BenefitEdit
          benefit={benefit}
          updateBenefit={updateBenefit}
          handleCancel={() => setEditing(!editing)}
        />
      )}
      {!editing && auth.is_superuser ? (
        <EditButton onClick={() => setEditing(!editing)} editState={editing} />
      ) : null}
    </SlideIntoViewPort>
  );
};

export default Benefit;
