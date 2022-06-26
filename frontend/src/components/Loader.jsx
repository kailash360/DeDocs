import React from 'react'
import {ReactComponent as LoadingIcon} from '../static/media/Loader.svg'
import '../static/scss/Loader.scss'
import {Container} from '@mui/material'

function Loader() {

  return (
    <Container className='loader'>
        <LoadingIcon></LoadingIcon>
    </Container>
  )
}

export default Loader