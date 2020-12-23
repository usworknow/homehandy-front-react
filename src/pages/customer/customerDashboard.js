import { Button, Grid, InputAdornment, MenuItem, Select, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChipList from '../../components/chipList';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyContentContainer from '../../components/hhContentContainer';
import HomeHandyRoundedPaper from '../../components/hhRoundedPaper';
import HomeHandyTextField from '../../components/hhTextField';
import CustomerOnboardingDialog from './customerOnboardingDialog';


const useStyles = makeStyles(theme => ({
  flexBar: {
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  container: {
    width: '100%',
    maxWidth: 962,
    margin: 'auto',
    padding: '16px',
  },
}))
function CustomerDashboard({ services, properties }) {
  const classes = useStyles()
  const theme = useTheme()
  const [ selectedService, setSelectedService ] = React.useState()
  const [ availableServices, setAvailableServices ] = React.useState([])
  const [ showCustomerOnboarding, setShowCustomerOnboarding ] = React.useState(false)
  React.useEffect(() => {
    setAvailableServices(services)
    if (!selectedService) { 
      setSelectedService(services[0])
    }
    window.scroll(0,0)
  }, [services, selectedService]);
  React.useEffect(() => {
    window.scroll(0,0)
  }, [properties]);
  const [chipData, setChipData] = React.useState([
    { id: 0, value: 'repair', label: 'Minor Home Repairs' },
    { id: 1, value: 'gutters', label: 'Gutters' },
    { id: 2, value: 'electricity', label: 'Electricity' },
    { id: 3, value: 'furniture', label: 'Furniture Assembly' },
  ]);

  const handleDelete = (chipToDelete) => {
    setChipData((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };
  return (
    <HomeHandyContentContainer fullWidth>
      <CustomerOnboardingDialog open={showCustomerOnboarding} toggleDialog={setShowCustomerOnboarding} />
      {(!properties || properties.length === 0) && <div style={{backgroundColor: '#e0e0e0', padding: 4}}>
        <div className={classnames(classes.container)} style={{padding: 0}}>
          <div style={{display: 'flex', justifyContent: 'flex-start', borderRadius: 24, backgroundColor: theme.palette.primary.main, padding: '8px 16px', alignItems: 'center'}}>
            <Button onClick={() => setShowCustomerOnboarding(true)} style={{background: theme.palette.primary.main, color: theme.palette.secondary.main}}>
              Click to complete your profile:&nbsp;&nbsp;<strong>75% complete</strong></Button>
          </div>
        </div>
      </div>}
      <Grid container spacing={3} className={classnames(classes.container)} style={{paddingLeft: 4}}>
        <Grid item xs={12} md={5} style={{alignSelf: 'center'}}>
          <Typography variant="h6" style={{marginRight: 16, color: theme.palette.primary.main}}>Results for {selectedService && (selectedService.label || '')} Services 
            {properties && properties[0] ? <div>near {properties[0].address}</div> : <div>in Your Area</div>}</Typography>
        </Grid>
        <Grid item xs={6} md={4}>
            <Select
              variant="outlined"
              margin="dense"
              style={{background: '#fff', width: '100%'}}
              value={selectedService ? selectedService.id || '' : ''}
              onChange={(event) => setSelectedService(availableServices.find(x => x.id === event.target.value))}
            >
              {availableServices && availableServices.map((service, idx) => {
                return <MenuItem key={idx} value={service.id}>{service.label}</MenuItem>
              })}
            </Select>
        </Grid>
        <Grid item xs={6} md={3}>
          <HomeHandyTextField
            id="postcode"
            label="Postcode or Suburb"
            InputProps={{
              endAdornment: (<InputAdornment position="end"><SearchIcon /></InputAdornment>),
            }}
            style={{marginTop: 0, marginBottom: 4}}
          />
        </Grid>
      </Grid>
      <div style={{backgroundColor: 'rgb(235,245,255)'}}>
        <div className={classnames(classes.flexBar, classes.container)}>
          <Typography style={{marginRight: 32}}>What do you need help with? (Filters)</Typography>
          <ChipList chipData={chipData} handleDelete={handleDelete} />
        </div>
      </div>
      <div className={classes.container} style={{marginTop: 24}}>
        <Grid container spacing={4}>
          {[0,1,2,3,4,5,6,7,8,9,10,11].map(item => (
          <Grid key={item} item xs={12} sm={6} md={4}>
            <HomeHandyRoundedPaper style={{alignItems: 'flex-start', marginBottom: 24}}>
              <Typography variant="h4" gutterBottom style={{color: theme.palette.primary.main}}>XYZ Service Agents</Typography>
              <div>
                <img src={require('../../assets/images/temp_profile.png')} alt="Profile" />
              </div>
              <div style={{margin: '8px 0 16px'}}>
                Company Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu. Pellentesque sed turpis sit amet
              </div>
              <HomeHandyButton>View Profile</HomeHandyButton>
            </HomeHandyRoundedPaper>
          </Grid>
          ))}
        </Grid>
      </div>
    </HomeHandyContentContainer>
  )
}

const mapStateToProps = (state) => {
  return { 
    properties: state.properties.propertyList,
    services: state.services.services,
  }
}
export default withRouter(connect(mapStateToProps)(CustomerDashboard))
