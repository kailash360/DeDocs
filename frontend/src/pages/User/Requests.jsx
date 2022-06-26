import React from 'react'
import {ContractContext} from '../../context/ContractContext'
import {AuthContext} from '../../context/AuthContext'
import {Container} from '@mui/material'
import RequestList from '../../components/User/RequestList'
import toast from 'react-hot-toast'
import '../../static/scss/User/Requests.scss'

function Requests() {

  const {Services} = React.useContext(ContractContext)
  const {account} = React.useContext(AuthContext)

  const [requests, setRequests] = React.useState([])

  const getRequests = async () => {
    const requestsResponse = await Services.get_requests()
    console.log({requestsResponse})

    if(!requestsResponse.success){
      toast.error(requestsResponse.message)
      return
    }
    
    setRequests(requestsResponse.data.requests)

  }

  React.useEffect(() => {
    getRequests()
  },[account])

  return (
    <Container className='requests'>
      <h3>My Requests</h3>
      <RequestList className='requests-list' requests={requests}></RequestList>
    </Container>
  )
}

export default Requests