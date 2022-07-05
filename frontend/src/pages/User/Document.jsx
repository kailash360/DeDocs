import React from 'react'
import { Container, Grid, Button, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom'
import Iframe from 'react-iframe'
import { ContractContext } from '../../context/ContractContext'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader'
import Constants from '../../Constants'
import '../../static/scss/User/Document.scss'
import ConvertDate from '../../utils/ConvertDate'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Downlaod from '../../utils/Download'
import QRModal from '../../components/User/QRModal'
import DocumentHistory from '../../components/User/DocumentHistory'
import CopyToClipboard from '../../utils/CopyToClipboard'

function Document() {

  const params = useParams()

  const { account } = React.useContext(AuthContext)
  const { Services } = React.useContext(ContractContext)

  const [document, setDocument] = React.useState()
  const [history, setHistory] = React.useState()
  const [isLoading, setIsLoading] = React.useState(false)
  const [openQRModal, setOpenQRModal] = React.useState(false)

  const getDocument = async () => {
    setIsLoading(true)
    
    //Fetch document
    const documentResponse = await Services.get_document(params.documentId)
    if (!documentResponse.success) {
      toast.error(documentResponse.message)
      return
    }

    setDocument(documentResponse.data.document)

    //Fetch history 
    const historyResponse = await Services.get_history(params.documentId)
    console.log({historyResponse})
    if(!historyResponse.success) {
      toast.error(historyResponse.message)
      return
    }

    setHistory(historyResponse.data.events)

    setIsLoading(false)
  }

  const copy = ()=>{
    CopyToClipboard(document.ipfs_hash)
    toast.success('Copied to clipboard')
  }

  React.useEffect(() => {
    getDocument()
  }, [account])


  return (isLoading && !document ? <Loader /> :
    (document &&
    <>
      <Container className='document'>
        <Grid container>
          <Grid item sm={12} className='name'>
            <strong> {document.id}.{document.name}</strong>
          </Grid>
          <Grid item container spacing={4}>
            <Grid item md={6} sm={12}>
              <Iframe url={`${Constants.IPFS_PROVIDER}/${document.ipfs_hash}`} allow="fullScreen" width="100%" height="100%" />
            </Grid>
            <Grid item container md={6} sm={12} spacing={2} className='info'>
              <Grid item sm={12}>
                <strong>Document UID</strong>
                <p>{document.uid}</p>
              </Grid>
              <Grid item sm={12}>
                <strong>Issued By</strong>
                <p>{document && Constants.Departments[document.department].name}</p>
                <img src={document && Constants.Departments[document.department].logo} alt="" className='logo' />
              </Grid>
              <Grid item container spacing={1}>
                <Grid item sm={6}>
                  <strong>Issued On</strong>
                  <p>{ConvertDate(document.issued_on)}</p>
                </Grid>
                <Grid item sm={6}>
                  <strong>Last Updated</strong>
                  <p>{document.last_updated ? ConvertDate(document.last_updated) : ConvertDate(document.issued_on)}</p>
                </Grid>
              </Grid>
              <Grid item sm={12}>
                <strong>IPFS Hash</strong>
                <p>
                  {document.ipfs_hash} 
                  <IconButton type='button' className='copy-btn' onClick={copy} ><ContentCopyIcon/></IconButton>
                </p>
              </Grid>
              <Grid container item spacing={1} className='btn-container'>
                <Grid item sm={6} align='center'> 
                  <Button type='button' className='btn' startIcon={<DownloadIcon/>} onClick={()=>Downlaod(`${Constants.IPFS_PROVIDER}/${document.ipfs_hash}`)} >Downlaod</Button> 
                </Grid>
                <Grid item sm={6} align='center'> 
                  <Button type='button' className='btn' startIcon={<QrCodeIcon/>} onClick={()=>setOpenQRModal(true)} >Generate QR</Button> 
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <DocumentHistory history={history} />
      </Container>
      {openQRModal && 
        <QRModal 
          open={openQRModal} 
          setOpen={setOpenQRModal} 
          name={document.name} 
          url={`${Constants.IPFS_PROVIDER}/${document.ipfs_hash}`}
        />
      }
    </>
    )
  )
}

export default Document