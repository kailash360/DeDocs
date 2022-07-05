import React from 'react'
import {Container} from '@mui/material'
import DocumentList from '../../components/User/DocumentList'
import {ContractContext} from '../../context/ContractContext'
import {AuthContext} from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader'

function AdminDocuments() {

    const {account, department} = React.useContext(AuthContext)
    const {Services} = React.useContext(ContractContext)

    const [documents, setDocuments] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const getDocuments = async()=>{
        setIsLoading(true)
        const documentsResponse = await Services.get_admin_documents(department)
        if(!documentsResponse.success) {
            toast.error(documentsResponse.message)
            return
        }
        setDocuments(documentsResponse.data.documents)
        setIsLoading(false)
    }

    React.useEffect(()=>{
        getDocuments()
    },[account])

  return (
    <Container>
        {isLoading? 
            <Loader></Loader>:
            <DocumentList documents={documents} role='admin' ></DocumentList>
        }
    </Container>
  )
}

export default AdminDocuments