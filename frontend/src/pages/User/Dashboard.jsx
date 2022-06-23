import React from 'react'
import {Container, Grid,IconButton} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ContractContext } from '../../context/ContractContext';
import { AuthContext } from '../../context/AuthContext';
import '../../static/scss/User/Dashboard.scss'
import toast from 'react-hot-toast'
import DocumentList from '../../components/User/DocumentList'

function Dashboard() {

  const {Services} = React.useContext(ContractContext)
  const {account} = React.useContext(AuthContext)

  const [name, setName] = React.useState('Loading...')
  const [address, setAddress] = React.useState('0x00000000000000000000000000000000000')

  const getUserDetails = async()=>{
    const response = await Services.get_user_details(account)
    if(!response.success) return

    setName(response.data.user.name)
    setAddress(account)
  }
  
  const copyToClipboard = ()=>{
    toast.success('Copied to clipboard')
  }

  React.useEffect(()=>{
    getUserDetails()
  },[account])

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
            <IconButton aria-label='copy' type='button' title='Copy Address' onClick={copyToClipboard} >
              <ContentCopyIcon className='dashboard-top-address-button'/>
            </IconButton> 
          </p>
        </Grid>
      </Grid>

      <DocumentList/>

    </Container>
  )
}

export default Dashboard