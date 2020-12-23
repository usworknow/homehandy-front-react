import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    marginTop: theme.spacing(6),
    textAlign: 'center'
  },
}))

export default function WidgetLoading () {
  const classes = useStyles()
  return (
    <div className={classes.wrapper}><CircularProgress size={96} /></div>
    )
}
