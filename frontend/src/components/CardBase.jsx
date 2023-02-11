import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper
  },
  cardHeader: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    minHeight: 50
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    flex: 1
  },
  cardActions: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
    minHeight: 50
  }
}));

const BaseCard = ({ title, subtitle, headerAction, children, actions, elevation, headerTitleProps, headerSubheaderProps, headerActionProps }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={elevation}>
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
  headerActionProps: PropTypes.object
};

BaseCard.defaultProps = {
  elevation: 1,
  headerTitleProps: {},
  headerSubheaderProps: {},
  headerActionProps: {}
};

export default BaseCard;
