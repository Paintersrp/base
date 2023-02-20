import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { CardMedia, Grid } from "@material-ui/core";
import { defaultCardStyle } from "./BaseCardStyles";

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
  classes = defaultCardStyle(),
}) => {
  let mediaLayout = false;
  let contentLayout = false;

  if (mediaPosition === "left") {
    mediaLayout = { item: true, xs: 12, sm: 4, md: 3 };
    contentLayout = { item: true, xs: 12, sm: 8, md: 9 };
  } else if (mediaPosition === "top") {
    mediaLayout = { item: true, xs: 12 };
    contentLayout = { item: true, xs: 12 };
  } else if (mediaPosition === "list") {
    mediaLayout = { item: true, xs: "hidden", sm: 4, md: 3 };
    contentLayout = { item: true, xs: 12, sm: 8, md: 9 };
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
  elevation: 0,
  headerTitleProps: {},
  headerSubheaderProps: {},
  headerActionProps: {},
  mediaPosition: "left",
};

export default BaseCard;
