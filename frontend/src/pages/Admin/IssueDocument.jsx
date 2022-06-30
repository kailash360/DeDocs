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

function IssueDocument() {

    const {account} = React.useContext(AuthContext)
    const {Services} = React.useContext(ContractContext)

    const params = useParams()
    const navigate = useNavigate()

    const [request, setRequest] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true)
    const [isIssuing, setIsIssuing] = React.useState(false)
    const [name, setName] = React.useState('')
    const [uid, setUid] = React.useState('')
    const [file, setFile] = React.useState('')
    const [ipfs, setIpfs] = React.useState('')

    const getRequest = async()=>{
        setIsLoading(true)
        const requestResponse = await Services.get_request(Number(params.requestId))
        setRequest(requestResponse.data.request)
        setIsLoading(false)
    }

    const issueDocument = async()=>{
        setIsIssuing(true)
        const issueResponse = await Services.issue_document(Number(params.requestId),request.user_id,name,uid,ipfs)
        if(!issueResponse.success){
            toast.error(issueResponse.message)
            setIsIssuing(false)
            return
        }

        toast.success(`${name} issued successfully`)
        setIsIssuing(false)
        navigate('/admin/requests')
    }  

    React.useEffect(() => {
        getRequest()
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
                <TextField className="issue-input-value" fullWidth placeholder="Type here" onChange={(e)=>{setName(e.target.value)}} ></TextField>
            </Grid>
            <Grid item sm={12} className="issue-input">
                <p className="issue-input-heading">Document UID</p>
                <TextField className="issue-input-value" fullWidth placeholder="Type here" onChange={(e)=>{setUid(e.target.value)}} ></TextField>
            </Grid>
            <Grid item sm={12} className="issue-upload">
                <p className="issue-upload-heading">Upload File</p>                
                <Dropzone ipfsHash={ipfs} setIpfsHash={setIpfs} />
            </Grid>
            <Grid item sm={12}>
                <LoadingButton 
                    variant='contained' 
                    className='issue-button'  
                    onClick={issueDocument}
                >{isIssuing?'Submitting...':'Issue'}</LoadingButton>
            </Grid>
        </Grid>
    </Container>
  )
}

export default IssueDocument