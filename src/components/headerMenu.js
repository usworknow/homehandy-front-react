import { ClickAwayListener, Paper, Popper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import React from 'react';

const useStyles = makeStyles(theme => ({
  navMenu: {
    zIndex: 9999
  },
  menuBox: {
    position: 'relative', 
    minWidth: 200,
    border: `solid 1px ${theme.palette.primary.main}`
  },
  menuArrow: {
    position: 'absolute', 
    color: '#FFF', 
    top: -22, 
    right: 10, 
    fontSize: 40
  }
}))
export default function HeaderMenu ({children, anchorRef, isOpen, openMenu}) {
  const classes = useStyles()
  return (
    <Popper open={isOpen} className={classes.navMenu} anchorEl={anchorRef.current} placement="bottom-end">
        <ClickAwayListener onClickAway={() => openMenu(false)}>
          <Paper className={classes.menuBox}>
            <ArrowUpIcon className={classes.menuArrow} />
            {children}
          </Paper>
        </ClickAwayListener>
      </Popper>
  )
}
