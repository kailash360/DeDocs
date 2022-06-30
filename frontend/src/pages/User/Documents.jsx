import React from 'react'
import {Container} from '@mui/material'
import {ContractContext} from '../../context/ContractContext'
import {AuthContext} from '../../context/AuthContext'
import DocumentList from '../../components/User/DocumentList'
import Loader from '../../components/Loader'

function Documents() {

    const {Services} = React.useContext(ContractContext)
    const {account} = React.useContext(AuthContext)

    const [documents, setDocuments ] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const getDocuments = async()=>{
        setIsLoading(true)
        const myDocumentsResponse = await Services.get_my_documents()
        setDocuments(myDocumentsResponse.data.documents)
        setIsLoading(false)
    }

    React.useEffect(()=>{
        getDocuments()
    },[account])

  return (isLoading ? <Loader></Loader>:
    <Container>
        <DocumentList documents={documents}/>
    </Container>
  )
}

export default Documents