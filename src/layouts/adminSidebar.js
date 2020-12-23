import { Drawer, List, ListItemText, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: theme.widths.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.widths.drawerWidth,
    backgroundColor: theme.palette.primary.extraLight,
    zIndex: 2,
    position: 'relative',
  },
  // toolbar: {
  //   ...theme.mixins.toolbar,
  //   // [theme.breakpoints.down("sm")]: {
  //   //   display: 'none',
  //   // }
  // },
  sidebarList: {
    marginTop: 40
  },
  menuItem: {
    paddingLeft: theme.spacing(2.5)
  },
  itemText: {
    textTransform: 'none',
    color: theme.palette.primary.dark,
  },
  selected: {
    backgroundColor: theme.palette.primary.light + ' !important',
    borderLeft: `solid 2px ${theme.palette.primary.dark}`,
    '& > div > span': {
      marginLeft: '-2px',
      fontWeight: '500'
    }
  }
})
const linkList = [
  { path: '/bar', label: 'Companies' },
  { path: '/foo', label: 'Users' },
]

const Sidebar = ({ location, classes }) => {
    return (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left">
          {/* <div className={classes.toolbar} /> */}
          <List className={classes.sidebarList}>
            {linkList.map((item, index) => (
              <Link to={item.path} style={{ textDecoration: 'none' }} key={index}>
                <MenuItem selected={location.pathname.indexOf(item.path) > -1} className={classes.menuItem} classes={{ selected: classes.selected }}>
                  <ListItemText primaryTypographyProps={{className: classes.itemText, variant: 'subtitle2'}} primary={item.label} />
                </MenuItem>
              </Link>
            ))}
          </List>
        </Drawer>
    )
}

export default withRouter(withStyles(styles)(Sidebar))
