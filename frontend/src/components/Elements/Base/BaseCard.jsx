import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 700,
    backgroundColor: theme.palette.background.light,
    borderRadius: theme.spacing(1),
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: theme.shadows[7],
      border: `0.5px solid ${theme.palette.secondary.main}`,
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(2),
    minHeight: 50,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    flex: 1,
  },
  cardActions: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
    minHeight: 50,
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "100%",
  },
  // cardMedia: {
  //   paddingTop: "56.25%",
  // },
}));

const BaseCard = ({
  title,
  subtitle,
  headerAction,
  children,
  actions,
  elevation,
  headerTitleProps,
  headerSubheaderProps,
  headerActionProps,
  media,
  mediaPosition = "left",
}) => {
  const classes = useStyles();
  let mediaLeft = false;
  let mediaTop = false;

  if (mediaPosition === "left") {
    mediaLeft = true;
  } else if (mediaPosition === "top") {
    mediaTop = true;
  }

  return (
    <Card className={classes.root} elevation={elevation}>
      <Grid container spacing={0}>
        {mediaLeft && (
          <>
            <Grid item xs={4}>
              {media && (
                <CardMedia className={classes.cardMedia} image={media} />
              )}
            </Grid>
            <Grid item xs={8}>
              {title && (
                <CardHeader
                  title={title}
                  subheader={subtitle}
                  action={headerAction}
                  className={classes.cardHeader}
                  titleTypographyProps={headerTitleProps}
                  subheaderTypographyProps={headerSubheaderProps}
                  actionProps={headerActionProps}
                />
              )}
              <CardContent className={classes.cardContent}>
                {children}
              </CardContent>
              {actions && (
                <CardActions className={classes.cardActions}>
                  {actions}
                </CardActions>
              )}
            </Grid>
          </>
        )}
        {mediaTop && (
          <>
            <Grid item xs={12}>
              {media && (
                <CardMedia className={classes.cardMedia} image={media} />
              )}
            </Grid>
            <Grid item xs={12}>
              {title && (
                <CardHeader
                  title={title}
                  subheader={subtitle}
                  action={headerAction}
                  className={classes.cardHeader}
                  titleTypographyProps={headerTitleProps}
                  subheaderTypographyProps={headerSubheaderProps}
                  actionProps={headerActionProps}
                />
              )}
              <CardContent className={classes.cardContent}>
                {children}
              </CardContent>
              {actions && (
                <CardActions className={classes.cardActions}>
                  {actions}
                </CardActions>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Card>
  );
};

BaseCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerAction: PropTypes.element,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  elevation: PropTypes.number,
  headerTitleProps: PropTypes.object,
  headerSubheaderProps: PropTypes.object,
  headerActionProps: PropTypes.object,
  media: PropTypes.string,
};

BaseCard.defaultProps = {
  elevation: 1,
  headerTitleProps: {},
  headerSubheaderProps: {},
  headerActionProps: {},
};

export default BaseCard;
