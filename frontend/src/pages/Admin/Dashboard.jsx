import React from 'react'
import {Grid} from '@mui/material'
import Constants from '../../Constants'

function Dashboard() {

    const [department, setDepartment] = React.useState(Constants.Departments.UIDAI)

  return (
    <Grid container className='pt-4'>
        <Grid item md={2} sm={12}>
            <img src={department.logo} alt="" className='w-[40%] h-auto ml-[50%]' />
        </Grid>
        <Grid item md={10} sm={12}>
            <p className='text-xl font-bold'>
                {department.name}
            </p>
        </Grid>
    </Grid>
  )
}

export default Dashboard