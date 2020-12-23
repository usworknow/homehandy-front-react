import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import loginView from '../pages/login/loginView';
import registrationView from '../pages/registration/registrationView';
import setPasswordContainer from '../pages/setPassword/setPasswordContainer';
import { paths } from '../utils/paths';
import CommonFooter from './commonFooter';
import GuestHeader from './guestHeader';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '120px auto',
    padding: theme.spacing(2, 4, 4),
    width: '50%',
    maxWidth: 500,
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: '100px auto',
      padding: theme.spacing(2, 3)
    },
  }
}))

const GuestLayout = () => {  
  const classes = useStyles()
  return (
    <React.Fragment>
      <GuestHeader />
      <Paper elevation={3} className={classes.root}>
        <Switch>
            <Route path={paths.login} exact component={loginView} />
            <Route path={paths.register} exact component={registrationView } />
            <Route path={`${paths.setPassword}/:email`} component={setPasswordContainer } />
            <Redirect to={paths.register} />
        </Switch> 
      </Paper>
      <CommonFooter />
    </React.Fragment>
  )
}

export default GuestLayout
