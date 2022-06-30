import React from 'react'
import {Container, Grid, TextField, Input, Button} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import '../../static/scss/Admin/IssueDocument.scss'

function IssueDocument() {
  return (
    <Container className="issue">
        <Grid container spacing={4}>
            <Grid item sm={12} className="issue-top">
                <p className="issue-top-heading">Issue document</p>
            </Grid>
            <Grid item sm={12} className="issue-requestDetails">
                <p className="issue-requestDetails-id">Request #14</p>
                <p className="issue-requestDetails-subject">New Aadhar</p>
            </Grid>
            <Grid item sm={12} className="issue-input">
                <p className="issue-input-heading">Document Name</p>
                <TextField className="issue-input-value" fullWidth placeholder="Type here"></TextField>
            </Grid>
            <Grid item sm={12} className="issue-input">
                <p className="issue-input-heading">Document UID</p>
                <TextField className="issue-input-value" fullWidth placeholder="Type here"></TextField>
            </Grid>
            <Grid item sm={12} className="issue-upload">
                <p className="issue-upload-heading">Upload File</p>
                <label htmlFor="contained-button-file">
                    <Input accept="*" id="contained-button-file" className="issue-upload-input" multiple type="file" />
                    <Button variant="contained" component="span" className="issue-upload-button" startIcon={<FileUploadIcon/>} >Upload</Button>
                </label>
            </Grid>
            <Grid item sm={12}>
                <Button className='issue-button' type='button'>Issue</Button>
            </Grid>
        </Grid>
    </Container>
  )
}

export default IssueDocument