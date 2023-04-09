import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Collapse,
  CardHeader,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import {
  AddCircleOutline,
  Delete,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";
import FormField from "../Elements/Fields/FormField";
import StyledButton from "../Elements/Buttons/StyledButton";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  name: {
    flexGrow: 1,
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  cardContent: {
    padding: theme.spacing(0, 0, 2, 0),
    "&:last-child": {
      paddingBottom: `${theme.spacing(0)}px !important`,
    },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: `${theme.spacing(0)}px !important`,
    },
  },
  background: {
    background: "#F5F5F5",
  },
  cardHeader: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2, 2, 2, 2),
    alignItems: "center",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  },
}));

export default function TableControl({
  nameFunc,
  removeFunc,
  addFunc,
  data,
  verbose,
  plural,
}) {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <div>
      <Typography variant="h2" align="center">
        {plural}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            style={{
              display: "flex",
              padding: "0px 4px 0px 4px",
              alignItems: "flex-end",
            }}
          >
            <FormField
              variant="standard"
              //   required
              label={`${verbose} ${data.length}`}
              value={data[data.length - 1]}
              onChange={(event) => nameFunc(event, data.length - 1)}
              className={classes.name}
            />

            <StyledButton
              maxWidth={70}
              minWidth={70}
              maxHeight={25}
              margin="0px 8px 0px 8px"
              size="small"
              color="primary"
              startIcon={<AddCircleOutline />}
              onClick={addFunc}
              buttonText={"Add"}
            />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader
              className={classes.cardHeader}
              title={`Previously added ${plural}`}
              action={
                <IconButton
                  onClick={() => setShow(!show)}
                  style={{ color: "white", marginTop: 4 }}
                  size="small"
                >
                  {show ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              }
            />
            <CardContent
              className={classes.background}
              classes={{ root: classes.cardContent }}
            >
              <Collapse in={show}>
                <Grid container spacing={0} style={{ padding: 16 }}>
                  {data.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <div key={index} className={classes.container}>
                        <TextField
                          //   required
                          label={`${verbose} ${index + 1}`}
                          value={item}
                          onChange={(event) => nameFunc(event, index)}
                          className={classes.name}
                        />
                        {data.length > 1 && (
                          <div className={classes.actions}>
                            <IconButton onClick={() => removeFunc(index)}>
                              <Delete />
                            </IconButton>
                          </div>
                        )}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
