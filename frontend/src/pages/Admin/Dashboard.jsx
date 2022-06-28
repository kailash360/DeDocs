import React from 'react'
import {Grid, Container, Button, Link, Box} from '@mui/material'
import Constants from '../../Constants'
import '../../static/scss/Admin/Dashboard.scss'
import {AuthContext} from '../../context/AuthContext'
import {ContractContext} from '../../context/ContractContext'
import toast from 'react-hot-toast'
import DefaultAdmin from '../../static/media/AdminImage.png'
import {useNavigate} from 'react-router-dom'
import RestoreIcon from '@mui/icons-material/Restore';

function Dashboard() {

    const navigate = useNavigate()

    const {account, updateAuth} = React.useContext(AuthContext)
    const {Services} = React.useContext(ContractContext)

    const [name ,setName] = React.useState('-')
    const [department, setDepartment] = React.useState({name: 'Loading...'})

    const getAdminDetails = async()=>{
        const adminDetailsResponse = await Services.get_admin_details()
        if(!adminDetailsResponse.success) {
            console.log(adminDetailsResponse.message)
            return
        }
        setName(adminDetailsResponse.data.admin.name)
        setDepartment(Constants.Departments[adminDetailsResponse.data.admin.department])
        console.log({adminDetailsResponse})
        updateAuth({department:adminDetailsResponse.data.admin.department})
    }

    React.useEffect(()=>{
        getAdminDetails()
    },[account])

  return (
      <Container className='dashboard'>
        <Grid container className='pt-4 dashboard-top'>
            <Grid item md={1}>
                <img src={DefaultAdmin} alt="" className='dashboard-top-image' />
            </Grid>
            <Grid item md={11}>
                <p className='dashboard-top-name'>{name}</p>
            </Grid>
            <Grid item md={1} sm={12}>
                <img src={department.logo} alt="" className='dashboard-top-logo' />
            </Grid>
            <Grid item md={11} sm={12}>
                <p className='text-xl font-bold dashboard-top-department'>
                    {department.name}
                </p>
            </Grid>
        </Grid>
        <Grid container className='dashboard-mid'>
            <Grid item md={6} sm={12}>
                <Button type='button' onClick={() => navigate('/admin/requests')} className='dashboard-mid-buttons'>
                    <RestoreIcon className='dashboard-mid-buttons-icon'/>
                    <p className='dashboard-mid-buttons-text'>See All Requests</p>
                </Button>
            </Grid>
        </Grid>
      </Container>
  )
}

export default Dashboard