import { Hidden } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { handleGetCompanies } from '../reducers/companies';
// import { handleGetUsers } from '../reducers/users';
import AdminHeader from './adminHeader';
import AdminSidebar from './adminSidebar';
import CommonFooter from './commonFooter';

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: 66,
    maxWidth: '100%',
    overflowX: 'hidden',
    [theme.breakpoints.down('xs')]: {
      overflowX: 'auto',
      display: 'block',
    },
  },
  content: {
    padding: theme.spacing(4, 2),
    flexGrow: 1,
    minHeight: `calc(100vh - 100px)`
  },
})

const AdminLayout = ({classes, handleGetUsers, handleGetCompanies}) => {
  // React.useEffect(() => {
  //   handleGetUsers()
  //   handleGetCompanies()
  // }, [handleGetUsers, handleGetCompanies]);
  return (
  <div id="admin-layout-root">
    <AdminHeader />
    <div className={classes.root}>
      <Hidden xsDown>
        <AdminSidebar />
      </Hidden>
      <div className={classes.content}>
        Hello World
        {/* <Switch>
            <Route path={paths.companies} exact component={Companies} />
            <Route path={paths.users} exact component={Users} />
            <Redirect to={paths.companies} />
        </Switch>   */}
      </div> 
    </div>
    <CommonFooter />     
  </div>
  )
}

const mapDispatch = (dispatch) => {
  return bindActionCreators({
    // handleGetUsers,
    // handleGetCompanies
  }, dispatch)
}

export default connect(null, mapDispatch)(withStyles(styles)(AdminLayout))