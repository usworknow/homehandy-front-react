import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AccountIcon from '@material-ui/icons/AccountCircle';
import React from 'react';

const useStyles = makeStyles(theme => ({
  avatar: {
    borderRadius: theme.spacing(20),
    borderColor: theme.palette.secondary.main,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.secondary.main, 
    color: theme.palette.common.white
    // [theme.breakpoints.down('sm')]: {
    //   width: '40px',
    //   height: '40px'
    // },
  },
}))

const UserAvatar = ({ profile, width, ...other }) => {
  const classes = useStyles()
  // const theme = useTheme()
  const getImage = () => {
    if (!profile) { return null }
    return profile.default_profile ? profile.profile_image : profile.logo
  }
  const profileImage = getImage()
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyItems: 'center', width: width || 36, height: width || 36}} {...other}>
      {profileImage
        ? <Avatar alt="Profile Picture" src={profileImage} className={classes.avatar} /> 
        : <AccountIcon className={classes.avatar} style={{}} />
      }
    </div>
  )
}

export default UserAvatar
