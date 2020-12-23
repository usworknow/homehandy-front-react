import { Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MessageIcon from '@material-ui/icons/ChatOutlined';
import PhoneIcon from '@material-ui/icons/PhoneAndroid';
import cls from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
      padding: 24,
    },
    primaryColor: {
      color: theme.palette.primary.main
    },
    description: {
      marginTop: 32,
      [theme.breakpoints.down('sm')]: { 
        marginTop: 0,
        fontWeight: 'normal'
      }
    },
    pageLabel: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    }
  }))

const AgentProfile = ({ userDetail }) => {
  const classes = useStyles()
  return (
    <Grid container spacing={0}>
        <Grid item xs={12} md={3} className={cls(classes.gridBorder, classes.gridItem)}>
          <Hidden mdUp>
            <div style={{display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
              <div><UserAvatar width={160} profile={userDetail} /></div>
              <div style={{marginLeft: 24}}>
                <Typography style={{marginBottom: 20}}>{userDetail && userDetail.services && userDetail.services.map(x => x.label).join(', ')}</Typography>
                <Typography style={{display: 'flex', alignItems: 'center', marginBottom: 20}} className={classes.primaryColor}><PhoneIcon style={{marginRight: 8}} /> (61) 1234-1234</Typography>
                <Typography style={{display: 'flex', alignItems: 'center',}} className={classes.primaryColor}><MessageIcon style={{marginRight: 8}} /> Message</Typography>
              </div>
            </div>
          </Hidden>
          <Hidden smDown>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
              <EditableComponent onClick={() => console.log('open image editor')}>
                <UserAvatar width={160} profile={userDetail} />
              </EditableComponent>
              <div style={{marginTop: 16}}>
                <Typography component="div" style={{fontWeight: 'bold'}}>
                  Areas Serviced
                </Typography>
                {userDetail && userDetail.areas && userDetail.areas.map(area => (
                  <Typography key={area.id} component="div">{area.label}</Typography>
                ))}
              </div>
            </div>
          </Hidden>
        </Grid>
        <Grid item xs={12} md={6} className={cls(classes.gridBorder, classes.gridItem)}>
          <EditableComponent>
          <div>
            <Hidden smDown>
                <Typography component="div" variant='h3' className={classes.primaryColor}>{userDetail.company_name}</Typography>
              <Typography>{userDetail && userDetail.services && userDetail.services.map(x => x.label).join(', ')}</Typography>
            </Hidden>
              <Typography variant="subtitle2" className={classes.description}>
              Etiam lorem mauris, mollis vel felis a, rhoncus porttitor nisl. Praesent vulputate, mi posuere mattis ornare, felis turpis luctus nibh, in faucibus ipsum ante vitae enim. Vivamus tempor rutrum semper. Aliquam maximus ornare aliquam. Donec massa diam, aliquet at fermentum eu, suscipit at nunc. Duis at pharetra justo. Curabitur purus metus, eleifend at arcu non, varius varius augue. <br /><br /> Nullam quis magna id ipsum dignissim congue fringilla ac nulla. Fusce non tristique enim, vel ullamcorper velit. Nulla vulputate egestas pharetra. Suspendisse potenti. Mauris at risus velit. Maecenas scelerisque eros a dolor lacinia, nec scelerisque nisi ornare.
              </Typography>
          </div>
          </EditableComponent>
        </Grid>
        <Grid item xs={12} md={3} className={classes.gridItem}>
          <EditableComponent>
          <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
            <div>
              <Typography variant="body1" className={classes.pageLabel}>Operating Hours</Typography>
              <div style={{marginTop: 8}}>
                <div>Monday: 9am to 5pm</div>
                <div>Tuesday: 9am to 5pm</div>
                <div>Wednesday: 9am to 5pm</div>
                <div>Thursday: 9am to 5pm</div>
                <div>Fridat: 9am to 5pm</div>
              </div>
            </div>
            <Hidden mdUp>
              <div>
                <Typography variant="body1" className={classes.pageLabel}>Areas Serviced</Typography>
                {userDetail && userDetail.areas && userDetail.areas.map(area => (
                  <Typography key={area.id} component="div">{area.label}</Typography>
                ))}
              </div>
            </Hidden>
          </div>
          </EditableComponent>
        </Grid>
    </Grid>
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

export default connect(mapStateToProps, mapDispatch)(AgentProfile)
  