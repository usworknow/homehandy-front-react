import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary: { shade: '#213D70', main: '#36528C', tint1: '#5E75A3', tint2: '#AFBAD1' },
        secondary: { shade: '#DCAE00', main: '#F7CA11', tint1: '#F7E59F', tint2: '#FFF4C5' },
        grayscale: { shade: '#242424', main: '#A0A0A0', tint1: '#E0E0E0', tint2: '#F0F0F0' },
    },
    sizes: {
        drawerWidth: 180,
        toolbarHeight: 84,
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none'
            }
        },
        MuiTab: {
            root: {
                textTransform: 'none'
            }
        }
    },
    //     //     contained: {
    //     //         minWidth: 88,
    //     //         padding: '3px 16px',
    //     //         backgroundColor: '#2b4061',
    //     //         color: '#FFF',
    //     //         fontWeight: 500,
    //     //         borderRadius: 30,
    //     //         '&:hover': {
    //     //             backgroundColor: '#cd9a37',
    //     //         }
    //     //     },
    //     //         padding: '3px 12px',
    //     //         borderRadius: 30
    //     //     },
    //     //     textSecondary: {
    //     //         backgroundColor: '#11274B',
    //     //         color: '#FFF',
    //     //         '&:hover': {
    //     //             border: 'solid 1px #11274B',
    //     //             color: '#11274B',
    //     //         }
    //     //     }
    //     // },
    // },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif'
        ].join(','),
        h1: {
            color: 'inherit',
            fontSize: '40px',
            fontWeight: '600',
            fontFamily: 'Roboto',
            letterSpacing: '0.4px',
            lineHeight: '44px'
        },
        h2: {
            color: 'inherit',
            fontSize: '35px',
            fontWeight: '600',
            fontFamily: 'Roboto',
            letterSpacing: '0.35px',
            lineHeight: '38px'
        },
        h3: {
            color: 'inherit',
            fontSize: '30px',
            fontWeight: '600',
            fontFamily: 'Roboto',
            letterSpacing: '0.3px',
            lineHeight: '32px'
        },
        h4: {
            color: 'inherit',
            fontSize: '25px',
            fontWeight: '600',
            fontFamily: 'Roboto',
            letterSpacing: '0.17px',
            lineHeight: '28px'
        },
        h5: {
            color: 'inherit',
            fontSize: '20px',
            fontWeight: '600',
            fontFamily: 'Roboto',
            letterSpacing: '0.2px',
            lineHeight: '24px'
        },
        h6: {
            color: 'inherit',
            fontSize: '18px',
            fontWeight: '600',
            fontFamily: 'Roboto',
            letterSpacing: '0.18px',
            lineHeight: '22px'
        },
        body1: {
            color: 'inherit',
            fontSize: '16px',
            fontWeight: 'normal',
            fontFamily: 'Roboto',
            letterSpacing: '0.18px',
            lineHeight: '22px'
        },
        body2: {
            color: 'inherit',
            fontSize: '12px',
            fontWeight: 'normal',
            fontFamily: 'Roboto',
            letterSpacing: '0.14px',
            lineHeight: '18px'
        },
        subtitle1: {
            color: 'inherit',
            fontSize: '17px',
            fontWeight: 'normal',
            fontFamily: 'Roboto',
            letterSpacing: '0.51px',
            lineHeight: '20px'
        },
        // subtitle2: {
        //     color: 'inherit',
        //     fontSize: '14px',
        //     letterSpacing: '0.1px',
        //     fontFamily: 'Roboto',
        //     fontWeight: '400'
        // },
        // button: {
        //     color: 'inherit',
        //     fontSize: '15.64px',
        //     letterSpacing: '1.25px',
        //     fontFamily: 'Roboto',
        //     fontWeight: '300',
        //     textTransform: 'none'
        // },
        // caption: {
        //     color: 'inherit',
        //     fontSize: '12px',
        //     fontFamily: 'Roboto',
        //     fontWeight: '300',
        //     textTransform: 'none'
        // },
        // overline: {
        //     color: 'inherit',
        //     fontSize: '12px',
        //     letterSpacing: '2px',
        //     fontFamily: 'Roboto',
        //     fontWeight: '400'
        // }
    }
});
