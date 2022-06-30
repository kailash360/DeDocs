import React from 'react';
import {Box, Modal, Grid, Button, TextField} from '@mui/material';
import '../../static/scss/Admin/RejectRequestModal.scss'
import { ContractContext } from '../../context/ContractContext';
import { AuthContext } from '../../context/AuthContext';
import {useParams, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

export default function RejectRequestModal({open, setOpen, request}) {

  const {account} = React.useContext(AuthContext)
  const {Services} = React.useContext(ContractContext)
  
  const params = useParams()
  const navigate = useNavigate()

  const [remarks, setRemarks] = React.useState('')

  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleReject = async()=>{
    const rejectResponse = await Services.reject_request(Number(params.requestId),remarks)
    if(!rejectResponse.success){
      toast.error(rejectResponse.message)
      return
    }

    toast.success('Request rejected successfully')
    navigate('/admin/requests')
  }

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='rejectModal'
      >
        <Box sx={style} className='rejectModal-box'>
          <Grid container>
            <Grid item sm={12} className='rejectModal-box-heading'>
                <p>Reject</p>
                <p>{request.subject}</p>
            </Grid>
            <Grid item container sm={12} className='rejectModal-box-input'>
                <p>Remarks</p>
                <TextField fullWidth multiline minRows='4' rows='4' placeholder='Write here...' onChange={(e) => setRemarks(e.target.value)}/>
            </Grid>
            <Box className='rejectModal-box-buttons'>
                <Button type='button' className='rejectModal-box-buttons-cancel' onClick={handleClose} >Cancel</Button>
                <Button type='button' className='rejectModal-box-buttons-confirm' onClick={handleReject}>Confirm</Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
  );
}
