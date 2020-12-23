import { CircularProgress, Collapse, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GuestTitle from '../../components/guestTitle';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyTextField from '../../components/hhTextField';
import { handleAuthRequested, handleGoogleAuth, handleRegistration } from '../../reducers/users';
import { parser } from '../../utils/parser';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_ID;

const RegistrationView = ({users, handleRegistration, handleGoogleAuth, handleAuthRequested}) => {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [application, setApplication] = React.useState({})
  const [ showManual, setShowManual ] = React.useState(false)
  const [values, setValues] = React.useState({
    helperText: '',
    password: '',
    confirmPassword: ''
  })
  // const { signOut: googleSignOut } = useGoogleLogout({ clientId: GOOGLE_CLIENT_ID })
  React.useEffect(() => {
    setErrorMessage(users.error || '')
  }, [users.error]);
  const handleChange = (event) => {
    const name = event.target.name
    const value = (event.target.value || '').trim()
    setApplication(oldValues => ({ ...oldValues, [name]: value }))
    setErrorMessage('')
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!parser.isValidEmail(application.email)) {
      return setErrorMessage('Email Address is not valid')
    } else { setErrorMessage('') }
    if (verifyValues()) {
      handleRegistration({...application, password: values.password})
    }
  }
  const handleGoogleResponse = (response) => {
    if (response.error) {
      return console.error('Google registration error', response.error)
    }
    handleGoogleAuth({...response.profileObj, id_token: response.tokenObj.id_token, access_token: response.tokenObj.access_token})
  }
  const onChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    setValues(oldValues => ({...oldValues, helperText: '', [name]: value })) 
  }
  const verifyValues = () => {
    if (!values.password) { 
      setValues(oldValues => ({...oldValues, helperText: 'All fields required' }))
      return false
    }
    if (!parser.isValidPassword(values.password)) {
      setValues(oldValues => ({...oldValues, helperText: 'Invalid Password. 8 character minimum including at least 1 uppercase, 1 lowercase and 1 number'}))
      return false
    }
    if (values.confirmPassword !== values.password) {
      setValues(oldValues => ({...oldValues, helperText: 'Passwords must match.' }))
      return false
    }
    return true
  }
  if (users.isLoading) {
    return <React.Fragment>
    <GuestTitle style={{textAlign: 'center'}}>
      Sign-up for Home Handy
    </GuestTitle>
    <div style={{width: '100%', textAlign: 'center', padding: 80}}>
      <CircularProgress size={96} />
    </div>
    </React.Fragment>
  }
  return (
    <React.Fragment>
      <GuestTitle style={{textAlign: 'center'}}>
        Sign-up for Home Handy
      </GuestTitle>
      <div style={{width: '100%', textAlign: 'center'}}>
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
          buttonText="Sign-up with Google"
          onRequest={handleAuthRequested}
          onSuccess={handleGoogleResponse}
          onFailure={handleGoogleResponse}
          cookiePolicy={'single_host_origin'}
        />
        <p style={{margin: '16px 0'}}>OR</p>
        <HomeHandyButton style={{marginBottom: 8}} onClick={() => setShowManual(showManual => { return !showManual })}>Sign-up manually&nbsp;<sup style={{alignSelf: 'flex-start'}}>*</sup></HomeHandyButton>
      </div>
      <Collapse in={showManual}>
          <Typography>Some features, such as an integrated Google calendar, will be unavailable or limited with manual sign-up.</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <HomeHandyTextField
                  name="first_name"
                  label="First Name"
                  value={application.first_name || ''}
                  onChange={handleChange}
                  required />
              </Grid>
              <Grid item xs={12} md={6}>
                <HomeHandyTextField
                  name="last_name"
                  label="Last Name"
                  value={application.last_name || ''}
                  onChange={handleChange}
                  required />
              </Grid>
            </Grid>
            <HomeHandyTextField
              name="email"
              label="Email Address"
              value={application.email || ''}
              onChange={handleChange}
              required />
            <HomeHandyTextField
              name="phone"
              label="Phone Number"
              value={application.phone || ''}
              onChange={handleChange}
              required />
            <HomeHandyTextField
              name="password"
              label="Password"
              error={values.helperText.length > 0}
              required
              value={values.password || ''}
              onChange={onChange}
              type="password" />
            <HomeHandyTextField
              name="confirmPassword"
              label="Confirm Password"
              helperText={values.helperText || 'Password must be minimum 8 characters, including at least 1 uppercase, 1 lowercase and 1 number'}
              required
              value={values.confirmPassword || ''}
              error={values.helperText.length > 0}
              onChange={onChange}
              type="password" />

            <div style={{margin: '16px auto', width: '100%', textAlign: 'center'}}>
              <Typography color="error">
                {errorMessage}
              </Typography>
              <HomeHandyButton type="submit" fullWidth>
                Sign-up
              </HomeHandyButton>
            </div>
          </form>
        </Collapse>
      <Typography gutterBottom component="p" variant="caption"><sup>*</sup>Some features, such as an integrated Google calendar, will be unavailable or limited with manual sign-up.</Typography>
      <Typography component="p" variant="body2" style={{marginTop: 16}}>
        By signing in you agree with the Terms and Conditions and Privacy Policy
      </Typography>
      {/* <Button onClick={() => googleSignOut()}>Sign Out</Button> */}
    </React.Fragment> 
  )
}
const mapStateToProps = (state) => {
  return { 
    users: {...state.users}
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleRegistration,
    handleAuthRequested,
    handleGoogleAuth,
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(RegistrationView)
