import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
const useStyles = makeStyles(theme => ({
    buttonStyle: {
        padding: '4px 32px',
        alignSelf: 'center',
        fontSize: '16px',
        backgroundColor: theme.palette.primary.main,
        color: '#FFF',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        '&:disabled': {
            color: theme.palette.grayscale.main,
            backgroundColor: theme.palette.grayscale.tint1,
        }
    }
}))

const HomeHandyButton = ({children, ...other }) => {
    const classes = useStyles()
    return (
        <Button
            variant="outlined"
            size="small"
            color="primary"
            classes={{
                root: classes.buttonStyle,
                disabled: classes.disabled
            }}
            {...other}
        >
            {children}
        </Button>
    )
}

export default HomeHandyButton
