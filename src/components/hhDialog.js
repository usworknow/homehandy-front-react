import { Dialog, DialogContent } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

export default function HomeHandyDialog ({open, toggleDialog, children}) {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Dialog
            open={open}
            onClose={() => toggleDialog(false)}
            fullScreen={fullScreen}
            fullWidth
            maxWidth="lg"
        >
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
}
  