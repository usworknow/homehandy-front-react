import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  intro: {
    textAlign: 'center',
    width: '100%',
    padding: theme.spacing(2, 0),
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 0)
    }
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 26
    }
  },
}))

const GuestTitle = ({children, ...other}) => {
  const classes = useStyles()
  return (
    <div className={classes.intro}>
        <Typography variant="h3" className={classes.title} {...other}>
          {children}
        </Typography>
    </div>
  )
}

export default GuestTitle
