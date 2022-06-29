import * as React from 'react';
import {Box, Modal, Grid, Button, TextField} from '@mui/material';
import '../../static/scss/Admin/RejectRequestModal.scss'

export default function RejectRequestModal({open, setOpen, request}) {

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
                <TextField fullWidth multiline minRows='4' rows='4' placeholder='Write here...'/>
            </Grid>
            <Box className='rejectModal-box-buttons'>
                <Button type='button' className='rejectModal-box-buttons-cancel' onClick={handleClose} >Cancel</Button>
                <Button type='button' className='rejectModal-box-buttons-confirm'>Confirm</Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
  );
}
