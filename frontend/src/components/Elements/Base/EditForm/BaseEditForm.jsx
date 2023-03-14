import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormField from "../../Fields/FormField";
import TitleBlockMixin from "./TitleBlockMixin";
import IconSelectMixin from "./IconSelectMixin";
import ImageEditMixin from "./ImageEditMxin";
import UpdateCancelButtonMenu from "../../Buttons/UpdateCancelButtonMenu";
import Flexbox from "../../Layout/Flexbox/Flexbox";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(3),
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    margin: "0 auto",
  },
  noShadowForm: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(0, 3, 0, 3),
    borderRadius: 10,
    boxShadow: theme.shadows[0],
    margin: "0 auto",
  },
  formTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
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

function BaseEditForm({
  title,
  handleSubmit,
  handleChange,
  handleCancel,
  formData,
  width = "100%",
  excludeKeys = [],
  multilineKeys = [],
  titleBlockMixin = false,
  handleSwitchChange = {},
  iconMixin = false,
  imageMixin = false,
  newImage = "",
  newImageName = "",
  noBoxShadow = false,
  fadeIn = true,
  placement = "bottom",
}) {
  const classes = useStyles();

  return (
    <Flexbox direction="column" className={fadeIn ? classes.fadeIn : ""}>
      <div
        className={!noBoxShadow ? classes.form : classes.noShadowForm}
        style={{ width: width }}
      >
        {title ? (
          <Typography variant="h4" className={classes.formTitle}>
            {title}
          </Typography>
        ) : null}
        <form onSubmit={handleSubmit}>
          {imageMixin ? (
            <ImageEditMixin
              handleChange={handleChange}
              formData={formData}
              newImage={newImage}
              newImageName={newImageName}
            />
          ) : null}
          {Object.keys(formData).map((key) => {
            if (!excludeKeys.includes(key)) {
              console.log(key);
              return (
                <FormField
                  key={key}
                  id={key}
                  name={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData[key]}
                  onChange={handleChange}
                  multiline={multilineKeys.includes(key)}
                />
              );
            }
          })}

          {titleBlockMixin ? (
            <>
              <TitleBlockMixin
                handleChange={handleChange}
                formData={formData}
                handleSwitchChange={handleSwitchChange}
              />
            </>
          ) : null}
          {iconMixin ? (
            <IconSelectMixin handleChange={handleChange} formData={formData} />
          ) : null}

          <UpdateCancelButtonMenu
            handleCancel={handleCancel}
            position="center"
            placement={placement}
          />
        </form>
      </div>
    </Flexbox>
  );
}

BaseEditForm.propTypes = {
  title: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  width: PropTypes.string,
  excludeKeys: PropTypes.arrayOf(PropTypes.string),
  multilineKeys: PropTypes.arrayOf(PropTypes.string),
  titleBlock: PropTypes.bool,
  handleSwitchChange: PropTypes.func,
};

BaseEditForm.defaultProps = {
  width: "100%",
  excludeKeys: [],
  multilineKeys: [],
  titleBlock: false,
  handleSwitchChange: {},
};

export default BaseEditForm;
