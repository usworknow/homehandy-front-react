import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/Close';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeHandyStepper from './hhStepper';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: 0,
        borderBottomRightRadius: theme.spacing(6),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[900],
    },
    backButton: {
        position: 'absolute',
        left: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[900],
    }
}))
function DialogStepper ({steps, stepId, setStepId, open, toggleDialog}) {  
    const classes = useStyles()
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
    const onClose = () => {
        toggleDialog(false)
    }
    return (
        <Dialog
            classes={{
                paper: classes.root
            }}
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            maxWidth="sm"
        >
            <DialogTitle>
                {stepId > 0 && 
                <IconButton title="Back" className={classes.backButton} onClick={() => setStepId(stepId - 1)}>
                    <BackIcon />
                </IconButton>}
                <HomeHandyStepper style={{marginTop: 16}} steps={steps} activeStep={stepId} />
                <IconButton title="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent style={{minWidth: 300}}>
                {steps.find(x => x.id === stepId).component}
            </DialogContent>
        </Dialog>
    );
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
export default connect(mapStateToProps, mapDispatch)(DialogStepper);
