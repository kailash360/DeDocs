import React from 'react'
import QRCode from "react-qr-code";
import {Modal, Grid, Button, Box} from '@mui/material'
import '../../static/scss/User/QRModal.scss'

function QRModal({name, url, open, setOpen}) {

  const handleClose = () => setOpen(false)

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className='qrModal'>
        <Grid container spacing={1}>
          <Grid item sm={12} align="center" className='name'> 
            <strong>{name}</strong> 
          </Grid>
          <Grid item sm={12} align="center">
            <QRCode value={url} />
          </Grid>
          <Grid item container className='btn-container'>
            <Grid item sm={6} align="center">
              <Button type="button" className="btn">Save</Button>
            </Grid>
            <Grid item sm={6} align="center">
              <Button type="button" className="btn" onClick={handleClose}>Close</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}

export default QRModal