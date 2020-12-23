import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cls from 'classnames';
import React from 'react';

const useStyles = makeStyles(theme => ({
  gridBox: {
    borderRadius: 4, 
    minHeight: 240,
    backgroundColor: theme.palette.grayscale.tint2,
    // minWidth: 200
  },
  gridBoxEmpty: {
  },
  gridBoxTitle: {
    color: '#5E75A3',
    textAlign: 'center',
    opacity: '0.2',
    padding: theme.spacing(3,2)
  },
  yellowTextBox: {
    borderRadius: 4, 
    backgroundColor: theme.palette.secondary.tint1, 
    color: 'black',
    padding: theme.spacing(0.25, 2),
  },
  apptTime: {
    position:'absolute', 
    top: 8, 
    left: 8, 
  },
  apptAddress: {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  bedBathBox: {
    minWidth: 40,
    marginRight: 24, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-evenly',
    color: theme.palette.grayscale.main,

  }
}))
export default function Appointment ({appointment}) {
  const classes = useStyles()

  if (!appointment)  {
    return (
      <div className={cls(classes.gridBox)}>
        <Typography className={classes.gridBoxTitle}>Customer & Appointment Details will be featured here</Typography>
      </div>
    )
  }
  return (
    <div className={classes.gridBox}>
      <div style={{position: 'relative'}}>
        <img style={{width: '100%', height: 'auto'}} src={require('../../assets/images/temp_house.png')} alt="Property" />
        <div className={cls(classes.yellowTextBox, classes.apptTime)}>
          <Typography variant="body2">9:00 am</Typography>
        </div>
      </div>
      <div style={{padding: 8}}>
        <Typography variant="subtitle1" className={classes.apptAddress}>31 Reece St. Sydney</Typography>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 8}}>
          <div className={classes.bedBathBox}>
            <img src={require('../../assets/images/icons/beds.svg')} alt="beds" /> 2
          </div>
          <div className={classes.bedBathBox}>
            <img src={require('../../assets/images/icons/baths.svg')} alt="baths" /> 2
          </div>
        </div>
      </div>
    </div>
  )
}
