import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Image } from 'react-bootstrap'
import logo from '../../../assets/images/coffee_logo.png'
import './NavHeader.css'

const NavHeader = (props) => {
  const { elements } = props

  return (
    <Navbar className='header sticky-top align-items-center justify-content-center' expand="lg">
      <Navbar.Brand className='brand'>
        <Image src={logo} width={40} />
        <NavLink className='brand-name' to='/'>Coffee•Hut</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle className='toggle' aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className='collapse' id="basic-navbar-nav">
        <Nav className="align-items-center justify-content-between">
          {elements.map(e => (
            e.render ? e.render : <NavLink className='navlink mr-4' key={e.key} to={e.to}>{e.text}</NavLink>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavHeader
