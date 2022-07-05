import React from 'react'
import {Grid, Typography} from '@mui/material'
import DocumentItem from './DocumentItem'
import '../../static/scss/User/Dashboard.scss'

function DocumentList({documents,role='user' }) {

  return (
    <Grid container className="dashboard-documents">
      <Grid item sm={12}>
        <p className='dashboard-documents-heading'>{role=='user'?'My Documents':'Documents'}</p>
        <hr />
      </Grid>
      <Grid item className="dashboard-documents-list">
        {documents && documents.length > 0 ? 
          documents.map(doc => <DocumentItem document={doc} role={role} />) :
          <Typography variant="h5" component="h2" sx={{my:6}}>No document found</Typography>
        }
      </Grid>
    </Grid>
  )
}

export default DocumentList