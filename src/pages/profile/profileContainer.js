import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeHandyContentContainer from '../../components/hhContentContainer';
import AgentProfile from './agentProfile';
import CustomerProfile from './customerProfile';
import ProfileImageGallery from './profileImageGallery';
import ProfileServicePackages from './profileServicePackages';

const useStyles = makeStyles(theme => ({
  imageGalleryHolder: {
    backgroundColor: theme.palette.grayscale.tint2, 
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down('sm')]: { 
      marginTop: theme.spacing(1)
    }
  }
}))
function ProfileContainer({userDetail}) {
  const classes = useStyles()
  return (
      <HomeHandyContentContainer fullWidth>
        <div style={{padding: 24}}>
          {userDetail && userDetail.default_profile === 'agent' ? <AgentProfile /> : <CustomerProfile /> }
        </div>
        <div>
          {userDetail && userDetail.default_profile === 'agent' && <ProfileServicePackages />}
        </div>
        <div className={classes.imageGalleryHolder}>
          <ProfileImageGallery />
        </div>
      </HomeHandyContentContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    userDetail: state.users.userDetail
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(ProfileContainer)
