import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { SnackbarProvider } from 'notistack';
import theme from '../assets/themes/theme';
import AdminLayout from './adminLayout';
import './app.css';
import GuestLayout from './guestLayout';
import MemberLayout from './memberLayout';

const App = ({ session }) => {
  const getLayout = () => {
    if (!session || !session.token) { return <GuestLayout /> }
    return session.role === 'admin' ? <AdminLayout /> : <MemberLayout />
  }
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {/* <SnackbarProvider SnackbarProps={{ autoHideDuration: 8000, anchorOrigin: { vertical: 'top', horizontal: 'center' } }}> */}
        <BrowserRouter>
            {getLayout()}
        </BrowserRouter>
      {/* </SnackbarProvider> */}
    </MuiThemeProvider>
  )
}

const mapState = (state) => {
  return {
    session: state.users.session
  }
}
export default connect(mapState)(App)
