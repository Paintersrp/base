import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { SlideIntoViewPort } from "../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";
import { useState } from "react";
import { useSelector } from "react-redux";
import BenefitEdit from "./BenefitEdit";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import BaseCard from "../../Elements/Base/Card/BaseCard";

const useStyles = makeStyles((theme) => ({
  benefitDescription: {
    color: "#6B6B6B",
    minHeight: 100,
  },
}));

const Benefit = ({ benefit }) => {
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
        <BaseCard
          noHover
          mediaPosition="none"
          icon={data.icon}
          title={data.title}
          elevation={1}
          headerTitleProps={{ variant: "h5" }}
          actions={[
            !editing && auth.is_superuser ? (
              <EditDeleteButtonMenu
                hideDelete
                editClick={() => setEditing(!editing)}
              />
            ) : null,
          ]}
        >
          <Typography variant="body2" className={classes.benefitDescription}>
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
        </BaseCard>
      ) : (
        <BenefitEdit
          benefit={data}
          updateBenefit={updateBenefit}
          handleCancel={() => setEditing(!editing)}
        />
      )}
    </SlideIntoViewPort>
  );
};

export default Benefit;
