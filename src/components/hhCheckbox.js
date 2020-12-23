import { Checkbox, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = theme => ({
    checkbox: {
        color: theme.palette.grayscale.tint1,
        marginTop: 0,
    },
    active: {
        color: theme.palette.secondary.main
    }
})

const HomeHandyCheckbox = ({ classes, label, ...other }) => {
    return (
        <FormControlLabel
            control={<Checkbox
                classes={{
                    root: classes.checkbox,
                    checked: classes.active
                }}
                {...other} 
            />}
            label={label} />
    )
}

export default withStyles(styles)(HomeHandyCheckbox)
