import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import AutoFillSelect from '../../components/autoFillSelect';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyTextField from '../../components/hhTextField';
import { parser } from '../../utils/parser';

export default function AgentCompanyInfo ({company, handleSubmit}) {
  const [errors, setErrors] = React.useState({})
  const [ newCompany, setNewCompany ] = React.useState({})
  const [ selectedState, setSelectedState] = React.useState('')
  const [ selectedCountry, setSelectedCountry] = React.useState('')
  React.useEffect(() => {
    if (company && company.id) {
      setNewCompany(company)
      const states = parser.getStateList()
      const stateItem = states.find(x => x.value === company.state)
      const stateLabel = states && stateItem && stateItem.label
      const countries = parser.getCountryList()
      const countryItem = countries.find(x => x.value === company.country)
      const countryLabel = countries && countryItem && countryItem.label
      setSelectedCountry(company.country ? { value: company.country, label: countryLabel } : '')
      setSelectedState(company.state ? { value: company.state, label: stateLabel  } : '')
    }
  }, [company]);
  const onChange = (event) => {
    event.preventDefault()
    const name = event.target.name
    const value = event.target.value
    setNewCompany(oldValues => ({...oldValues, [name]: value })) 
  }
  const onSubmit = () => {
    const errorList = {}
    // const phone = event.target.phone.value
    // if (!parser.isValidPhone(phone)) {
    //   errorList.phone = 'Phone Number is not valid'
    // }
    const submitCompany = {...newCompany, 
      state: selectedState ? selectedState.value : '', 
      country: selectedCountry ? selectedCountry.value : ''}
    if (!submitCompany.state) {
      errorList.state = true
    }
    setErrors(errorList)
    if (errorList && Object.keys(errorList).length > 0) { return }
    handleSubmit(submitCompany)
  }
  const handleAutoSelectChange = name => item => {
    if (name === 'state') {
      const errorList = {...errors}
      delete errorList.state
      setErrors(errorList)
      setSelectedState(item)
    } else {
      setSelectedCountry(item)
    }
  }
  return (
    <div>
      <div style={{width: '100%', textAlign: 'left'}}>
        <Typography gutterBottom variant="h6">Company Information</Typography>
        <Typography gutterBottom variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu. Pellentesque sed turpis sit amet mi posuere bibendum at sit amet nunc. In vehicula vitae est sit amet pharetra.
        </Typography>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <HomeHandyTextField
              name="name"
              required
              value={newCompany.name || ''}
              onChange={onChange}
              error={Boolean(errors && errors.name)}
              label="Company Name"
              />
        </Grid>
        <Grid item xs={12}>
          <HomeHandyTextField
              name="phone"
              placeholder="02 1234 5678"
              value={newCompany.phone || ''}
              onChange={onChange}
              error={Boolean(errors && errors.phone)}
              label="Company Phone Number"
            />
        </Grid>
        <Grid item xs={7}>
          <HomeHandyTextField
              name="address"
              value={newCompany.address || ''}
              onChange={onChange}
              error={Boolean(errors && errors.address)}
              label="Company Address" 
              />
        </Grid>
        <Grid item xs={5}>
          <HomeHandyTextField
              name="address2"
              value={newCompany.address2 || ''}
              onChange={onChange}
              error={Boolean(errors && errors.address2)}
              label="Address 2" />
        </Grid>
        <Grid item xs={7}>
          <HomeHandyTextField
              name="city"
              required
              value={newCompany.city || ''}
              onChange={onChange}
              error={Boolean(errors && errors.city)}
              label="City" 
              />
        </Grid>
        <Grid item xs={5}>
          <AutoFillSelect
            name='state'
            textFieldProps={{
              id: 'state',
              error: Boolean(errors && errors.state),
              label: <div style={{marginTop: -4}}>State<sup>*</sup></div>,
            }}
            options={parser.getStateList()}
            selectedValue={selectedState}
            handleAutoSelectChange={handleAutoSelectChange} />
        </Grid>
        <Grid item xs={7}>
          <AutoFillSelect
            name='country'
            textFieldProps={{
              id: 'country',
              error: Boolean(errors && errors.country),
              label: 'Country',
            }}
            options={parser.getCountryList()}
            selectedValue={selectedCountry}
            isMulti={false}
            handleAutoSelectChange={handleAutoSelectChange} />
        </Grid>
        <Grid item xs={5}>
          <HomeHandyTextField
              name="postcode"
              required
              value={newCompany.postcode || ''}
              onChange={onChange}
              error={Boolean(errors && errors.postcode)}
              label="Postcode" 
              />
        </Grid>
      </Grid>
      <Typography component="div" color="error">{errors && Object.keys(errors).length > 0 && 
        Object.keys(errors).map(key => 
          <div key={key}>{errors[key]}</div>
        )}
      </Typography>
      <HomeHandyButton onClick={() => onSubmit()} fullWidth style={{margin: '16px 0'}}>
        Next
      </HomeHandyButton>
    </div>
  )
}
