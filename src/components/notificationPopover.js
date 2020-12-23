import { Typography } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../utils/paths';

const useStyles = makeStyles(theme => ({
  emptyBox: {
    textAlign: 'center',
    width: '100%',
    padding: '16px 0',
  },
  notificationItem: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    borderBottom: 'solid 1px #e7e7ea',
    padding: 8,
  },
  subHeader: {
    backgroundColor: '#f5f6f7',
    borderBottom: 'solid 1px #e7e7ea',
  },
  subTitle: {
    padding: '4px 20px',
    fontWeight: 'normal',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: 14
  },
}))

const NotificationMessage = ({ message, closeNotifications }) => {
  const classes = useStyles()
  return <div className={classes.notificationItem}>
    <MailIcon style={{marginRight: 8}} />
    <Typography variant="caption">
      <Link onClick={() => closeNotifications()} to={paths.root}>New notification</Link>
    </Typography>
  </div>
}

export default function NotificationPopover({ newItems, oldItems, closeNotifications }) {
  const classes = useStyles()
  return (
    <React.Fragment>
      {/* {!newItems || newItems.length === 0
        ? <div className={classes.emptyBox}>
          No recent notifications
        </div> :  */}
      <div>
          <div className={classes.subHeader}>
            <Typography variant="subtitle2" className={classes.subTitle}>New</Typography>
          </div>
          <div>
            {[0,1].map((message, idx) => {
              return <NotificationMessage key={idx} message={message} closeNotifications={closeNotifications} />
            })}
          </div>
        </div>
      {/* }
      {oldItems && oldItems.length > 0 && */}
      <div>
        <div className={classes.subHeader}>
          <Typography variant="subtitle2" className={classes.subTitle}>Earlier</Typography>
        </div>
        <div>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map((message, idx) => {
            return <NotificationMessage key={idx} message={message} closeNotifications={closeNotifications} />
          })}
        </div>
      </div>  
      {/* } */}
    </React.Fragment>
  )
}
