import React from 'react'
import {Container, Grid,IconButton, Button} from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ContractContext } from '../../context/ContractContext';
import { AuthContext } from '../../context/AuthContext';
import '../../static/scss/User/Dashboard.scss'
import toast from 'react-hot-toast'
import DocumentList from '../../components/User/DocumentList'
import RequestList from '../../components/User/RequestList'

function Dashboard() {

  const {Services} = React.useContext(ContractContext)
  const {account} = React.useContext(AuthContext)

  const [name, setName] = React.useState('Loading...')
  const [address, setAddress] = React.useState('0x00000000000000000000000000000000000')
  const [documents, setDocuments] = React.useState([])
  const [requests, setRequests] = React.useState([])

  const getUserDetails = async()=>{
    const response = await Services.get_user_details(account)
    if(!response.success) return

    setName(response.data.user.name)
    setAddress(account)
  }
  
  const getDocuments = async()=>{
    const documentsResponse = await Services.get_my_documents()
    if(!documentsResponse.success) return

    setDocuments(documentsResponse.data.documents.slice(0,Math.min(documentsResponse.data.documents.length,2)))
  }

  const getRequests = async()=>{
    const requestsResponse = await Services.get_requests()
    if(!requestsResponse.success) return

    setRequests(requestsResponse.data.requests.slice(0,Math.min(requestsResponse.data.requests.length,2)))
  }

  const copyToClipboard = ()=>{
    toast.success('Copied to clipboard')
  }

  React.useEffect(()=>{
    getUserDetails()
      .then(()=>{
        getDocuments()
          .then(()=>{
            getRequests()
          })
      })
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
      <Grid item sm={12}>
        <DocumentList documents={documents} />
        <Button> See All Documents </Button>
      </Grid>
      <Grid item sm={12}>
        <RequestList myRequests={requests} />
      </Grid>

    </Container>
  )
}

export default Dashboard