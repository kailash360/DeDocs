import * as React from 'react';
import {Box, Modal, Grid, Button} from '@mui/material';
import '../../static/scss/Admin/AcceptRequestModal.scss'
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function AcceptRequestModal({open, setOpen, request}) {

  const handleClose = () => setOpen(false);

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

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='acceptModal'
      >
        <Box sx={style} className='acceptModal-box'>
          <Grid container>
            <Grid item sm={12} className='acceptModal-box-heading'>
                <p>Accept</p>
                <p>{request.subject}</p>
            </Grid>
            <Grid item container sm={12} className='acceptModal-box-buttons'>
                <Grid sm={12} md={6}>
                    <Button type='button' className='acceptModal-box-buttons-issue'>
                        <AddIcon className='icon'></AddIcon>
                        Issue a new document
                    </Button>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Button type='button' className='acceptModal-box-buttons-modify'>
                        <AutorenewIcon className='icon'></AutorenewIcon>
                        Modify an existing document
                    </Button>
                </Grid>
            </Grid>
            <Button type='button' className='acceptModal-box-cancel' onClick={handleClose} >Cancel</Button>
          </Grid>
        </Box>
      </Modal>
  );
}
