import React from 'react'
import {Container, Grid, TextField, Input} from '@mui/material'
import { LoadingButton} from '@mui/lab'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import '../../static/scss/Admin/IssueDocument.scss'
import {AuthContext} from '../../context/AuthContext'
import {ContractContext} from '../../context/ContractContext'
import {useParams, useNavigate} from 'react-router-dom'
import Loader from '../../components/Loader'
import Dropzone from '../../components/User/Dropzone'
import toast from 'react-hot-toast'

function ModifyDocument() {

    const {account} = React.useContext(AuthContext)
    const {Services} = React.useContext(ContractContext)

    const params = useParams()
    const navigate = useNavigate()

    const [request, setRequest] = React.useState('')
    const [document, setDocument] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)
    const [isModifying, setIsModifying] = React.useState(false)
    const [file, setFile] = React.useState('')
    const [ipfs, setIpfs] = React.useState('')
    const [remarks, setRemarks] = React.useState('')

    const getRequest = async()=>{
      console.log('Starting to get request')
      const requestResponse = await Services.get_request(Number(params.requestId))
      console.log({requestResponse})
      setRequest(requestResponse.data.request)
      console.log('Finished getting request')

      return {documentId: requestResponse.data.request?.document_id}
    }

    const getDocument = async(_id)=>{
      console.log('Starting to get document')
      console.log({_id})
      const documentResponse = await Services.get_document(_id)
      console.log({documentResponse})
      setDocument(documentResponse.data.document)
      console.log('Finished getting document')
    }

    const ModifyDocument = async()=>{
        setIsModifying(true)
        const modifyResponse = await Services.modify_document(request.document_id, ipfs, remarks)
        if(!modifyResponse.success){
            toast.error(modifyResponse.message)
            setIsModifying(false)
            return
        }

        toast.success(`${document.name} modified successfully`)
        setIsModifying(false)
        navigate('/admin/requests')
    }  

    const handleLoad = async()=>{

      console.log({request})
      // if(!request || !request.document_id) return
      console.log('Starting to load')

      setIsLoading(true)
      const response = await getRequest()
      if(!response.documentId) return
      await getDocument(response.documentId)
      setIsLoading(false)
    }

    React.useEffect(() => {
        handleLoad()
    }, [account])



  return (isLoading && !request? <Loader/> :
    <Container className="issue">
        <Grid container spacing={4}>
            <Grid item sm={12} className="issue-top">
                <p className="issue-top-heading">Issue document</p>
            </Grid>
            <Grid item sm={12} className="issue-requestDetails">
                <p className="issue-requestDetails-id">Request #{request && request.id}</p>
                <p className="issue-requestDetails-subject">{request && request.subject}</p>
            </Grid>
            <Grid item sm={12} className="issue-input">
                <p className="issue-input-heading">Document Name</p>
                <p>{document && document.name}</p>
            </Grid>
            <Grid item sm={12} className="issue-input">
                <p className="issue-input-heading">Document UID</p>
                <p>{document && document.uid}</p>
            </Grid>
            <Grid item sm={12} className="issue-input">
                <p className="issue-input-heading">Remarks</p>
                <TextField className="issue-input-value" fullWidth placeholder="Type here" onChange={(e)=>{setRemarks(e.target.value)}} ></TextField>
            </Grid>
            <Grid item sm={12} className="issue-upload">
                <p className="issue-upload-heading">Upload File</p>                
                <Dropzone ipfsHash={ipfs} setIpfsHash={setIpfs} />
            </Grid>
            <Grid item sm={12}>
                <LoadingButton 
                    variant='contained' 
                    className='issue-button'  
                    onClick={ModifyDocument}
                >{isModifying?'Submitting...':'Issue'}</LoadingButton>
            </Grid>
        </Grid>
    </Container>
  )
}

export default ModifyDocument