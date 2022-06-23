import React from 'react'
import {Container, Grid,IconButton} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import '../../static/scss/User/Dashboard.scss'

function Dashboard() {

  const [name, setName] = React.useState('Kailash')
  const [address, setAddress] = React.useState('0x123456789qwerty')

  return (
    <Container className='dashboard'>
      <Grid container>
        <Grid item className='dashboard-top'>
          <p className='dashboard-top-message'>
            Welcome 
            <span className='dashboard-top-message-name'>{name}</span> 
          </p>
          <p className='dashboard-top-address'>
            Address &nbsp;
            <span className='dashboard-top-address-value'>{address}</span> 
            <IconButton aria-label='copy' type='button' title='Copy Address'>
              <ContentCopyIcon className='dashboard-top-address-button'/>
            </IconButton> 
          </p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard