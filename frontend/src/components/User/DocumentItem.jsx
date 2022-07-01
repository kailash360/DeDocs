import React from 'react'
import {Box, Grid, IconButton} from '@mui/material'
import Constants from '../../Constants'
import '../../static/scss/User/Dashboard.scss'
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConvertDate from '../../utils/ConvertDate'

function DocumentItem({document}) {
  
  const openURL = ()=>{
    window.open(`${Constants.IPFS_PROVIDER}/${document.ipfs_hash}`, '_blank')
  }

  return (
    <Box className='dashboard-documents-item'>
      <Grid container >
        <Grid item sm={1}>
          <img src={Constants.Departments[document.department].logo} alt=""  className='dashboard-documents-item-logo'/>
        </Grid>
        <Grid item sm={7}>
          <p className='dashboard-documents-item-title'>{document.name}</p>
        </Grid>
        <Grid sm={3}>
          <p className='dashboard-documents-item-date'> <CalendarTodayIcon></CalendarTodayIcon>  {ConvertDate(document.issued_on)}</p>
        </Grid>
        <Grid item sm={1} className='dashboard-documents-item-buttons'>
          <IconButton>
            <InfoIcon className='dashboard-documents-item-buttons-info'></InfoIcon>
          </IconButton>
          <IconButton>
            <DownloadIcon className='dashboard-documents-item-buttons-download' onClick={openURL}></DownloadIcon>
          </IconButton>
        </Grid>
      </Grid>

    </Box>
  )
}

export default DocumentItem