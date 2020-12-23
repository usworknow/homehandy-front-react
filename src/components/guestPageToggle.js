import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { clearAuthErrors } from '../reducers/users';
import { paths } from '../utils/paths';
import HomeHandyLinkButton from './hhLinkButton';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex', width: '80%', margin: 'auto', justifyContent: 'space-evenly'
  }
}))
const GuestPageToggle = ({path, history, clearAuthErrors}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <HomeHandyLinkButton 
        onClick={() => { clearAuthErrors(); history.push(paths.register)} } 
        style={path === paths.login ? {border: 0} : {}}>
        Sign-up
      </HomeHandyLinkButton>
      <HomeHandyLinkButton
        onClick={() => { clearAuthErrors(); history.push(paths.login)} }
        style={path === paths.register ? {border: 0} : {}}>
        Login
      </HomeHandyLinkButton>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    clearAuthErrors
  }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatch)(GuestPageToggle))
