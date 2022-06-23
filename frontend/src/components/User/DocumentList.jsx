import React from 'react'
import {Container,Grid} from '@mui/material'
import DocumentItem from './DocumentItem'
import '../../static/scss/User/Dashboard.scss'

function DocumentList() {

  const documents = [
    {
      department: '0',
      title: 'Aadhar Card',
      date: '12-09-2002'
  },
    {
      department: '1',
      title: 'Class XII Marksheet',
      date: '12-09-2002'
  },
    {
      department: '1',
      title: 'Class XII Marksheet',
      date: '12-09-2002'
  },
    {
      department: '1',
      title: 'Class XII Marksheet',
      date: '12-09-2002'
  }
]

  return (
    <Grid container className="dashboard-documents">
      <Grid item sm={12}>
        <p className='dashboard-documents-heading'>My Documents</p>
        <hr />
      </Grid>
      <Grid item className="dashboard-documents-list">
        {documents.map(doc => <DocumentItem document={doc} />)}
      </Grid>
    </Grid>
  )
}

export default DocumentList