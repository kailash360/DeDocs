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
    <Container maxWidth={false} className="min-w-full flex flex-col justify-evenly">
        <p className='text-3xl font-bold'>Register as an Admin</p>
        <Grid container spacing={2} className='pr-24'>
          <Grid item xs={12}>
            <InputLabel className='font-poppins mb-1'>Name</InputLabel>
            <TextField id="outlined-basic" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Department</InputLabel>
            <Select options={Departments} isClearable className='mt-1 landing-select h-12 text-md w-full rounded border-1 border-black/[.15]' placeholder='Click here'/>
          </Grid>
          <Grid item xs={12} className='mt-12 flex flex-col align-left'>
            <Button type='button' variant='outlined' className='w-fit normal-case text-lg font-bold bg-secondary text-white py-2 px-4'>Submit</Button>
          </Grid>
        </Grid>
    </Container>
  )
}

export default RegistrationBox