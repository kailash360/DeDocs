import React from 'react'
import {Button, Grid, Container} from '@mui/material'
import { NavLink } from "react-router-dom"
import '../static/scss/Navbar.scss'

const UserNavigation = [
  { name: 'Dashboard', href: '/user/dashboard'},
  { name: 'My Requests', href: '/user/my-requests'},
  { name: 'My Documents', href: '/user/my-documents'},
]

const AdminNavigation = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: 'Documents', href: '/admin/documents' },
  { name: 'Requests', href: '/admin/requests' },
]

function Navbar() {

  const [navigation, setNavigation] = React.useState(UserNavigation)

  return(
    <Container className='navbar' maxWidth={false}>
      <Grid container>
        <Grid item sm={2} className='navbar-titlebox'>
          <p className='navbar-title'>DeDocs</p>
        </Grid>
        <Grid item sm={4} className='navbar-menu'>
          {navigation.map(item=> <NavLink className={({isActive}) => isActive ? 'navbar-menu-item active':'navbar-menu-item'} to={item.href}>{item.name}</NavLink> )}
        </Grid>
        <Grid item sm={6} className='navbar-request'>
          <Button variant='contained' className='navbar-request-button'>+ New Request</Button>
        </Grid>
        
      </Grid>
    </Container>
  )
}

export default Navbar