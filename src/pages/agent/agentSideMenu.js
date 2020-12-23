import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ReportIcon from '@material-ui/icons/Report';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import cls from 'classnames';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { paths } from '../../utils/paths';

const useStyles = makeStyles(theme => ({
    root:  {
        marginTop: theme.sizes.toolbarHeight,
        paddingBottom: theme.spacing(15)
    },
    selectedListItem: {
        backgroundColor: '#FFF !important'
    },
    linkItemButton: {
        '&:hover': {
            backgroundColor: '#FFF !important',
            '& $listItemIcon': {
                color: theme.palette.secondary.main,
            },
            '& $listItemText': {
                color: theme.palette.primary.main,
            }
        }
    },
    listItemIcon: {
        minWidth: theme.spacing(3),
        marginRight: theme.spacing(2),
        color: theme.palette.grayscale.main,
        '&.active': {
            color: theme.palette.secondary.main,
        }
    },
    listItemText: {
        color: theme.palette.grayscale.main,
        fontSize: 12,
        '&.active': {
            color: theme.palette.primary.main,
        }
    }   
}))
const linkList = [
    { id: 'dashboard', url: paths.root, icon: <DashboardIcon id='dicon' />, text: 'Dashboard' },
    // { id: 'messaging', url: paths.messaging, icon: <ChatIcon id='micon' />, text: 'Messaging' },
    { id: 'account', icon: <SupervisorAccountIcon id='dicon' />, text: 'My Account' },
    { id: 'help', icon: <ReportIcon id='dicon' />, text: 'Help & Support' },
  ]
const AgentSideMenu = ({ history }) => {
    const [ selectedListItem, setSelectedListItem ] = React.useState(linkList[0].id)
    const classes = useStyles()
    const listItemClick = (linkItem) => {
        if (linkItem.url) {
            setSelectedListItem(linkItem.id)
            history.push(linkItem.url)
        }
    }
    return (
        <List className={classes.root}>
            {linkList.map(linkItem => (
            <ListItem 
                key={linkItem.id} 
                button
                selected={selectedListItem === linkItem.id} 
                onClick={() => listItemClick(linkItem)} 
                classes={{
                    selected: classes.selectedListItem,
                    button: classes.linkItemButton
                }}
            >
                <ListItemIcon
                    classes={{
                        root: cls(classes.listItemIcon, {'active': selectedListItem === linkItem.id})
                    }}
                >{linkItem.icon}</ListItemIcon>
                <ListItemText 
                    primary={linkItem.text}
                    classes={{
                        primary: cls(classes.listItemText, {'active': selectedListItem === linkItem.id})
                    }}
                />
            </ListItem>
            ))}
        </List>
    )
}

export default withRouter(AgentSideMenu)
