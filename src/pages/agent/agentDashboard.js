import { Button, Drawer, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyContentContainer from '../../components/hhContentContainer';
import AgentExtendedOnboarding from './agentExtendedOnboarding';
import AgentSideMenu from './agentSideMenu';
import Appointments from './appointments';
import Sandbox from './sandbox';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: theme.sizes.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.sizes.drawerWidth,
  },
  // necessary for content to be below app bar
  dashboardContainerTabs: {
    borderRadius: 0,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main
  },
  primaryColor: {
    color: theme.palette.primary.main
  }
}));

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    height: 3,
    backgroundColor: 'transparent',
    '& > div': {
      maxWidth: 64,
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(12),
    padding: theme.spacing(0, 5),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />)

const steps = [
  { id: 'appointments', title: 'Upcoming Appointments', component: <Appointments /> },
  { id: 'subscriptions', title: 'Manage Subscriptions', component: <Sandbox><Typography>Subscriptions</Typography></Sandbox> },
  { id: 'customers', title: 'Customer List', component: <Sandbox><Typography>Customer List</Typography></Sandbox> }
  // { id: 'referral', title: 'Refer A Friend', component: <Sandbox><Typography>Refer a Friend</Typography></Sandbox> }
]

function AgentDashboard({ history }) {
  const classes = useStyles()
  const theme = useTheme()
  const [currentStep, setCurrentStep] = React.useState(steps[0].id)
  const [ showAgentOnboarding, setShowAgentOnboarding ] = React.useState(false)
  React.useEffect(() => {
      window.scroll(0, 0)
  }, [history])
  function handleChange(event, newValue) {
    setCurrentStep(newValue);
  }

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left">
        <AgentSideMenu />
      </Drawer>
      <HomeHandyContentContainer fullWidth style={{paddingLeft: theme.sizes.drawerWidth}}>
        <div style={{backgroundColor: '#FFF'}}>
          <AgentExtendedOnboarding open={showAgentOnboarding} toggleDialog={setShowAgentOnboarding} />
          <Paper className={classes.dashboardContainerTabs}>
            <StyledTabs 
              value={currentStep}
              onChange={handleChange}
              indicatorColor="secondary"
            >
              {steps && steps.map((item, idx) => {
                return (
                  <StyledTab key={idx} value={item.id} label={item.title} />
                )
              })}
            </StyledTabs>
          </Paper>
          <div style={{}}>
            <div style={{padding: 0, background: '#e0e0e0'}}>
              <div style={{display: 'flex', justifyContent: 'flex-start', backgroundColor: theme.palette.primary.main, alignItems: 'center', borderBottomRightRadius: 24, borderTopRightRadius: 24, width: '75%'}}>
                <Button onClick={() => setShowAgentOnboarding(true)} style={{background: theme.palette.primary.main, color: theme.palette.secondary.main, padding: '8px 40px', }}>
                  Click to complete your profile:&nbsp;&nbsp;<strong>75% complete</strong></Button>
              </div>
            </div>
          </div>
          <div style={{backgroundColor: '#FFF'}}>
            {steps && steps.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  {currentStep === item.id && item.component}
                </React.Fragment>
              )
            })}
          </div>
          <div style={{padding: 32, backgroundColor: '#EFF0F1', display: 'flex'}}>
            <div style={{display: 'flex'}}>
              <img src={require('../../assets/images/icons/agent-cta.svg')} alt="Agent"  style={{marginRight: 24}} />
              <div style={{maxWidth: '65%'}}>
                <Typography variant="h6" className={classes.primaryColor} gutterBottom>Find Customers CTA Headline</Typography>
                <Typography variant="subtitle2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo.</Typography>
              </div>
            </div>
            <div style={{flexGrow: 1}} />
            <HomeHandyButton style={{padding: '4px 40px', whiteSpace: 'nowrap'}}>Learn More</HomeHandyButton>
          </div>
        </div>
      </HomeHandyContentContainer>
    </div>
  )
}

export default AgentDashboard
