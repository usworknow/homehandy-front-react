import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2, 2.5, 3),
        borderRadius: 0,
        borderBottomRightRadius: theme.spacing(6),
    },
}))

export default function HomeHandyRoundedPaper ({ children, ...other }) {
    const classes = useStyles()
    return (
        <Paper classes={{root: classes.root }} {...other}>
            {children}
        </Paper>
    )
}

