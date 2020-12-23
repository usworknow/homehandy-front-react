import { Chip, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  chipList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    // padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor: 'inherit',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
      paddingLeft: 0,
      marginTop: 8,
    }
  },
  chip: {
    marginRight: theme.spacing(2),
    backgroundColor: '#fff',
    padding: theme.spacing(0, 0.5),
    fontSize: 12,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    }
  },
}))

export default function ChipList ({chipData, handleDelete, ...other}) {
  const classes = useStyles()
  const onDelete = (item) => () => { // Strange Function definition
    handleDelete(item)
  }
  return (
    <Paper elevation={0} component="ul" className={classes.chipList} {...other}>
    {chipData.map((data, idx) => {
      // let icon;
      // if (data.label === 'React') {
      //   icon = <TagFacesIcon />;
      // }
      return (
        <li key={idx}>
          <Chip
            // icon={icon}
            label={data.label}
            onDelete={onDelete(data)}
            className={classes.chip}
          />
        </li>
      );
    })}
  </Paper>
  )
}
