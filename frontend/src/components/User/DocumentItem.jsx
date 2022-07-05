import React from 'react'
import {Box, Grid, IconButton} from '@mui/material'
import Constants from '../../Constants'
import {useNavigate} from 'react-router-dom'
import '../../static/scss/User/Dashboard.scss'
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ConvertDate from '../../utils/ConvertDate'

function DocumentItem({document, role}) {
  
  const navigate = useNavigate()

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
          <IconButton onClick={()=>navigate(`${document.id}`)}>
            <InfoIcon className='dashboard-documents-item-buttons-info'></InfoIcon>
          </IconButton>
          {role=='user' && 
          <IconButton onClick={openURL}>
            <DownloadIcon className='dashboard-documents-item-buttons-download'></DownloadIcon>
          </IconButton>}
        </Grid>
      </Grid>

    </Box>
  )
}

export default DocumentItem