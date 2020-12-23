import Typography from '@material-ui/core/Typography'
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import GuestTitle from '../../components/guestTitle'
import HomeHandyButton from '../../components/hhButton'
import HomeHandyTextField from '../../components/hhTextField'
import { handlePasswordReset } from '../../reducers/users'
import { parser } from '../../utils/parser'
import { paths } from '../../utils/paths'

const qs = require('query-string')

const SetPasswordContainer = ({location, match, user, handlePasswordReset}) => {
  const [values, setValues] = React.useState({
    helperText: '',
    password: '',
    confirmPassword: ''
  })
  const token = qs.parse(location.search).token
  const email = match.params.email
  if (!token || !email) { 
    return <Redirect to={paths.root} />
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (verifyValues()) {
      handlePasswordReset(email, values.password, token)
    }
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
  return (
    <React.Fragment>
      <GuestTitle>
        { location.pathname.indexOf('/set') === 0 ? 'Please set your password' : 'Reset Password' }
      </GuestTitle>
      <form onSubmit={handleSubmit}>
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
        <Typography color="error">
          {user.error}
        </Typography>
        <HomeHandyButton type="submit" fullWidth>
          Submit
        </HomeHandyButton>
      </form>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
    return { user: {...state.users} }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
      handlePasswordReset
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(SetPasswordContainer)
