import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeHandyContentContainer from '../../components/hhContentContainer';
import ServicePackages from '../../components/servicePackages';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', 
    textAlign: 'center', 
    margin: '0 auto', 
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      padding: '24px'
    }
  },
  pageTitle: {
    marginBottom: 16,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: 22,
      fontWeight: 'bold'
    }
  },
  pageLabel: {
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontWeight: 'normal'
    }
  }
}))

const packageList = [
  { id: 1, service: 'handyman', title: 'Hnadyman Basic', cost: 29, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 1, service: 'handyman', title: 'Handyman Pro', cost: 49, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 1, service: 'handyman', title: 'Hadyman Annual', cost: 490, period: 'year', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 2, service: 'lawn', title: 'Lawn Basic', cost: 29, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 2, service: 'lawn', title: 'Lawn Pro', cost: 99, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 2, service: 'lawn', title: 'Lawn Basic', cost: 29, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 2, service: 'lawn', title: 'Lawn Pro', cost: 99, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 4, service: 'cleaning', title: 'Cleaning Basic', cost: 29, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 4, service: 'cleaning', title: 'Cleaning Pro', cost: 49, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 4, service: 'cleaning', title: 'Cleaning Basic', cost: 29, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 4, service: 'cleaning', title: 'Cleaning Pro', cost: 49, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 3, service: 'pool', title: 'Pool Basic', cost: 29, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 3, service: 'pool', title: 'Pool Basic', cost: 29, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
  { id: 3, service: 'pool', title: 'Pool Pro', cost: 59, period: 'month', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi utquip ex ea commodo consequat. \n\n• Duis aute irure dolor in \n• Voluptate velit esse \n• Cillum dolore eu fugiat nulla \n• Excepteur sint occaecat'},
]
const ProfileServicePackages = ({userDetail}) => {
  const classes = useStyles()
  return ( 
    <HomeHandyContentContainer style={{paddingTop: 0, paddingBottom: 0}}>
      <div className={classes.root}>
        <Typography variant="h2" className={classes.pageTitle}>Available Service Packages</Typography>    
        <Typography variant="subtitle2" className={classes.pageLabel}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</Typography>
        <div style={{marginTop: 32}}>
          {userDetail && userDetail.services && userDetail.services.length > 0 ? 
            <ServicePackages profile={userDetail} packageList={packageList} /> : 
            <Typography>No services available</Typography>}
        </div>
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

export default connect(mapStateToProps, mapDispatch)(ProfileServicePackages)
  