import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import HomeHandyRoundedPaper from '../components/hhRoundedPaper';
import loginView from '../pages/login/loginView';
import registrationView from '../pages/registration/registrationView';
import setPasswordContainer from '../pages/setPassword/setPasswordContainer';
import { paths } from '../utils/paths';

const useStyles = makeStyles(theme => ({
  logoGrid: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: '72%',
    maxWidth: 465,
    margin: '50px 0',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
      maxWidth: 400,
      margin: '90px 0 30px'
    }
  },
  componentGrid: {
    backgroundColor: theme.palette.grayscale.tint1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.common.white,
    }
  },
  componentHolder: {
    width: '80%',
    margin: '50px 0',
    maxWidth: 465,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '5% auto 20%'
    },
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 4),
      display: 'block',
      borderRadius: 0,
      boxShadow: 'none'
    },
  },
}))
const GuestLayout = ({history}) => {
  const classes = useStyles()
  return (
    <Grid container style={{height: '100vh', minWidth: 300}}>
      <Grid item md={6} sm={12} className={classes.logoGrid}>
          <img alt="Logo" onClick={() => history.push(paths.root)} className={classes.logo} src={require('../assets/images/logo_login.png')} />
      </Grid>
      <Grid item md={6} sm={12} className={classes.componentGrid}>
        <div className={classes.componentHolder}>
          <HomeHandyRoundedPaper className={classes.paper}>
            <Switch>
                <Route path={paths.login} exact component={loginView} />
                <Route path={paths.register} exact component={registrationView } />
                <Route path={`${paths.setPassword}/:email`} component={setPasswordContainer } />
                <Redirect to={paths.login} />
            </Switch> 
          </HomeHandyRoundedPaper>
        </div>
      </Grid>
    </Grid>
  )
}

export default withRouter(GuestLayout)
