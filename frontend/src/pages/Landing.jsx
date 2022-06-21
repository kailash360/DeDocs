import React from 'react'
import {Container, Grid, Button} from '@mui/material'
import {ReactComponent as LandingVector} from '../static/media/LandingVector.svg'
import '../static/scss/Landing.scss'
import UserRegisterationBox from '../components/User/RegistrationBox'
import AdminRegisterationBox from '../components/Admin/RegistrationBox'

function Home() {
  
  const [role, setRole] = React.useState('')

  const setUser = () => setRole('user')
  const setAdmin = () => setRole('admin')

  return (
    <Grid container overflow-hidden	>
      <Grid item lg={6} className='min-h-full pl-24 min-h-screen'>
      {!role && 
      <>
        <p className='text-6xl text-secondary mx-2 font-bold mb-1'> DeDocs </p>
        <p className='text-4xl text-secondary mx-2 font-semibold'>
          A Decentralized <br /> 
          Document Management <br /> 
          System 
        </p>
        <p className='max-w-lg mx-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iure laboriosam inventore quisquam omnis quam, dolore quaerat in assumenda dolorem illo aperiam sit aliquam architecto facere adipisci enim incidunt pariatur.
        </p>
        <Container maxWidth={false} className="pl-0 flex-row justify-between mt-16">
          <Button className="bg-secondary text-white normal-case px-8 py-2 text-lg ml-2 mr-8 my-2	" onClick={setUser}>I am a User</Button>
          <Button className="bg-tertiary text-white normal-case	px-8 py-2 text-lg	" onClick={setAdmin}>I am an Admin</Button>
        </Container>
      </>}
      {role == 'user' && <UserRegisterationBox/>}
      {role == 'admin' && <AdminRegisterationBox/>}
      </Grid>
      <Grid item lg={6} className='bg-tertiary min-h-screen'>
        <LandingVector className="my-[20%]"></LandingVector>
      </Grid>
    </Grid>
  )
}

export default Home


