import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
const useStyles = makeStyles(theme => ({
    textField: {
        fontSize: '16px',
        width: '100%',
        borderColor: theme.palette.grayscale.tint2,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        '&:focus, &:focus-within, &:active, &:hover': {
            borderColor: theme.palette.primary.main
        }
    },
    override: {
        borderColor: theme.palette.primary.main
    },
    // notchedOutline: {
        //     borderRadius: 2,
        //     borderColor: 'red'
        // },
        // hideOutline: {
            //     borderWidth: 0,
            //     '&:focus, &:focus-within, &:active, &:hover': {
                //         borderWidth: 'inherit'
                //     }
                // }
        
}))
const HomeHandyTextField = ({ ...other }) => {
    const classes = useStyles()
    return (
        <TextField
            className={classes.textField}
            variant="outlined"
            margin="dense"
            {...other}
        />
    )
}

export default HomeHandyTextField
