import React from 'react'
import {ContractContext} from '../../context/ContractContext'
import {AuthContext} from '../../context/AuthContext'
import {Container} from '@mui/material'
import RequestList from '../../components/User/RequestList'
import toast from 'react-hot-toast'
import '../../static/scss/User/Requests.scss'
import Loader from '../../components/Loader'

function Requests() {

  const {Services} = React.useContext(ContractContext)
  const {account} = React.useContext(AuthContext)

  const [requests, setRequests] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const getRequests = async () => {
    setIsLoading(true)
    const requestsResponse = await Services.get_requests()
    if(!requestsResponse.success){
      toast.error(requestsResponse.message)
      return
    }
    setRequests(requestsResponse.data.requests.reverse())
    setIsLoading(false)
  }

  React.useEffect(() => {
    getRequests()
  },[account])

  return (
    <Container className='requests'>
      <p className='requests-heading'>My Requests</p>
      <hr />
      {
        isLoading ? <Loader></Loader>:
        <RequestList className='requests-list' requests={requests}></RequestList>
      }
    </Container>
  )
}

export default Requests