import { AppBar, Drawer, Hidden, IconButton, MenuItem, MenuList, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SignOutIcon from '@material-ui/icons/PowerSettingsNew';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { handleLogout } from '../reducers/users';
// import { handleMarkLogsRead, handleGetNotificationLogs } from '../reducers/notifications'
import { paths } from '../utils/paths';
const pack = require('../../package.json')

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex'
  },
  sideMenu: {
    width: 250
  },
  appBar: {
    width: "100%",
    backgroundColor: '#FFF',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  grow: {
    flexGrow: 1,
  },
  logoBig: {
    width: 180,
    padding: '8px 0',
    cursor: 'pointer',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  logoSmall: {
    width: 144,
    cursor: 'pointer',
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    }
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(0),
    }
  },
  menuLink: {
    fontFamily: theme.typography.secondaryFont,
    color: theme.palette.primary.main,
    padding: '4px 24px',
  },
}));

function AdminHeader({ history, handleLogout }) {
  const classes = useStyles();
  const [mobileMenuOpen, openMobileMenu] = React.useState(false);
  
  const sideMenu = () => (
    <div
      className={classes.sideMenu}
      onClick={() => openMobileMenu(false)}
      onKeyDown={() => openMobileMenu(false)}
    >
      <MenuList>
        <MenuItem className={classes.menuLink} onClick={() => history.push(paths.root)}>Home</MenuItem>
        <MenuItem className={classes.menuLink} onClick={() => history.push(paths.companies)}>Companies</MenuItem>
        <MenuItem className={classes.menuLink} onClick={() => history.push(paths.users)}>Users</MenuItem>
        <MenuItem className={classes.menuLink}>Sign out</MenuItem>
      </MenuList>
    </div>
  )
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Hidden smUp>
            <IconButton onClick={() => openMobileMenu(true)} edge="start" className={classes.menuButton} color="inherit">
              <MenuIcon style={{color: '#333'}} />
            </IconButton>
          </Hidden>
          <img title={pack.description + " v" + pack.version} alt={pack.description + " v" + pack.version} onClick={() => history.push(paths.root)} className={classes.logoBig} src={require('../assets/images/logo_long.png')} />
          <img title={pack.description + " v" + pack.version} alt={pack.description + " v" + pack.version} onClick={() => history.push(paths.root)} className={classes.logoSmall} src={require('../assets/images/logo_long.png')} />
          <div className={classes.grow} />
          <IconButton title='Sign Out' onClick={() => handleLogout()}>
            <SignOutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Hidden smUp>
        <Drawer open={mobileMenuOpen} onClose={() => openMobileMenu(false)}>
          {sideMenu()}
        </Drawer>
      </Hidden>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogout
  }, dispatch)
}
const mapState = (state) => {
  return {
  }
}

export default withRouter(connect(mapState, mapDispatchToProps)(AdminHeader));
