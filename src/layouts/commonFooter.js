import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
const pack = require('../../package.json')

const useStyles = makeStyles(theme => ({
  footerRoot: {
    // alignItems: 'center', 
    // backgroundColor: theme.palette.primary.main,
    color: '#FFF'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    top: 'auto',
    bottom: 0,
  },
  toolBar: {
    padding: '16px',
    display: 'flex',
    alignItems: 'flex-end',
  },
  // lower: {
  //   display: 'flex', 
  //   flexDirection: 'row',
  //   position: 'absolute', 
  //   bottom: 16, 
  //   width: '100%',
  //   [theme.breakpoints.down('sm')]: {
  //     flexDirection: 'column',
  //     textAlign: 'left'
  //   }
  // },
  legalese: {
    display: 'flex', 
    textAlign: 'right', 
    alignItems:  'flex-end',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    }
  }
}))
const CommonFooter = () => {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div title={'v' + pack.version} style={{paddingRight: 24}}>
          <img style={{width: 64}} src={require('../assets/images/logo_short.svg')} alt="Home Handy" />
        </div>
        <div style={{display: 'block'}}>
          <div style={{display: 'flex', alignItems: 'flex-start', color: theme.palette.secondary.main, justifyContent: 'flex-start'}}>
            <Typography variant="body1" style={{paddingRight: 24}}>About Us</Typography>
            <Typography variant="body1" style={{paddingRight: 24}}>Contact Us</Typography>
          </div>
          <div style={{display: 'flex', marginTop: 8, alignItems: 'flex-end', justifyContent: 'flex-start'}}>
            <Typography variant="body2">&copy; {(new Date().getFullYear())} {pack.description}. All rights reserved.</Typography>
            
            {/* <div><img style={{paddingRight: 24}} src={require('../assets/images/icons/social_facebook.svg')} alt="Facebook" /></div>
            <div><img style={{paddingRight: 24}} src={require('../assets/images/icons/social_linkedin.svg')} alt="LinkedIn" /></div>
            <div><img src={require('../assets/images/icons/social_twitter.svg')} alt="Twitter" /></div> */}
          </div>
        </div>
        <div style={{flexGrow: 1}} />
        <div className={classes.legalese}>
          <div style={{paddingRight: 24}}>Privacy Policy</div>
          <div>Terms of Service</div>
        </div>
      </Toolbar>
    </AppBar>
      // <Typography title={'v' + pack.version} variant="body2" style={{color: "#FFF", padding: '8px 16px'}}>
      //   &copy; {pack.description} {(new Date().getFullYear())}
      // </Typography>
  )
}
export default CommonFooter
