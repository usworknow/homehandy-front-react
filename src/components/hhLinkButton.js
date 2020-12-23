import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
const styles = theme => ({
    buttonClass: {
        margin: 0,
        padding: '4px 16px 8px',
        borderRadius: 0,
        color: '#FFF',
        '&:hover': {
            backgroundColor: 'inherit',
            borderBottom: `solid 3px ${theme.palette.secondary.main}`,
        }
    },
})

const HomeHandyLinkButton = ({ classes, children, ...other }) => (
    <Button className={classes.buttonClass} {...other}>
        <Typography variant="subtitle1">
            {children}
        </Typography>
    </Button>
)

export default withStyles(styles)(HomeHandyLinkButton)
