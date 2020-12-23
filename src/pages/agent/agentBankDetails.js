import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import React from 'react';
import AutoFillSelect from '../../components/autoFillSelect';
import HomeHandyButton from '../../components/hhButton';
import HomeHandyTextField from '../../components/hhTextField';
import { parser } from '../../utils/parser';
const useStyles = makeStyles(theme => ({
  dropzone: {
    padding: theme.spacing(1, 15),
    margin: theme.spacing(0.5, 0),
    minHeight: 0,
  }
}))
export default function AgentBankDetails ({handleSubmit}) {
  const [errors, setErrors] = React.useState({})
  const [selectedState, setSelectedState] = React.useState('')
  const [country, setCountry] = React.useState('')
  const classes = useStyles()
  const onFormSubmit = (event) => {
    event.preventDefault()
    const errorList = {}
    // const phone = event.target.phone.value
    // if (!parser.isValidPhone(phone)) {
    //   errorList.phone = 'Phone Number is not valid'
    // }

    setErrors(errorList)
    if (errorList && Object.keys(errorList).length > 0) { return }
    const userData = {
      // company_name: event.target.company_name.value,
      // phone: event.target.phone.value,
      // address: event.target.address.value,
      // address2: event.target.address2.value,
      // city: event.target.city.value,
      // state: province && province.value ? province.value : '',
      // country: country && country.value ? country.value : '',
      // postcode: event.target.postcode.value,
    }
    handleSubmit(userData)
  }
  const handleAutoSelectChange = name => value => {
    if (name === 'selectedState') {
      setSelectedState(value)
    } else {
      setCountry(value)
    }
  }
  const uploadFile = (files) => {
    console.log('file', files[0])
    // handleUploadFile(signedUrl, file[0])
  }
  return (
    <form onSubmit={onFormSubmit}>
      <div style={{width: '100%', textAlign: 'left', marginBottom: 16}}>
        <Typography gutterBottom variant="h6">Banking Information</Typography>
        <Typography gutterBottom variant="body2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu. Pellentesque sed turpis sit amet mi posuere bibendum at sit amet nunc. In vehicula vitae est sit amet pharetra.
        </Typography>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <HomeHandyTextField
              id="billing_name"
              error={Boolean(errors && errors.billing_name)}
              label="Account Holder Name"
              />
        </Grid>
        <Grid item xs={12}>
          <HomeHandyTextField
              id="bank_name"
              error={Boolean(errors && errors.bank_name)}
              label="Bank Name"
            />
        </Grid>
        <Grid item xs={7}>
          <HomeHandyTextField
              id="bank_address"
              error={Boolean(errors && errors.bank_address)}
              label="Bank Address" 
              />
        </Grid>
        <Grid item xs={5}>
          <HomeHandyTextField
              id="bank_address2"
              error={Boolean(errors && errors.bank_address2)}
              label="Address 2" />
        </Grid>
        <Grid item xs={7}>
          <HomeHandyTextField
              id="bank_city"
              error={Boolean(errors && errors.bank_city)}
              label="City" 
              />
        </Grid>
        <Grid item xs={5}>
          <AutoFillSelect
            name='selectedState'
            textFieldProps={{
              id: 'selectedState',
              error: Boolean(errors && errors.selectedState),
              label: 'State',
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
            selectedValue={country}
            isMulti={false}
            handleAutoSelectChange={handleAutoSelectChange} />
        </Grid>
        <Grid item xs={5}>
          <HomeHandyTextField
              id="postcode"
              error={Boolean(errors && errors.postcode)}
              label="Postcode" 
              />
        </Grid>
        <Grid item xs={6}>
          <HomeHandyTextField
              id="routing_number"
              error={Boolean(errors && errors.routing_number)}
              label="Routing Number" 
              />
        </Grid>
        <Grid item xs={6}>
          <HomeHandyTextField
              id="account_number"
              error={Boolean(errors && errors.account_number)}
              label="Account Number" />
        </Grid>
      </Grid>
      <div style={{marginTop: 16}}>
        <Typography variant="subtitle1">Document Upload</Typography>
        <DropzoneArea 
          onChange={(files) => uploadFile(files)}
          dropzoneText='Drag and drop a PDF file or click here to select a file'
          filesLimit={1}
          acceptedFiles={['application/pdf']}
          maxFileSize={15000000}
          dropzoneClass={classes.dropzone}
          />
        </div>
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
