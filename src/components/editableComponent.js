import { Avatar, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  avatarStyle: {
    width: 24, 
    height: 24, 
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.tint1,
    },
    [theme.breakpoints.down('sm')]: {
    }
  },
}))

export default function EditableComponent ({children, ...other}) {
  const classes = useStyles()
  return (
      <Badge 
        overlap="rectangle" 
        style={{width: '100%'}}
        badgeContent={
          <Avatar 
            className={classes.avatarStyle}
            src={require('../assets/images/icons/edit.svg')} />}
        {...other}
        >
          {children}
      </Badge>
  )
}
