import React from 'react'
import {Container, TextField, Grid, InputLabel, Button} from '@mui/material'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import '../../static/scss/Landing.scss'

function RegistrationBox() {

  const Departments = [
    {label: 'UIDAI', value:'UIDAI'},
    {label: 'Income Tax', value:'IT'},
    {label: 'State Govt', value:'state'}
  ]

  return (
    <Container maxWidth={false} className="landing-registration">
        <p className='landing-registration-heading'>Register as an Admin</p>
        <Grid container spacing={2} className='pr-24'>
          <Grid item xs={12}>
            <InputLabel className='font-poppins mb-1'>Name</InputLabel>
            <TextField id="outlined-basic" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Department</InputLabel>
            <Select options={Departments} isClearable className='landing-select' placeholder='Click here'/>
          </Grid>
          <Grid item xs={12} className='mt-12 flex flex-col align-left'>
            <Button type='button' variant='contained' className='landing-registration-button'>Register</Button>
          </Grid>
        </Grid>
    </Container>
  )
}

export default RegistrationBox