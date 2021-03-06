import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import HomeHandyButton from '../../components/hhButton';

export default function AgentExtendedReview ({handleSubmit}) {
  return (
    <div>
      <div style={{width: '100%', textAlign: 'left'}}>
        <Typography gutterBottom variant="h6">Review</Typography>
        <Typography gutterBottom variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu. Pellentesque sed turpis sit amet mi posuere bibendum at sit amet nunc. In vehicula vitae est sit amet pharetra.
        </Typography>
      </div>
      <Grid container spacing={3} style={{alignItems: 'center', minHeight: 320}}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <Typography>Content</Typography>
        </Grid>
      </Grid>
      <HomeHandyButton onClick={handleSubmit} fullWidth type="submit" style={{margin: '16px 0'}}>
        Finish
      </HomeHandyButton>
    </div>
  )
}
