import { AppBar, Drawer, Hidden, IconButton, MenuItem, MenuList, Toolbar } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import HeaderMenu from '../components/headerMenu';
import HomeHandyButton from '../components/hhButton';
import NotificationMenu from '../components/notificationMenu';
import UserAvatar from '../components/userAvatar';
import AgentOnboardingDialog from '../pages/agent/agentOnboardingDialog';
import { handleLogout, handleSwitchRole } from '../reducers/users';
import { parser } from '../utils/parser';
// import { handleMarkLogsRead, handleGetNotificationLogs } from '../reducers/notifications'
import { paths } from '../utils/paths';
const pack = require('../../package.json')
// const NotificationsIcon = require('../assets/images/icons/notifications.svg')
// const MessagesIcon = require('../assets/images/icons/messages.svg')

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
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(0),
    }
  },
  menuLink: {
    fontFamily: theme.typography.secondaryFont,
    color: theme.palette.primary.shade,
    padding: theme.spacing(1, 3),
    whiteSpace: 'pre-wrap',
    '&:hover': {
      backgroundColor: theme.palette.secondary.tint1
    }
  },
  avatarBox: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    bottom: 0,
  },
  badgeIcon: {
    // top: 4,
    // right: 4
  },
}));

function MemberHeader({ history, userDetail, companies, isLimited, handleLogout, handleSwitchRole }) {
  const classes = useStyles()
  const theme = useTheme()
  const [showAgentOnboarding, setShowAgentOnboarding] = React.useState(false)
  const [isNotificationsOpen, setNotificationsMenu] = React.useState(false)
  const [isMenuOpen, setMenuOpen] = React.useState(false)
  const headerMenuRef = React.useRef(null);
  const anchorNotificationsRef = React.useRef(null);
  const handleMenuLink = (path) => {
    setMenuOpen(false)
    history.push(path)
  }
  const handleMenuLogout = () => {
    setMenuOpen(false)
    handleLogout()
  }
  const getMenuItems = () => {
    return [
      { active: !isLimited, action: () => handleMenuLink(paths.root), label: 'Dashboard' },
      // { active: !isLimited, action: () => handleMenuLink(paths.profile), label: 'Profile' },
      { active: false, action: () => handleMenuLink(paths.root), label: 'Account Settings' },
      { active: userDetail && userDetail.default_profile === 'agent', action: () => {handleSwitchRole(); setMenuOpen(false)}, label: 'View as Customer' },
      { active: userDetail && userDetail.default_profile === 'customer' && !(continueOnboarding()), action: () => {handleSwitchRole(); setMenuOpen(false)}, label: 'View as Agent' },
      { active: true, action: handleMenuLogout, label: 'Sign out' }
    ]
  }
  const continueOnboarding = () => {
    return Boolean(userDetail && userDetail.default_profile === 'customer') && Boolean(!companies || companies.length === 0 || 
        !companies[0].service_areas || !companies[0].services || 
        !companies[0].service_packages)
  }
  return (
    <React.Fragment>
      <AgentOnboardingDialog open={showAgentOnboarding} toggleDialog={setShowAgentOnboarding} />
      <AppBar position="fixed" color="primary" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <img title={pack.description + " v" + pack.version} alt={pack.description + " v" + pack.version} onClick={() => history.push(paths.root)} className={classes.logoBig} src={require('../assets/images/logo_long.png')} />
          <div className={classes.grow} />
          <Hidden mdUp>
            <IconButton onClick={() => setMenuOpen(true)} edge="start" className={classes.menuButton} color="inherit">
              <MenuIcon style={{fontSize: 40}} color="secondary" />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <div className={classes.avatarBox}>
                <IconButton ref={headerMenuRef} style={{marginRight: 8}} title={parser.fullName(userDetail)} onClick={() => {setMenuOpen(true)}}>
                  <UserAvatar width={28} profile={userDetail} />
                  <ArrowDropDownIcon style={{color: theme.palette.secondary.main}} />
                </IconButton>
                {!isLimited && <React.Fragment>
                  {/* <IconButton title='Messages' onClick={() => history.push(paths.messaging)}>    
                    <Badge color="secondary" classes={{badge: classes.badgeIcon}} variant="dot">
                      <img alt="Messages" src={MessagesIcon} style={{width: 32}} />
                    </Badge>
                  </IconButton>
                  <IconButton title='Notifications' ref={anchorNotificationsRef} onClick={() => {setNotificationsMenu(true)}}>
                    <Badge color="secondary" classes={{badge: classes.badgeIcon}} variant="dot">
                      <img alt="Notifications" src={NotificationsIcon} style={{width: 32}} />
                    </Badge>
                  </IconButton> */}
                  {continueOnboarding() &&
                    <HomeHandyButton onClick={() => setShowAgentOnboarding(true)} style={{backgroundColor: '#FFF', padding: theme.spacing(0.5, 2), marginLeft: 16, color: theme.palette.primary.main}}>
                      Become an Agent
                    </HomeHandyButton>
                  }
                </React.Fragment>}
              </div>
            </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden smDown>
        <NotificationMenu
          isOpen={isNotificationsOpen}
          anchorNotificationsRef={anchorNotificationsRef}
          handleCloseNotifications={() => setNotificationsMenu(false)} />
        <HeaderMenu 
          anchorRef={headerMenuRef}
          isOpen={isMenuOpen}
          openMenu={setMenuOpen}>
            <MenuList style={{padding: 0}}>
              {getMenuItems().filter(x => x.active).map((item, index) => {
                return <MenuItem key={index} className={classes.menuLink} onClick={item.action}>{item.label}</MenuItem>
              })}
            </MenuList>
        </HeaderMenu>
      </Hidden>
      <Hidden mdUp>
        <Drawer open={isMenuOpen} onClose={() => setMenuOpen(false)}>
          <div
            className={classes.sideMenu}
            onClick={() => setMenuOpen(false)}
            onKeyDown={() => setMenuOpen(false)}
          >
            <MenuList>
              {getMenuItems().filter(x => x.active).map((item, index) => {
                return <MenuItem key={index} className={classes.menuLink} onClick={item.action}>{item.label}</MenuItem>
              })}
            </MenuList>
          </div>
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    handleLogout,
    handleSwitchRole
  }, dispatch)
}
const mapState = (state) => {
  return {
    userDetail: state.users.userDetail,
    companies: state.companies.companyList,
    // properties: state.properties.propertyList,
  }
}

export default withRouter(connect(mapState, mapDispatchToProps)(MemberHeader));
