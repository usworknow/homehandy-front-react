import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.sizes.toolbarHeight,
    width: '100%',
  },
  defaultPadding:{
    padding: theme.spacing(3, 3, 10, 3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1, 2, 10)
    },
  },
  fullWidth: {
    padding: theme.spacing(0,0,10,0)
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}))

const HomeHandyContentContainer = ({ fullWidth, children, ...other }) => {
  const classes = useStyles()
  return (
    <Box classes={{ root: classnames(classes.root, fullWidth ? classes.fullWidth : classes.defaultPadding) }} {...other}>
      <div className={classes.content}>
        {children}
      </div>
    </Box>
  )
}

export default HomeHandyContentContainer
