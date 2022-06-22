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
    <Grid container overflow-hidden	className='landing'>
      <Grid item lg={6} className='landing-left'>
      {!role && 
      <>
        <p className='landing-left-heading'> DeDocs </p>
        <p className='landing-left-subheading'>
          A Decentralized <br /> 
          Document Management <br /> 
          System 
        </p>
        <p className='landing-left-description'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iure laboriosam inventore quisquam omnis quam, dolore quaerat in assumenda dolorem illo aperiam sit aliquam architecto facere adipisci enim incidunt pariatur.
        </p>
        <Container maxWidth={false} className="landing-left-buttonContainer">
          <Button className="landing-left-button user" variant='contained' onClick={setUser}>I am a User</Button>
          <Button className="landing-left-button admin" variant='contained' onClick={setAdmin}>I am an Admin</Button>
        </Container>
      </>}
      {role == 'user' && <UserRegisterationBox/>}
      {role == 'admin' && <AdminRegisterationBox/>}
      </Grid>
      <Grid item lg={6} className='landing-right'>
        <LandingVector className="landing-right-image"></LandingVector>
      </Grid>
    </Grid>
  )
}

export default Home


