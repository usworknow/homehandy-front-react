import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import HomeHandyRoundedPaper from './hhRoundedPaper';

const useStyles = makeStyles(theme => ({
  rootPaper: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      minWidth: 280,
    }
  },
  title: {
    color: theme.palette.primary.main,
    width: '100%',
    padding: '8px 0',
    marginBottom: 16,
    borderBottom: `solid 2px ${theme.palette.secondary.shade}`
  },
  description: {
    whiteSpace: 'pre-wrap',
    textAlign: 'left'

  },
  bottomLine: {
    width: 100, borderBottom: `solid 3px ${theme.palette.secondary.shade}`
  },
  formControl: {
    minWidth: 320,
  },
}))
export default function ServicePackage ({servicePackage}) {
  const classes = useStyles()
  const theme = useTheme()
  if (!servicePackage) {
    servicePackage = {
      name: 'Gardening Package Name One',
      price: 29,
      billing_cycle: 'monthly',
      description: <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Etiam bibendum imperdiet mi, at dapibus arcu laoreet eu.</strong> Pellentesque sed turpis sit amet mi posuere bibendum at sit amet nunc.</span>
    }
  }
  const getIcon = (icon) => {
    const arr = icon.split((/-(.+)/))
    if (!arr || arr.length < 2) { return '' }
    const val = [arr[0], arr[1]]
    return val
  }
  return (
    <HomeHandyRoundedPaper elevation={3} className={classes.rootPaper}>
      <div className={classes.title} style={{display: 'flex', alignItems: 'center'}}>
        {servicePackage && servicePackage.icon ?
          <Avatar style={{backgroundColor: theme.palette.primary.main}}><FontAwesomeIcon icon={getIcon(servicePackage.icon)} /></Avatar>
        : <img src={require('../assets/images/temp_package_logo.png')} alt="Service package" /> }
        <Typography variant="h5" style={{marginLeft: 8}}>{servicePackage.name}</Typography>
      </div>
      <div className={classes.title}>
        <Typography variant="h1" style={{fontSize: 60}}>${servicePackage.price} <span style={{fontSize: 16}}> {servicePackage.billing_cycle === 'yearly' ? 'per year' : 'per month'}</span></Typography>
      </div>
      <div style={{padding: '8px 0', width: '100%'}}>
        <Typography variant="body2" className={classes.description}>{servicePackage.description}</Typography>
      </div>
      <div style={{width: '100%'}}>
        {/* <ul>
          <li>Monthly Weeding</li>
          <li>Quarterly Hedging</li>
          <li>Monthly Pruning</li>
          <li>Quarterly Fertilizing</li>
        </ul> */}
      </div>
    </HomeHandyRoundedPaper>              
  )
}
