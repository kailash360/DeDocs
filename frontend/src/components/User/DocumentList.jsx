import React from 'react'
import {Container,Grid} from '@mui/material'
import DocumentItem from './DocumentItem'
import '../../static/scss/User/Dashboard.scss'

function DocumentList({documents }) {

  return (
    <Grid container className="dashboard-documents">
      <Grid item sm={12}>
        <p className='dashboard-documents-heading'>My Documents</p>
        <hr />
      </Grid>
      <Grid item className="dashboard-documents-list">
        {documents && documents.map(doc => <DocumentItem document={doc} />)}
      </Grid>
    </Grid>
  )
}

export default DocumentList