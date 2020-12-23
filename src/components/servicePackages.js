import { Button, FormControl, Grid, Hidden, MenuItem, Select, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import HomeHandyRoundedPaper from './hhRoundedPaper';

const useStyles = makeStyles(theme => ({
  gridRoot: {
    width: '100%',
    margin: '16px 0',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      width: 'auto',
      height: 'auto',
      transform: 'translateZ(0)',
      margin: 0,
      marginLeft: -8
    }
  },
  gridItem: {
    minWidth: 320,
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      margin: 0,
    }
  },
  gridPaper: {
    marginTop: 24, textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      minWidth: 280,
    }
  },
  title: {
    color: theme.palette.primary.main,
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderBottom: `solid 6px ${theme.palette.secondary.shade}`
  },
  bottomLine: {
    width: 100, borderBottom: `solid 3px ${theme.palette.secondary.shade}`
  },
  formControl: {
    minWidth: 320,
  },
}))
export default function ServicePackages ({profile, packageList}) {
  const classes = useStyles()
  const [selectedService, setSelectedService] = React.useState();
  React.useEffect(() => {
    if (!selectedService && profile && profile.services && profile.services.length > 0) {
      setSelectedService(profile.services[0].id)
    }
  }, [selectedService, profile]);
  const handleChange = (event, newValue) => {
    setSelectedService(newValue);
  };
  const packages = packageList.filter(x => x.id === selectedService)
  if (!selectedService) { return <div /> }
  return (
    <React.Fragment>
      <Hidden smDown>
      <Tabs
        value={selectedService}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        centered
      >
        {profile && profile.services.map((service, idx) => {
          return <Tab style={{fontSize: 17}} key={idx} value={service.id} label={service.label} />
        })}
      </Tabs>
      </Hidden>
      <Hidden mdUp>
        <FormControl className={classes.formControl}>
          <Select
            variant="outlined"
            margin="dense"
            value={selectedService}
            onChange={(event) => setSelectedService(event.target.value)}
          >
            {profile && profile.services.map((service, idx) => {
              return <MenuItem key={idx} value={service.id}>{service.label} Services</MenuItem>
            })}
          </Select>
        </FormControl>
      </Hidden>
      <div style={{width: '100%', overflowX: 'auto'}}>
        <Grid container spacing={3} className={classes.gridRoot}>
          {packages && packages.map((item, idx) => (
            <Grid key={idx} className={classes.gridItem} item>
              <HomeHandyRoundedPaper elevation={3} className={classes.gridPaper}>
                <div className={classes.title}>
                  <Typography variant="h4">{item.title}</Typography>
                </div>
                <div className={classes.title}>
                  <Typography variant="h1" style={{fontSize: 60}}>${item.cost} <span style={{fontSize: 14}}>/ {item.period}</span></Typography>
                </div>
                <div style={{padding: 16}}>
                  <Typography style={{whiteSpace: 'pre-wrap'}}>{item.description}</Typography>
                </div>
                <div style={{padding: 16}}>
                  <Button style={{cursor: 'pointer', color: 'blue'}}>Purchase {item.title}</Button>
                </div>
                <div className={classes.bottomLine} />
              </HomeHandyRoundedPaper>              
            </Grid>
          ))}
        </Grid>
      </div>
    </React.Fragment>

  )
}
