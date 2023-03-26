import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import ManyToManyField from "../../../../Elements/Fields/ManyToManyField";

const useStyles = makeStyles((theme) => ({
  helpText: {
    margin: theme.spacing(1, 0, 0.25, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const ManyToManyType = ({
  formData,
  setFormData,
  fieldName,
  verboseName,
  handleManyToManyChange,
  xsColumnCount = 12,
  mdColumnCount = 12,
  helpText,
}) => {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        order: 999,
        paddingRight: 8,
        paddingLeft: 8,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Typography className={classes.helpText}>
          {helpText || verboseName}
        </Typography>
        <ManyToManyField
          data={formData[fieldName]}
          setFormData={setFormData}
          fieldName={fieldName}
          verboseName={verboseName}
          handleManyToManyChange={handleManyToManyChange}
        />
      </div>
    </Grid>
  );
};

export default ManyToManyType;
