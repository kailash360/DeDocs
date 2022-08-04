import React from 'react'
import { Modal, Box, Grid, Button, TextField, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import {ContractContext} from '../context/ContractContext'
import '../static/scss/VerifyModal.scss'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function VerifyModal({ open, setOpen }) {

  const {Services} = React.useContext(ContractContext)

  const [documentId, setDocumentId] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const [verified, setVerified] = React.useState(false)

  const verify = async () => {
    try{
      const verifiedResult = await Services.verify_document(documentId, address)
      if(!verifiedResult.success) throw new Error(verifiedResult.message)

      setVerified(verifiedResult.data.verified[0])
      setChecked(true)

    }catch(err){
      console.log("Error in verifyModal: ", err.message)
      toast.error(err.message)
    }
  }

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="qrModal">
        <Grid container spacing={1}>
          <Grid item sm={12} align="center" className='name'> 
            <strong>Verify the validity of the document</strong> 
          </Grid>
          <Grid item md={12}>
            <TextField label="Document ID" fullWidth variant="outlined" onChange={(e) => setDocumentId(e.target.value)} />
          </Grid>
          <Grid item md={12}>
            <TextField label="Owner Address" fullWidth variant="outlined" onChange={(e) => setAddress(e.target.value)} />
          </Grid>
        </Grid>
        <Grid item container className='btn-container'>
          <Grid item sm={6} align="center">
            <Button type="button" className="btn" onClick={()=> verify()} >Check</Button>
          </Grid>
          <Grid item sm={6} align="center">
            <Button type="button" className="btn" onClick={() => setOpen(false)}>Close</Button>
          </Grid>
        </Grid>
        <Box className="verdict" center>
          {checked && verified && <Typography className="true"> <DoneIcon/> Document matches with the correct user</Typography>}
          {checked && !verified && <Typography className="false"><CloseIcon/> Document does not belong to this user</Typography>}
        </Box>
      </Box>
    </Modal>
  )
}

export default VerifyModal