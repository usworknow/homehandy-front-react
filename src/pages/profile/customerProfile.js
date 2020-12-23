import { Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cls from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AvatarDialog from '../../components/avatarDialog';
import EditableComponent from '../../components/editableComponent';
import UserAvatar from '../../components/userAvatar';

const useStyles = makeStyles(theme => ({
    gridBorder: {
      borderRight: `solid 3px ${theme.palette.secondary.main}`,
      borderBottom: 'none',
      [theme.breakpoints.down('sm')]: { 
        borderRight: 'none',
        borderBottom: `solid 3px ${theme.palette.secondary.main}`,
      }
    },
    gridItem: {
      padding: 16
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

const CustomerProfile = ({ userDetail }) => {
  const classes = useStyles()
  const [ imageDialogOpen, setImageDialogOpen ] = React.useState(false)
  return (
    <React.Fragment>
    <AvatarDialog
      open={imageDialogOpen}
      toggleDialog={() => setImageDialogOpen(false)} />
    <Grid container spacing={0}>
        <Grid item xs={12} md={3} className={cls(classes.gridBorder, classes.gridItem)}>
          <EditableComponent onClick={() => setImageDialogOpen(true)}>
              <Hidden mdUp>
              <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
                  <div><UserAvatar width={160} profile={userDetail} /></div>
                  <div style={{marginLeft: 24}}>
                    <Typography variant='h3' className={classes.pageTitle}>{userDetail.first_name} {userDetail.last_name}</Typography>
                    <Typography style={{marginBottom: 20}}>Address</Typography>
                    <Typography>Phone Number</Typography>
                  </div>
              </div>
            </Hidden>
            <Hidden smDown>
              <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                  <UserAvatar width={160} profile={userDetail} />
              </div>
            </Hidden>
          </EditableComponent>
        </Grid>
        <Grid item xs={12} md={6} className={cls(classes.gridBorder, classes.gridItem)}>
          <EditableComponent onClick={() => console.log('edit details')}>
            <div>
                <Hidden smDown>
                  <Typography variant='h3' className={classes.pageTitle}>{userDetail.first_name} {userDetail.last_name}</Typography>
                </Hidden>
                <Typography style={{paddingRight: 16}}>Etiam lorem mauris, mollis vel felis a, rhoncus porttitor nisl. Praesent vulputate, mi posuere mattis ornare, felis turpis luctus nibh, in faucibus ipsum ante vitae enim. Vivamus tempor rutrum semper. Aliquam maximus ornare aliquam. Donec massa diam, aliquet at fermentum eu, suscipit at nunc. Nulla vulputate egestas pharetra. Suspendisse potenti. Mauris at risus velit. Maecenas scelerisque eros a dolor lacinia, nec scelerisque nisi ornare.</Typography>
                <Hidden smDown>
                  <br />
                  <Typography>Address</Typography>
                  <Typography>Phone Number</Typography>
                </Hidden>
            </div>
          </EditableComponent>
        </Grid>
        <Grid item xs={12} md={3} className={classes.gridItem}>
          <EditableComponent onClick={() => console.log('edit property')}>
            <div style={{paddingRight: 16}}>
              <Typography variant="body2"><span className={classes.pageLabel}>Property Type:</span> Lorem Ipsum</Typography>
              <Typography variant="body2"><span className={classes.pageLabel}>Approx. Size:</span> Lorem Ipsum</Typography>
              <Typography variant="body2"><span className={classes.pageLabel}>No. Bedrooms:</span> 4</Typography>
              <Typography variant="body2"><span className={classes.pageLabel}>No. Bathrooms:</span> 4</Typography>
            </div>
          </EditableComponent>
        </Grid>
    </Grid>
    </React.Fragment>
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

export default connect(mapStateToProps, mapDispatch)(CustomerProfile)
  