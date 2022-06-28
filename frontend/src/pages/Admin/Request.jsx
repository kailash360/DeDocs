import React from 'react'
import {useParams} from 'react-router-dom'
import {Container, Grid, Button} from '@mui/material'
import '../../static/scss/Admin/Request.scss'
import {ContractContext} from '../../context/ContractContext'
import {AuthContext} from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader' 
import Constants from '../../Constants'
import ConvertDate from '../../utils/ConvertDate'
import ReactHtmlParser from 'react-html-parser'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

function Request() {

  const params= useParams()
  const {Services} = React.useContext(ContractContext)
  const {account} = React.useContext(AuthContext)

  const [data, setData] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)

  const getRequest = async()=>{
    setIsLoading(true)
    const requestResponse = await Services.get_request(params.requestId)
    if(!requestResponse.success){
      toast.error(requestResponse.message)
      return
    }
    
    setData(requestResponse.data)
    setIsLoading(false)
  }

  React.useEffect(()=>{
    getRequest()
  },[account])

  console.log({data})

  return (isLoading || !data.request ? <Loader/>:
    <Container className="request">
        <Grid container>
          <Grid item sm={12} className='request-top'>
            <p className='request-top-id'>Request #{params.requestId}</p>
            <p className='request-top-subject'>{data.request.subject}</p>
          </Grid>
          <Grid item container spacing={1} className='request-mid'>
            <Grid item md={4} sm={12}>
              <p className='request-mid-heading'>User</p>
              <p className='request-mid-value'>{data.user && data.user.name}</p>
            </Grid>
            <Grid item md={4} sm={12}>
              <p className='request-mid-heading'>Type</p>
              <p className='request-mid-value'>{Constants.REQUEST_CATEGORY[data.request.category]}</p>
            </Grid>
            <Grid item md={4} sm={12}>
              <p className='request-mid-heading'>Date</p>
              <p className='request-mid-value'>{ConvertDate(data.request.date)}</p>
            </Grid>
          </Grid>
          <Grid item sm={12} className='request-description'>
              <p className='request-description-heading'>Description</p>
              <p className='request-description-value'>
                {data.request.description?
                  ReactHtmlParser(data.request.description)
                  : <i>No description provided</i>
                }
              </p>
          </Grid>
          <Grid item sm={12} className='request-files'>
              <p className='request-files-heading'>Files</p>
              <p className='request-files-value'>
                {data.request.ipfs_hash ? 
                  <a href={`https://ipfs.io/ipfs/${data.request.ipfs_hash}`} target="_blank" title='Open file in a new tab'>{data.request.ipfs_hash}</a>
                  : <i>No file attatched</i>
                }
              </p>
          </Grid>
          <Grid item className='request-buttons' sm={12}>
              <Button type='button' className='request-buttons-accept' startIcon={<DoneIcon/>} >Accept</Button>
              <Button type='button' className='request-buttons-reject' startIcon={<CloseIcon/>}>Reject</Button>
          </Grid>
        </Grid>
    </Container>
  )
}

export default Request