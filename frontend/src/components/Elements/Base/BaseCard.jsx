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
    maxWidth: 1000,
    backgroundColor: theme.palette.background.light,
    borderRadius: theme.spacing(1),
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: theme.shadows[7],
      border: `0.5px solid ${theme.palette.secondary.main}`,
    },
  },
  cardHeader: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(2, 2, 1, 2),
    minHeight: 50,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 2, 0, 2),
    flex: 1,
  },
  cardActions: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2, 2, 2),
    minHeight: 50,
  },
  cardMedia: {
    paddingTop: "56.25%",
    height: "100%",
    borderTopLeftRadius: theme.spacing(0.5),
    borderBottomLeftRadius: theme.spacing(0.5),
  },
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
  mediaPosition,
}) => {
  const classes = useStyles();
  let mediaLayout = false;
  let contentLayout = false;

  if (mediaPosition === "left") {
    mediaLayout = { item: true, xs: 12, sm: 4, md: 3 };
    contentLayout = { item: true, xs: 12, sm: 8, md: 9 };
  } else if (mediaPosition === "top") {
    mediaLayout = { item: true, xs: 12 };
    contentLayout = { item: true, xs: 12 };
  }

  return (
    <Card className={classes.root} elevation={elevation}>
      <Grid container spacing={0}>
        <Grid
          item={mediaLayout.item}
          xs={mediaLayout.xs}
          sm={mediaLayout.sm}
          md={mediaLayout.md}
        >
          {media && <CardMedia className={classes.cardMedia} image={media} />}
        </Grid>
        <Grid
          item={contentLayout.item}
          xs={contentLayout.xs}
          sm={contentLayout.sm}
          md={contentLayout.md}
        >
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
          <CardContent className={classes.cardContent}>{children}</CardContent>
          {actions && (
            <CardActions className={classes.cardActions}>{actions}</CardActions>
          )}
        </Grid>
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
  mediaPosition: PropTypes.string,
};

BaseCard.defaultProps = {
  elevation: 1,
  headerTitleProps: {},
  headerSubheaderProps: {},
  headerActionProps: {},
  mediaPosition: "left",
};

export default BaseCard;
