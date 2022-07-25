import React from 'react'
import web3 from 'web3'
import {Container, TextField, Grid, InputLabel, Button} from '@mui/material'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css";
import '../../static/scss/Landing.scss'
import {AuthContext} from '../../context/AuthContext'
import {ContractContext} from '../../context/ContractContext'
import Constants from '../../Constants'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function RegistrationBox() {

  const Departments = Object.keys(Constants.Departments).map(item => ({
    label: (Constants.Departments[item]).name,
    value: (Constants.Departments[item]).id
  }))

  const {account} = React.useContext(AuthContext)
  const {Services} = React.useContext(ContractContext)

  const navigate = useNavigate()

  const [name, setName] = React.useState('')
  const [department, setDepartment] = React.useState('')
  
  const registerAdmin = async()=>{

    let deptId = ''

    for(let key in Object.keys(Constants.Departments)) if(Constants.Departments[key].id === department) deptId = key

    let bigDeptId = new web3.utils.toBN(deptId)

    const adminRegistrationResponse = await Services.register_admin(name, bigDeptId)

    if(!adminRegistrationResponse.success){
      toast.error(adminRegistrationResponse.message)
      return
    }

    console.log(adminRegistrationResponse)

    toast.success(`Successfully registered as ${name} under ${department}`)

    setTimeout(()=>{
      window.location.href = 'admin/dashboard'
    },1000)
  }

  return (
    <Container maxWidth={false} className="landing-registration">
        <p className='landing-registration-heading'>Register as an Admin</p>
        <Grid container spacing={2} className='pr-24'>
          <Grid item xs={12}>
            <InputLabel>Name</InputLabel>
            <TextField id="outlined-basic" variant="outlined" fullWidth value={name} onChange={(e)=> setName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Department</InputLabel>
            <Select options={Departments} isClearable className='landing-select' placeholder='Click here' onChange={(option) => setDepartment(option.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button type='button' variant='contained' onClick = {registerAdmin} className='landing-registration-button'>Register</Button>
          </Grid>
        </Grid>
    </Container>
  )
}

export default RegistrationBox