import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { withRouter } from 'react-router-dom';
import HomeHandyLinkButton from '../components/hhLinkButton';
// import { handleMarkLogsRead, handleGetNotificationLogs } from '../reducers/notifications'
import { paths } from '../utils/paths';
const pack = require('../../package.json')

const useStyles = makeStyles(theme => ({
  sideMenu: {
    width: '100vw'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(["margin"], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen
    // })
  },
  toolBar: {
    padding: '16px 16px 4px',
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-end'
    }
  },
  grow: {
    flexGrow: 1,
  },
  logoBig: {
    width: 96,
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
    }
  },
}));

function GuestHeader({ history }) {
  const classes = useStyles()
  return (
      <AppBar position="fixed" color="primary" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <img title={pack.description + " v" + pack.version} alt={pack.description + " v" + pack.version} onClick={() => history.push(paths.root)} className={classes.logoBig} src={require('../assets/images/logo_long.png')} />
          <div className={classes.grow} />
          <div style={{display: 'flex'}}>
            <HomeHandyLinkButton onClick={() => history.push(paths.register)} style={{marginRight: 16}}>Sign-up</HomeHandyLinkButton>
            <HomeHandyLinkButton onClick={() => history.push(paths.login)} style={{marginRight: 8}}>Login</HomeHandyLinkButton>
          </div>
        </Toolbar>
      </AppBar>
  );
}

export default withRouter(GuestHeader)
