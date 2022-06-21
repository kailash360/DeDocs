import React from 'react'
import {Container, Grid,IconButton} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function Dashboard() {

  const [name, setName] = React.useState('Kailash')
  const [address, setAddress] = React.useState('0x123456789qwerty')

  return (
    <Container>
      <Grid container>
        <Grid item>
          <p className='mb-0 text-3xl font-medium'>
            Welcome 
            <span className='ml-2 font-bold text-tertiary'>{name}</span> 
          </p>
          <p className='mt-1 text-lg'>
            Address: 
            <span className='ml-1 font-bold text-tertiary'>{address}</span> 
            <IconButton aria-label='copy'>
              <ContentCopyIcon className='text-[80%] text-black'/>
            </IconButton> 
          </p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard