import { Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeHandyButton from '../../components/hhButton';
import { handleLogout } from '../../reducers/users';

function AgentBenefits ({userDetail, handleSubmit, handleLogout}) {
  return (
    <div>
      <div style={{width: '100%', textAlign: 'left'}}>
        <Typography gutterBottom variant="h6">Agent Benefits Overview</Typography>
        <Typography gutterBottom variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu. Pellentesque sed turpis sit amet mi posuere bibendum at sit amet nunc. In vehicula vitae est sit amet pharetra.
        </Typography>
      </div>
      <div style={{width: '100%', textAlign: 'center', padding: 16}}>
        <HomeHandyButton onClick={() => handleSubmit()}>
          Proceed to Agent Onboarding
        </HomeHandyButton>
      </div>
      {!userDetail.google_id && <React.Fragment>
        <div style={{width: '100%', textAlign: 'center'}}>
          <Typography variant="body2">Or</Typography>
        </div>
        <div style={{width: '100%', textAlign: 'center', padding: 16}}>
          <Typography variant="body2">Sign in with Google for enhanced features such as integrated calendar views</Typography>
          <div style={{cursor: 'pointer'}} onClick={() => handleLogout()}>
            <img src={require('../../assets/images/temp_google_signin.png')} alt="Google" />
          </div>
        </div>
      </React.Fragment>
      }
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
      userDetail: state.users.userDetail
  }
}
const mapDispatch = (dispatch) => {
  return bindActionCreators({
    handleLogout
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(AgentBenefits);
