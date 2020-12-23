import { IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.tint1,
    color: theme.palette.common.white,
    padding: theme.spacing(0),
    textAlign: 'center',
    borderRight: `solid 1px ${theme.palette.common.white}`
  },
  body: {
    textAlign: 'center',
    padding: theme.spacing(0.25)
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, date, time, name, address, service) {
  return { id, date, time, name, address, service };
}

const rows = [...Array(30)].map((x, id) => {
    if (id % 2) {
        return createData(id, '01-Jan-20', '9:00 am', 'Steven Wright', '31 Reece St., Sydney', 'Cleaning Package 3')
    }
    return createData(id, '01-Jan-20', '11:00 am','Sharon Jones', '5 Malvin St., Ryde', 'Cleaning Package 2')
})

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function DataTable() {
  const classes = useStyles();

  return (
    <TableContainer style={{maxHeight: 500}}>
      <Table stickyHeader className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Service</StyledTableCell>
            <StyledTableCell>Appointment</StyledTableCell>
            <StyledTableCell>Contact</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                    {row.date}
                </StyledTableCell>
                <StyledTableCell >{row.time}</StyledTableCell>
                <StyledTableCell >{row.name}</StyledTableCell>
                <StyledTableCell >{row.address}</StyledTableCell>
                <StyledTableCell >{row.service}</StyledTableCell>
                <StyledTableCell >
                    <IconButton style={{padding: 0}}>
                        <img style={{width: 20, height: 'auto'}} src={require('../assets/images/icons/appointment.svg')} alt='Appointment' />
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell >
                    <IconButton style={{padding: 0, marginRight: 16}}>
                        <img style={{width: 20, height: 'auto'}} src={require('../assets/images/icons/phone.svg')} alt='Call' />
                    </IconButton>
                    <IconButton style={{padding: 0}}>
                        <img style={{width: 28, height: 'auto'}} src={require('../assets/images/icons/messages.svg')} alt='Message' />
                    </IconButton>
                </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}