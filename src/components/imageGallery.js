import { GridList, GridListTile, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '80%',
    height: 450,
    [theme.breakpoints.down('sm')]: { 
      flexWrap: 'nowrap',
      width: 'auto',
      height: 'auto',
      transform: 'translateZ(0)',
    }
  },
}))

export default function ImageGallery ({images, ...other}) {
  const classes = useStyles()
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('sm'))
  const xsmall = useMediaQuery(theme.breakpoints.down('xs'))
  // const tileData = 
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} spacing={2} className={classes.gridList} cols={small ? 2.5 : (xsmall ? 1.5 : 2)}>
        {images.map((img, index) => (
          <GridListTile key={index} rows={2} cols={xsmall ? 2 : 1}>
            <img src={img} style={{height: '100%', width: '100%'}} alt={'gallery tile'} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
