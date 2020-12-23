import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/CheckBoxOutlined';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyCheckbox from '../../components/hhCheckbox';
import HomeHandyTextField from '../../components/hhTextField';

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'left', 
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  bigButton: {
    position: 'relative',
    display: 'block',
    padding: '24px 24px',
    borderBottomRightRadius: theme.spacing(4),
    width: theme.spacing(31),
    textTransform: 'capitalize',
    marginTop: theme.spacing(4),
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& p': {
        color: theme.palette.secondary.main
      }
    }
  },
  serviceLabel: {
    color: theme.palette.primary.main,
    
  },
  gridItem: {
    display: 'flex',
    justifyContent:"center",
    alignItems:"center"
  },
}))
  
function OnboardingServices ({role, property, company, servicesList, handleSubmit}) {
  const classes = useStyles()
  const theme = useTheme()
  const [services, setServices] = React.useState({})
  const [enableOther, setEnableOther] = React.useState(false)
  React.useEffect(() => {
    const result = {}
    if (property && property.services) {
      property.services.forEach(item => {
        result[item.id] = true
      })
    }
    if (company && company.services) {
      company.services.forEach(item => {
        result[item.id] = true
      })
    }
    setServices(result)
  }, [property, company]);
  return (
    <div style={{marginBottom: 24}}>
      <Typography variant="h5" className={classes.title}>
        {role === 'agent' ? 
          <div>What services do you provide {company ? <div> at {company.name}?</div> : '?'}
            <div style={{fontSize: 14, fontWeight: 400}}>Select all that apply, you can always update later if you add services.</div>
          </div> :
          <div>What Types of Service Help Are You Looking For{property ? <div> At {property.address}?</div> : '?'}
            <div style={{fontSize: 14, fontWeight: 400}}>Select all that apply, you can always update later.</div>
          </div>
        }
      </Typography>
      <Grid container spacing={2} style={{marginBottom: 40}}>
        {servicesList && servicesList.map(service => (
          <Grid key={service.id} className={classes.gridItem} item xs={12} sm={6}>
            <Button onClick={() => setServices(oldValues => ({...oldValues, [service.id]: (services[service.id] ? false : true)}))} 
              size="large" variant="contained" className={classes.bigButton} style={{backgroundColor: (services[service.id] && theme.palette.primary.main), color: (services[service.id] && theme.palette.primary.main)}}>
                <img src={require(`../../assets/images/icons/services_${service.id}.svg`)} alt={service.label} />
                <Typography variant="body2" className={classes.serviceLabel} style={{color: (services[service.id] && theme.palette.secondary.main)}}>{service.label}</Typography>
                {services[service.id] && <CheckIcon style={{color: (services[service.id] ? theme.palette.secondary.main : '#FFF'), position: 'absolute', top: 4, right: 4}} />}
            </Button>
          </Grid>
        ))}
      </Grid>
      <div style={{margin: '24px 0'}}>
        <Typography gutterBottom variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu.</Typography>
        <HomeHandyCheckbox
          label={<HomeHandyTextField
            id="email"
            label="Other"
            disabled={!enableOther}
          /> } 
          id='enableOther' 
          name='enableOther'
          onChange={(event, value) => setEnableOther(value)} 
          /> 
      </div>
      <HomeHandyButton disabled={!services || Object.keys(services).length === 0} onClick={() => handleSubmit((role === 'agent' ? company.id : property.id), services)} fullWidth type="submit">
        {role === 'agent' ? "Next" : 'Finish'}
      </HomeHandyButton>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    servicesList: state.services.services
  }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(OnboardingServices)
