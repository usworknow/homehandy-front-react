import { Button, GridList, GridListTile, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import classnames from 'classnames';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from '../../components/dataTable';
import HomeHandyButton from '../../components/hhButton';
import { parser } from '../../utils/parser';
import Appointment from './appointment';
const useStyles = makeStyles(theme => ({
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 16,
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
      flexWrap: 'nowrap',
      width: 'auto',
      height: 'auto',
      transform: 'translateZ(0)',
  },
  dateSelectorBox: {
    width: '100%', 
    display: 'flex', 
    justifyContent: 'space-evenly', 
    backgroundColor: theme.palette.grayscale.tint2,
  },
  dayButton: {
    backgroundColor: theme.palette.grayscale.tint2,
    borderColor: theme.palette.grayscale.tint2,
    color: theme.palette.grayscale.main,
    padding: '0px 24px',
    fontSize: 12,
    margin: theme.spacing(0.5),
    '&.active, &:hover': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      borderWidth: 1
    }
  },
  addButton: {
    color: theme.palette.secondary.main,
    marginRight: 4
    // color: theme.palette.common.white,
  },
}))
function Appointments ({companies}) {
  const classes = useStyles()
  const theme = useTheme()
  const medium = useMediaQuery(theme.breakpoints.down('md'))
  // const small = useMediaQuery(theme.breakpoints.down('sm'))
  const xsmall = useMediaQuery(theme.breakpoints.down('xs'))


  const [ activeDay, setActiveDay ] = React.useState(parser.shortDate(Date.now(), 'MMM dd'))
  const upcomingDays = React.useMemo(() => {
    return [
      { value: parser.shortDate(Date.now(), 'MMM dd') },
      { value: parser.addDays(Date.now(), 1, 'MMM dd') },
      { value: parser.addDays(Date.now(), 2, 'MMM dd') },
      { value: parser.addDays(Date.now(), 3, 'MMM dd') },
      { value: parser.addDays(Date.now(), 4, 'MMM dd') },
    ]
  }, [])
  const getColumns = () => {
    if (xsmall) { return 1.5 }
    if (medium) { return 2.5 }
    return 4.5
  }
  // const [ company, setCompany ] = React.useState({})
  // React.useEffect(() => {
  //   if (companies && companies.length > 0) {
  //     setCompany(companies[0])
  //   }
  // }, [companies]);
  return (
    <div style={{padding: '16px 0'}}>
      <div style={{padding: '0 24px'}}>
        <div className={classes.dateSelectorBox}>
          {upcomingDays.map((item, idx) => (
            <HomeHandyButton onClick={() => setActiveDay(item.value)} key={idx} className={classnames(classes.dayButton, { 'active': item.value === activeDay })}>{item.value}</HomeHandyButton>
          ))}
        </div>
        <div className={classes.gridRoot}>
          <GridList spacing={4} className={classes.gridList} cols={getColumns()}>
            <GridListTile style={{height: '100%', width: 240}} rows={1} cols={xsmall ? 2 : 1}>
              <Appointment appointment={{}}/>
            </GridListTile>
            {[...Array(5)].map((x, index) => (
              <GridListTile style={{height: '100%', width: 240}} key={index} rows={1} cols={xsmall ? 2 : 1}>
                <Appointment />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <Button>
          <AddCircleRoundedIcon className={classes.addButton} /> New Address
        </Button>
      </div>
      <div style={{marginTop: 24}}>
        <div style={{backgroundColor: theme.palette.primary.main, color: theme.palette.secondary.main, padding: '8px 32px'}}>
          <Typography variant="body2">JOB SCHEDULE</Typography>
        </div>
        <DataTable />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    companies: state.companies.companyList
  }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatch)(Appointments)
