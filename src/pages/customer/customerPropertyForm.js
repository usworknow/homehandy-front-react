import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import AutoFillSelect from '../../components/autoFillSelect';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyTextField from '../../components/hhTextField';
import { parser } from '../../utils/parser';

export default function CustomerPropertyForm ({handleSubmit}) {
  const [errors, setErrors] = React.useState({})
  const [selectedState, setSelectedState] = React.useState('')
  const [country, setCountry] = React.useState('')
  const onFormSubmit = (event) => {
    event.preventDefault()
    const errorList = {}
    if (!selectedState || !selectedState.value) {
      errorList.selectedState = true
    }
    setErrors(errorList)
    if (errorList && Object.keys(errorList).length > 0) { return }
    const userData = {
      address: event.target.address.value,
      address2: event.target.address2.value,
      city: event.target.city.value,
      state: selectedState && selectedState.value ? selectedState.value : '',
      country: country && country.value ? country.value : '',
      postcode: event.target.postcode.value,
      property_type: event.target.property_type.value,
      property_size: event.target.approx_size.value,
      property_beds: event.target.bedrooms.value,
      property_baths: event.target.bathrooms.value,
    }
    handleSubmit(userData)
  }
  const handleAutoSelectChange = name => value => {
    if (name === 'selectedState') {
      const errorList = {...errors}
      delete errorList.selectedState
      setErrors(errorList)
      setSelectedState(value)
    } else {
      setCountry(value)
    }
  }
  return (
    <form onSubmit={onFormSubmit}>
      <div style={{width: '100%', textAlign: 'left'}}>
        <Typography gutterBottom variant="h6">Property Information</Typography>
        <Typography gutterBottom variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu. Pellentesque sed turpis sit amet mi posuere bibendum at sit amet nunc. In vehicula vitae est sit amet pharetra.
        </Typography>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={7}>
          <HomeHandyTextField
              id="property_type"
              error={Boolean(errors && errors.property_type)}
              label="Property Type" />
        </Grid>
        <Grid item xs={12} sm={5}>
          <HomeHandyTextField
              id="approx_size"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 50000 } }}
              error={Boolean(errors && errors.approx_size)}
              label="Approx. Size" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <HomeHandyTextField
              id="bedrooms"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 20 } }}
              error={Boolean(errors && errors.bedrooms)}
              label="No. of Bedrooms" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <HomeHandyTextField
              id="bathrooms"
              type="number"
              InputProps={{ inputProps: { min: 0, max: 20, step: 0.5 } }}
              error={Boolean(errors && errors.bathrooms)}
              label="No. of Bathrooms" />
        </Grid>
        <Grid item xs={7}>
          <HomeHandyTextField
              id="address"
              required
              error={Boolean(errors && errors.address)}
              label="Street Address" 
              />
        </Grid>
        <Grid item xs={5}>
          <HomeHandyTextField
              id="address2"
              error={Boolean(errors && errors.address2)}
              label="Street Address 2" />
        </Grid>
        <Grid item xs={7}>
          <HomeHandyTextField
              id="city"
              required
              error={Boolean(errors && errors.city)}
              label="City" 
              />
        </Grid>
        <Grid item xs={5}>
          <AutoFillSelect
            name='selectedState'
            textFieldProps={{
              id: 'selectedState',
              error: Boolean(errors && errors.selectedState),
              label: <div style={{marginTop: -4}}>State<sup>*</sup></div>,
            }}
            options={parser.getStateList()}
            selectedValue={selectedState}
            handleAutoSelectChange={handleAutoSelectChange} />
          {/* <HomeHandyTextField
              id="province"
               
              error={Boolean(errors && errors.province)}
              label="State" 
              /> */}
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
            selectedValue={country}
            isMulti={false}
            handleAutoSelectChange={handleAutoSelectChange} />
        </Grid>
        <Grid item xs={5}>
          <HomeHandyTextField
              id="postcode"
              required
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
      <HomeHandyButton fullWidth type="submit" style={{margin: '16px 0'}}>
        Next
      </HomeHandyButton>
    </form>
  )
}
