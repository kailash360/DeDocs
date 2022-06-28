import React from'react'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import {Box} from '@mui/material'

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

export default Status
  