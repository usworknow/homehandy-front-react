import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import HeaderMenu from './headerMenu';
import NotificationPopover from './notificationPopover';

const useStyles = makeStyles(theme => ({
  notificationMenuRoot: {
    minHeight: theme.spacing(6),
    flex: '1 1 0%',
    height: 'auto',
    overflowY: 'auto'
  },
}))

const NotificationMenu = ({ isOpen, anchorNotificationsRef, handleCloseNotifications }) => {
  const classes = useStyles()
  return (
    <HeaderMenu
      anchorRef={anchorNotificationsRef}
      isOpen={isOpen}
      openMenu={handleCloseNotifications}
    >
      <Card style={{minWidth: 400}}>
        <CardHeader
          disableTypography={true}
          style={{borderBottom: 'solid 1px #e7e7ea', padding: '8px 12px'}}
          title={<Typography color="primary" variant="subtitle2" style={{fontSize: 16}}>Notifications</Typography>}
        />
        <CardContent style={{padding: 0}}>
          <div className={classes.notificationMenuRoot} style={{maxHeight: 400}}>
            <NotificationPopover
              newItems={[]}
              oldItems={[]}
              closeNotifications={handleCloseNotifications} />
          </div>
        </CardContent>
      </Card>
    </HeaderMenu>
  )
}

export default NotificationMenu