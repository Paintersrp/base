import { makeStyles } from "@material-ui/core/styles";
import { Container, Tooltip, Typography } from "@material-ui/core";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { SlideIntoViewPort } from "../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BenefitEdit from "./BenefitEdit";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import BaseCard from "../../Elements/Base/Card/BaseCard";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  benefitDescription: {
    color: "#6B6B6B",
    minHeight: 100,
  },
  tooltip: {
    marginTop: 4,
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const Benefit = ({ benefit, edit = true, editMode }) => {
  console.log(benefit);
  const [data, setData] = useState(benefit);
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setData(benefit);
  }, [benefit]);

  const updateBenefit = (updateBenefit) => {
    setData(updateBenefit);
    setEditing(false);
  };

  return (
    // <SlideIntoViewPort
    //   addition={900}
    //   animationDuration={1}
    //   onScreenPercentage={0.9}
    // >
    <>
      {!editing ? (
        <BaseCard
          noHover
          mediaPosition="none"
          icon={data.icon}
          title={data.title}
          elevation={1}
          headerTitleProps={{ variant: "h5" }}
          actions={[
            !editing && editMode && edit ? (
              <EditDeleteButtonMenu
                hideDelete
                editClick={() => setEditing(!editing)}
                adminLink="benefits"
                text="Benefits"
              />
            ) : null,
          ]}
        >
          <Typography variant="body2" className={classes.benefitDescription}>
            {data.description}
          </Typography>
          {benefit.buttonText && (
            <Tooltip
              title={`View ${data.buttonText}`}
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <Container
                disableGutters
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link to={`/${benefit.page_link}`}>
                  <StyledButton size="small" buttonText={data.buttonText} />
                </Link>
              </Container>
            </Tooltip>
          )}
        </BaseCard>
      ) : (
        <BenefitEdit
          benefit={data}
          updateBenefit={updateBenefit}
          handleCancel={() => setEditing(!editing)}
        />
      )}
    </>
    // </SlideIntoViewPort>
  );
};

export default Benefit;
