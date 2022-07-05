import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Constants from '../../Constants'
import ConvertDate from '../../utils/ConvertDate'
import Status from '../Status'
import {useNavigate} from 'react-router-dom'
import { Typography } from '@mui/material';

export default function RequestsTable({requests}) {
  console.log({requests})

  const navigate = useNavigate()

  return ( requests.length == 0 ?
    <Typography variant="h5" component="h2" sx={{my:6}}>No Request found</Typography>:
    <TableContainer component={Paper} className='requests-table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='requests-table-column'>
            <TableCell>ID</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>User</TableCell>
            <TableCell>User Address</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='requests-table-body'>
          {requests.map((row) => (
            <TableRow 
              key={row.name} 
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
              onClick={() => navigate(`/admin/requests/${row.id}`)} 
              className= 'requests-table-body-row'
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell>{row.subject}</TableCell>
              <TableCell>{row.user.name}</TableCell>
              <TableCell>{row.user_id}</TableCell>
              <TableCell>{ConvertDate(Number(row.date))}</TableCell>
              <TableCell> <Status status={row.status} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
