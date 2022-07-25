import React from 'react'
import {Container, TextField, Grid, InputLabel, Button} from '@mui/material'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../../static/scss/Landing.scss'
import {ContractContext} from '../../context/ContractContext'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function RegistrationBox() {

  const {Services} = React.useContext(ContractContext)

  const navigate = useNavigate()

  const [name, setName] = React.useState('')
  const [date, setDate] = React.useState(new Date())
  const [password, setPassword] = React.useState('')

  const handleRegister = async()=>{
    try{
      if(!name || !date || !password) throw new Error('All fields are compulsory')

      const registrationResponse = await Services.register_user(name, date, password)
      if(!registrationResponse.success) throw registrationResponse.message

      toast.success(`Registered successfully as ${name}`)

      setTimeout(()=>{
        window.location.href = 'user/dashboard'
      },1000)
    }catch(err){
      console.log('Error in registering user: ', err.message)
      toast.error(err.message)
    }
  }

  return (
    <Container maxWidth={false} className="landing-registration">
        <p className='landing-registration-heading'>Register as a User</p>
        <Grid container spacing={2} className='landing-registration-box'>
          <Grid item xs={12}>
            <InputLabel className='font-poppins'>Name</InputLabel>
            <TextField variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Date of Birth</InputLabel>
            <DatePicker onChange={setDate} selected={date} isClearable className='landing-datepicker' placeholder='Click here'/>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Password</InputLabel>
            <TextField variant="outlined" fullWidth type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12} className='mt-12 flex flex-col align-left'>
            <Button type='button' variant='contained' className='landing-registration-button' onClick={handleRegister}>Register</Button>
          </Grid>
        </Grid>
    </Container>
  )
}

export default RegistrationBox