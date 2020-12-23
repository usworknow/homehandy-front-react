import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageGallery from '../../components/imageGallery';

const sample1 = require('../../assets/images/sample4.png')
const sample2 = require('../../assets/images/sample3.png')
const sample3 = require('../../assets/images/sample2.png')
const sample4 = require('../../assets/images/sample1.png')

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%', 
    textAlign: 'center', 
    margin: 'auto', 
    padding: '40px 0',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      padding: '24px'
    }
  },
  pageTitle: {
    marginBottom: 16,
    color: theme.palette.primary.main
  },
  pageLabel: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  }
}))

const ProfileImageGallery = ({ userDetail }) => {
  const classes = useStyles()
  return ( 
    <div className={classes.root}>
      <Typography variant="h2" className={classes.pageTitle}>{userDetail && userDetail.default_profile === 'agent' ? "Work Photo Gallery" : "Home Gallery"}</Typography>    
      <Typography variant="subtitle2">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</Typography>
      <div style={{marginTop: 32}}>
        <ImageGallery images={[sample1, sample2, sample3, sample4]} />
      </div>
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
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatch)(ProfileImageGallery)
  