import { Typography } from '@material-ui/core';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
const useStyles = makeStyles(theme => ({
}))
const getMuiTheme = () => createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        fontSize: '11px'
      }
    },
    MuiMenuItem: {
      root: {
          fontSize: '11px'
      }
    },
      MuiListItem: {
          root: {
              padding: 0
          },
          gutters: {
              paddingLeft: 0,
              paddingRight: 0,
              padding: 0,
          }
      }
  }
})
const _TEMPLATE = ({ session }) => {

  return (
    <main>
      <MuiThemeProvider theme={getMuiTheme()}>
      <Typography variant="h4" align="center" gutterBottom>
        Hello World
      </Typography>
      </MuiThemeProvider>
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}
// const mapDispatch = (dispatch) => {
//   return bindActionCreators({
//   }, dispatch)
// }

export default connect(mapStateToProps)(_TEMPLATE)
