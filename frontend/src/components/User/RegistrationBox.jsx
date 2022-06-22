import React from 'react'
import {Container, TextField, Grid, InputLabel, Button} from '@mui/material'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../static/scss/Landing.scss'

function RegistrationBox() {

  const [date, setDate] = React.useState(new Date())

  return (
    <Container maxWidth={false} className="landing-registration">
        <p className='landing-registration-heading'>Register as a User</p>
        <Grid container spacing={2} className='landing-registration-box'>
          <Grid item xs={12}>
            <InputLabel className='font-poppins'>Name</InputLabel>
            <TextField id="outlined-basic" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Date of Birth</InputLabel>
            <DatePicker onChange={setDate} selected={date} isClearable className='landing-datepicker' placeholder='Click here'/>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Password</InputLabel>
            <TextField id="outlined-basic" variant="outlined" fullWidth className='py-0 h-1' />
          </Grid>
          <Grid item xs={12} className='mt-12 flex flex-col align-left'>
            <Button type='button' variant='contained' className='landing-registration-button'>Register</Button>
          </Grid>
        </Grid>
    </Container>
  )
}

export default RegistrationBox