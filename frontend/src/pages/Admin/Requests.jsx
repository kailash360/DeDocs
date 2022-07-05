import React from 'react'
import {Container} from '@mui/material'
import RequestsTable from '../../components/Admin/RequestsTable'
import '../../static/scss/Admin/Requests.scss'
import {ContractContext} from '../../context/ContractContext'
import {AuthContext} from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader'

function Requests() {

    const {account, department} = React.useContext(AuthContext)
    const {Services} = React.useContext(ContractContext)

    const [requests, setRequests] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const getRequests = async()=>{
        setIsLoading(true)
        const requestsResponse = await Services.get_admin_requests()

        if(!requestsResponse.success) {
            toast.error(requestsResponse.message)
            return
        }

        setRequests(requestsResponse.data.requests.reverse())
        setIsLoading(false)
    }

    React.useEffect(()=>{
       getRequests()
    },[account, department])

  return (
    <Container className='requests'>
        {isLoading? <Loader/> :
        <>
            <p className='requests-heading'>
                <span className='requests-heading-count'> {requests.length} </span> Requests
            </p>
            <hr />
            <RequestsTable requests={requests}></RequestsTable>
        </>}
    </Container>
  )
}

export default Requests