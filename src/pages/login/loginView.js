
import { InputAdornment, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GuestTitle from '../../components/guestTitle';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyCheckbox from '../../components/hhCheckbox';
import HomeHandyTextField from '../../components/hhTextField';
import WidgetLoading from '../../components/widgetLoading';
import { clearAuthErrors, handleAuthRequested, handleForgotPassword, handleGoogleAuth, handleLogin, handleRememberMe, resetPasswordSent } from '../../reducers/users';
// const passwordLock = require('../../assets/images/icons/password_lock.svg')
const pack = require('../../../package.json')
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  success: {
    color: '#008000'
  },
  clickable: {
    margin: 0,
    padding: 0,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  submit: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  adornment: {
    width: 18,
    color: theme.palette.primary.main
  }
}))

function LoginView({ handleForgotPassword, handleLogin, handleGoogleAuth, handleAuthRequested, handleRememberMe, resetPasswordSent, clearAuthErrors, users }) {
  const classes = useStyles()
  const [forgotPassword, setForgotPassword] = React.useState(false)
  const handleForgotClick = (evt) => {
    evt.preventDefault()
    clearAuthErrors()
    setForgotPassword(true)
  }
  const handleForgotPasswordCancel = (evt) => {
    evt.preventDefault()
    clearAuthErrors()
    resetPasswordSent()
    setForgotPassword(false)
  }  
  const handleForgotPasswordSubmit = (evt) => {
    evt.preventDefault()
    const email = evt.target.email.value
    handleForgotPassword(email.trim())
  }

  const rememberMe = (evt, checked) => {
    handleRememberMe(checked)
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault()
    const email = evt.target.email.value
    const password = evt.target.password.value
    const rememberMe = evt.target.remember.checked
    handleLogin(email.trim(), password.trim(), rememberMe)
  }
  const handleGoogleResponse = (response) => {
    if (response.error) {
      return console.error('Google login error', response.error)
    }
    handleGoogleAuth({...response.profileObj, id_token: response.tokenObj.id_token, access_token: response.tokenObj.access_token})
  }
  if (users.isLoading) {
    return <React.Fragment>
    <GuestTitle style={{textAlign: 'center'}}>
      Welcome to Home Handy
    </GuestTitle>
    <WidgetLoading />
    </React.Fragment>
  }
  return (
    <React.Fragment>
      <GuestTitle>
        {forgotPassword ? "Forgot Your Password?" : "Welcome to " + pack.description}
      </GuestTitle>
      {!forgotPassword && <div style={{width: '100%', textAlign: 'center'}}>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          // render={renderProps => (
            //   <HomeHandyButton fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}>
          //     <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
          //       <div>Icon</div>
          //       <div>This is my custom Google button</div>
          //     </div>
          //   </HomeHandyButton>
          // )}
          buttonText="Sign in with Google"
          onRequest={handleAuthRequested}
          onSuccess={handleGoogleResponse}
          onFailure={handleGoogleResponse}
          cookiePolicy={'single_host_origin'}
        />
        <Typography color="error" component="p" variant="subtitle2" style={{width: '100%', textAlign: 'center', marginTop: 4, marginBottom: 4}} >
          {users.googleError && "The user is not recognized. Please sign-up"}
        </Typography>
        <p style={{margin: '16px 0'}}>OR</p>
      </div>}
      <form className={classes.form} onSubmit={forgotPassword ? handleForgotPasswordSubmit : handleSubmit}>
        <HomeHandyTextField
          id="email"
          label="Email Address"
          error={Boolean(users.error)}
          required
          InputProps={{
            startAdornment: (<InputAdornment position="start"><MailIcon className={classes.adornment} /></InputAdornment>),
          }}
        />
        { !forgotPassword && <React.Fragment>
          <HomeHandyTextField
            id="password"
            label="Password"
            error={Boolean(users.error)}
            required
            type="password"
            InputProps={{
              startAdornment: ( <InputAdornment position="start"><LockIcon className={classes.adornment} /></InputAdornment> ),
            }}
            autoComplete="current-password"
            variant="outlined" 
          />
        </React.Fragment> }
        {!forgotPassword ? <HomeHandyCheckbox
          label="Remember me"
          onChange={rememberMe} 
          id='remember' 
          name='remember'
        /> : <div style={{padding: 12}} />
        }
        <div style={{margin: '8px auto', textAlign: 'center'}}>
            <HomeHandyButton disabled={users.sentReset && !users.error} type="submit">
              {forgotPassword ? "Submit" : "Login"}
            </HomeHandyButton>
        </div>
        <Typography color="error" component="p" variant="subtitle2" style={{width: '100%', textAlign: 'center', marginTop: 4, marginBottom: 4}} >
          {users.error || ''}
        </Typography>
        {users.sentReset && !users.error && <Typography className={classes.success} style={{width: '100%', textAlign: 'center'}} component="p" variant="subtitle1">
          Thank you. We received your request.
        </Typography>}
      </form>
      {forgotPassword ? <Typography style={{textAlign: 'center', marginTop: 16}} onClick={handleForgotPasswordCancel} className={classes.clickable}>
          Cancel
        </Typography>
        : <Typography style={{textAlign: 'center', marginTop: 32}} onClick={handleForgotClick} className={classes.clickable}>
        Forgot your password?
      </Typography>}
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return { users: {...state.users} }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    clearAuthErrors,
    handleForgotPassword,
    handleLogin,
    handleGoogleAuth,
    handleAuthRequested,
    handleRememberMe,
    resetPasswordSent
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(LoginView)

