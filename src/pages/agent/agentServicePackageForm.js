import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, IconButton, InputAdornment, MenuItem, Typography } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyCheckbox from '../../components/hhCheckbox';
import HomeHandyTextField from '../../components/hhTextField';
import { fontList } from '../../utils/fontList';
import { parser } from '../../utils/parser';

export default function AgentServicePackageForm ({company, servicePackage, handleSubmit, handleSkip}) {
  const [errors, setErrors] = React.useState({})
  const [ inclusionCount, setInclusionCount ] = React.useState(2)
  const [ newPackage, setNewPackage ] = React.useState({})
  const [enableOther, setEnableOther] = React.useState(false)
  React.useEffect(() => {
    if (servicePackage) {
      setNewPackage({...servicePackage})
    }
  }, [servicePackage]);
  const onChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    setNewPackage(oldValues => ({...oldValues, [name]: value }))
    const errorList = {...errors}
    delete errorList[name]
    setErrors(errorList)
  }
  const onNumericChange = (event) => {
    if (event.target.value && !parser.isNumeric(event.target.value)) { return }
    const name = event.target.name
    const value = event.target.value
    setNewPackage(oldValues => ({...oldValues, [name]: Number(value) }))
  }
  const onInclusionChange = (index, field, value) => {
    const newInclusions = newPackage.inclusions || []
    let inclusion = {}
    if (newInclusions[index]) {
      inclusion = {...newInclusions[index], [field]: value}      
      newInclusions[index] = inclusion
    } else {
      inclusion[field] = value
      newInclusions.push(inclusion)
    }
    setNewPackage(oldValues => ({...oldValues, inclusions: newInclusions}))
  }
  const onSubmit = () => {
    const errorList = {}
    if (!newPackage.name) { errorList.name = 'Name required'}
    if (!newPackage.service_id) { errorList.service_id = 'Package Type required'}
    if (!newPackage.price) { errorList.price = 'Price required'}
    if (!newPackage.billing_cycle) { errorList.billing_cycle = 'Billing Cycle required'}
    setErrors(errorList)
    if (errorList && Object.keys(errorList).length > 0) { return }
    handleSubmit(company.id, newPackage)
  }
  return (
    <div>
      <div style={{width: '100%', textAlign: 'left'}}>
        <Typography gutterBottom variant="h6">Create a Service Package</Typography>
        <Typography gutterBottom variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu. Pellentesque sed turpis sit amet mi posuere bibendum at sit amet nunc. In vehicula vitae est sit amet pharetra.
        </Typography>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <HomeHandyTextField
            name="icon"
            label="Icon"
            select
            value={newPackage ? newPackage.icon || '' : ''}
            onChange={onChange}>
            {fontList.map((item, idx) => (
              <MenuItem key={idx} value={item[0] + '-' + item[1]} style={{justifyContent: 'center'}}>
                <FontAwesomeIcon icon={item} size="lg" />
              </MenuItem>
            ))}
          </HomeHandyTextField>
        </Grid>
        <Grid item xs={9}>
          <HomeHandyTextField
              name="name"
              required
              value={newPackage.name || ''}
              error={Boolean(errors && errors.name)}
              onChange={onChange}
              label="Package Name"
              />
        </Grid>
        <Grid item xs={12} sm={6}>
          <HomeHandyTextField
            name="service_id"
            label="Package Type"
            select
            required
            error={Boolean(errors && errors.service_id)}
            value={newPackage.service_id || ''}
            onChange={onChange}
          >
            {company && company.services && company.services.map((service, idx) => (
              <MenuItem key={idx} value={service.id}>{service.label}</MenuItem>
            ))}
          </HomeHandyTextField>
        </Grid>
        <Grid item xs={'auto'} sm={1}></Grid>
        <Grid item xs={5}>
          <HomeHandyCheckbox
            label={<HomeHandyTextField
              id="other_package_type"
              label="Other"
              disabled={!enableOther}
            /> } 
            id='enableOtherType' 
            name='enableOtherType'
            onChange={(event, value) => setEnableOther(value)} 
            /> 
        </Grid>
        <Grid item xs={12}>
          <HomeHandyTextField
            name="description"
            label="Package Description"
            value={newPackage.description || ''}
            onChange={onChange}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>

      
      <div style={{marginTop: 16}}>
        <Typography variant="subtitle1" gutterBottom>Add Inclusions</Typography>
        <Grid container spacing={1} style={{alignItems: 'center'}}>
          {[...Array(inclusionCount)].map((x, i) => {
            const inclusion = newPackage.inclusions && newPackage.inclusions[i] ? newPackage.inclusions[i] : {}
            return (<React.Fragment key={i}>
              <Grid item xs={6} sm={4}>
                <HomeHandyTextField
                  label="Select Inclusion"
                  name="id"
                  value={inclusion.id || ''} 
                  onChange={(e) => {e.preventDefault(); onInclusionChange(i, 'id', e.target.value)}} 
                  select 
                  style={{marginRight: 16}}>
                  <MenuItem value={'A'}>A</MenuItem>
                  <MenuItem value={'B'}>B</MenuItem>
                </HomeHandyTextField>
              </Grid>
              <Grid item xs={6} sm={4}>
                <HomeHandyTextField 
                  label="Select Frequency" 
                  name="frequency"
                  value={inclusion.frequency || ''} 
                  onChange={(e) => {e.preventDefault(); onInclusionChange(i, 'frequency', e.target.value)}} 
                  select 
                  style={{}}>
                  <MenuItem value={'C'}>C</MenuItem>
                  <MenuItem value={'D'}>D</MenuItem>
                </HomeHandyTextField>
              </Grid>
              <Grid item xs={'auto'} sm={4}>
                <IconButton onClick={() => setInclusionCount(old => old - 1)}>
                  <CancelIcon />
                </IconButton>
              </Grid>
            </React.Fragment>)
          })}
          <Grid item xs={6}>
            <HomeHandyButton onClick={() => setInclusionCount(old => old + 1)} style={{padding: '4px 10px', marginTop: 4}}>+ Add inclusion</HomeHandyButton>
          </Grid>
        </Grid>
      </div>

      <div style={{margin: '24px 0'}}>
        <Typography gutterBottom variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu.</Typography>
        <HomeHandyCheckbox
          label={<HomeHandyTextField
            id="other_inclusion"
            label="Other"
            disabled={!enableOther}
          /> } 
          id='enableOtherInclusion' 
          name='enableOtherInclusion'
          onChange={(event, value) => setEnableOther(value)} 
          /> 
      </div>

      <div style={{marginTop: 16}}>
        <Typography variant="subtitle1" gutterBottom>Set Price</Typography>
        <Grid container spacing={1} style={{alignItems: 'center'}}>
          <Grid item xs={6} sm={4}>
            <HomeHandyTextField
              name="price"
              label="Price"
              value={newPackage.price || ''}
              onChange={onNumericChange}
              error={Boolean(errors && errors.price)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <HomeHandyTextField
              name="billing_cycle"
              label="Billing Cycle"
              required
              value={newPackage.billing_cycle || ''}
              error={Boolean(errors && errors.billing_cycle)}
              onChange={onChange}
              select
            >
                <MenuItem value={'monthly'}>Monthly</MenuItem>
                <MenuItem value={'yearly'}>Yearly</MenuItem>
            </HomeHandyTextField>
          </Grid>
        </Grid>
      </div>
      <Typography component="div" color="error">{errors && Object.keys(errors).length > 0 && 
        Object.keys(errors).map(key => 
          <div key={key}>{errors[key]}</div>
        )}
      </Typography>
      <HomeHandyButton fullWidth onClick={() => onSubmit()} style={{margin: '16px 0'}}>
        Next
      </HomeHandyButton>
      {company && company.service_packages && company.service_packages.length > 0 && 
        <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: 16}}>
          <Typography style={{fontSize: 10, margin: 0, padding: 0, cursor: 'pointer', color: 'blue'}} onClick={() => handleSkip()}>
            Skip
          </Typography>
        </div>
      }
    </div>
  )
}
