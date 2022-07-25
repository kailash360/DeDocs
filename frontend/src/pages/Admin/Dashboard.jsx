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
import ArticleIcon from '@mui/icons-material/Article';
import Loader from '../../components/Loader'

function Dashboard() {

    const navigate = useNavigate()

    const {account, updateAuth} = React.useContext(AuthContext)
    const {Services} = React.useContext(ContractContext)

    const [name ,setName] = React.useState('-')
    const [department, setDepartment] = React.useState({name: 'Loading...'})
    const [departmentId, setDepartmentId] = React.useState('0')
    const [stats, setStats] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)

    const getAdminDetails = async()=>{
        const adminDetailsResponse = await Services.get_admin_details()
        if(!adminDetailsResponse.success) {
            console.log(adminDetailsResponse.message)
            return
        }
        setName(adminDetailsResponse.data.admin.name)
        setDepartment(Constants.Departments[adminDetailsResponse.data.admin.department])
        setDepartmentId(adminDetailsResponse.data.admin.department)
        console.log({adminDetailsResponse})
        updateAuth({department:adminDetailsResponse.data.admin.department})
    }

    const getStats = async()=>{
        const statsResponse = await Services.get_dashboard_stats(departmentId)
        if(!statsResponse.success) {
            toast.error(statsResponse.message)
            return
        }
        setStats(statsResponse.data.stats)
    }

    const handleDashboardLoad = async()=>{
        setIsLoading(true)
        await getAdminDetails()
        await getStats()
        setIsLoading(false)
    }

    React.useEffect(()=>{
        handleDashboardLoad()
    },[account])

  return ( isLoading ? <Loader/> :
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
        <Grid container className='dashboard-mid' spacing={2}>
            <Grid item md={4} sm={12}>
                <Box className='stats'>
                    <p className='stats-heading'>Total Users</p>
                    <p className='stats-value'>{stats.total_users || 0}</p>
                </Box>
            </Grid>
            <Grid item md={4} sm={12}>
                <Box className='stats'>
                    <p className='stats-heading'>Total Documents</p>
                    <p className='stats-value'>{stats.total_documents || 0}</p>
                </Box>
            </Grid>
            <Grid item md={4} sm={12}>
                <Box className='stats'>
                    <p className='stats-heading'>Total Requests</p>
                    <p className='stats-value'>{stats.total_requests || 0}</p>
                </Box>
            </Grid>
            <Grid item md={6} sm={12}>
                <Button type='button' onClick={() => navigate('/admin/requests')} className='dashboard-mid-buttons'>
                    <RestoreIcon className='dashboard-mid-buttons-icon'/>
                    <p className='dashboard-mid-buttons-text'>See All Requests</p>
                </Button>
            </Grid>
            <Grid item md={6} sm={12}>
                <Button type='button' onClick={() => navigate('/admin/documents')} className='dashboard-mid-buttons'>
                    <ArticleIcon className='dashboard-mid-buttons-icon'/>
                    <p className='dashboard-mid-buttons-text'>See All Documents</p>
                </Button>
            </Grid>
        </Grid>
      </Container>
  )
}

export default Dashboard