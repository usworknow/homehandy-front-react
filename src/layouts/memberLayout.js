import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { AgentDashboard, CustomerDashboard, Messaging, Profile } from '../pages';
import { handleGetCompanies } from '../reducers/companies';
import { handleGetProperties } from '../reducers/properties';
import { handleGetServices } from '../reducers/services';
import { handleGetServiceAreas } from '../reducers/service_areas';
import { handleGetUser } from '../reducers/users';
import { paths } from '../utils/paths';
import CommonFooter from './commonFooter';
import MemberHeader from './memberHeader';

const MemberLayout = ({ userDetail, handleGetUser, handleGetProperties, handleGetCompanies, handleGetServiceAreas, handleGetServices}) => {  
  React.useEffect(() => {
    handleGetUser()
    handleGetProperties()
    handleGetCompanies()
    handleGetServiceAreas()
    handleGetServices()
    // handleConnectNotifications(userDetail.email)
  }, [ handleGetUser, handleGetServiceAreas, handleGetCompanies, handleGetProperties, handleGetServices]);
  // const finishedOnboarding = profile && profile.status === 'complete'
  return (
    <div style={{padding: 0, margin: 0}}>
      <MemberHeader />
        {!userDetail ? <div /> :
          <Switch>
            <Route path={paths.root} exact component={userDetail.default_profile === 'customer' ? CustomerDashboard : AgentDashboard} />
            <Route path={paths.profile} exact component={Profile} />
            <Route path={paths.messaging} exact component={Messaging} />
            <Redirect to={paths.root} />
          </Switch>
        }
      <CommonFooter />
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
    handleGetServiceAreas,
    handleGetServices,
    handleGetUser,
    handleGetProperties,
    handleGetCompanies,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(MemberLayout)
