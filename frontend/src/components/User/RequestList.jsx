import React from 'react'
import {Container, Accordion, AccordionDetails, AccordionSummary,Grid, Box, Typography} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Constants from '../../Constants'
import '../../static/scss/User/MyRequests.scss'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import convertDate from '../../utils/ConvertDate';
import ReactHtmlParser from 'react-html-parser'

function Status({status}){
  switch(status){
    case "0":
      return(
        <Box className='status status-pending'> 
          <HourglassEmptyIcon></HourglassEmptyIcon> Pending
        </Box>
      )
    case "1":
      return(
        <Box className='status status-success'> 
          <CheckCircleOutlineIcon></CheckCircleOutlineIcon> Success
        </Box>
      )
    case "2":
      return(
        <Box className='status status-rejected'> 
          <CloseIcon></CloseIcon> Rejected
        </Box>
      )
  }  
}

function Request({request}){
    
    return(
      <Accordion className='myRequests-list-item'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          className='myRequests-list-item-summary'
        >
          <Grid container>
            <Grid item md={2}>
              <img src={Constants.Departments[request.department].logo} alt=""  className='myRequests-list-item-summary-logo' />
            </Grid>
            <Grid item md={5} sm={10}>
              <p className='myRequests-list-item-summary-subject' >{request.subject}</p>
            </Grid>
            <Grid item md={3} sm={6}>
              <p className='myRequests-list-item-summary-date' > <CalendarTodayIcon></CalendarTodayIcon> {convertDate(Number(request.date))}</p>
            </Grid>
            <Grid item md={2} sm={6}>
              <p className='myRequests-list-item-summary-satus' ><Status status={request.status}/></p>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails className='myRequests-list-item-details'>
          <Grid container spacing={1}>
            {request.status == '2' &&
              <Grid item md={12}>
              <p className='myRequests-list-item-details-heading'>Remarks</p>
              {request.remarks}
            </Grid>}
            <Grid item md={4}>
              <p className='myRequests-list-item-details-heading'>Type</p>
              <p>{Constants.REQUEST_CATEGORY[request.category]}</p>
            </Grid>
            <Grid item md={8}>
              <p className='myRequests-list-item-details-heading'>Department</p>
              {Constants.Departments[request.department].name}
            </Grid>
            <Grid item md={12}>
              <p className='myRequests-list-item-details-heading'>Description</p>
              {request.description && request.description.length ? ReactHtmlParser(request.description) : <i>'No description provided'</i>}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    )
}

function RequestList({myRequests}) {

  return (
    <Container maxWidth={false} className='myRequests-list'>
      <p className='myRequests-list-heading'>My Requests</p>
      <hr />
        {myRequests && myRequests.length > 0 ? 
          myRequests.map(request => <Request request={request} />):
          <Typography variant="h5" component="h2" sx={{my:6, textAlign: 'center'}}>No request found</Typography>
        }
    </Container>
  )
}

export default RequestList