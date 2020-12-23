import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import HomeHandyButton from '../../components/hhButton';
import ServicePackage from '../../components/servicePackage';

export default function AgentReview ({company, editPackage, addPackage, handleSubmit}) {
  const servicePackage = company && company.service_packages ? company.service_packages[company.service_packages.length - 1] : {}
  return (
    <div>
      <div style={{width: '100%', textAlign: 'left'}}>
        <Typography gutterBottom variant="h6">Congrats You're Almost Done</Typography>
        <Typography gutterBottom variant="body2">
          Review the package details below to make sure everything looks good. 
        </Typography>
      </div>
      <Grid container spacing={3} style={{alignItems: 'center', margin: '8px 0'}}>
        <Grid item xs={12} sm={9}>
          <ServicePackage servicePackage={servicePackage} />
        </Grid>
        <Grid item xs={12} sm={3} style={{}}>
          <HomeHandyButton style={{padding: '4px 16px'}} onClick={() => addPackage()}>Add More</HomeHandyButton>
          <Typography variant="body2">You can always add or edit within your dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={7} style={{textAlign: 'center'}}>
          <HomeHandyButton onClick={() => editPackage()}>Edit Package</HomeHandyButton>
        </Grid>
        <Grid item xs={12} sm={5} style={{textAlign: 'center'}}>
          <HomeHandyButton onClick={() => handleSubmit()}>Finish</HomeHandyButton>
        </Grid>
      </Grid>
    </div>
  )
}
