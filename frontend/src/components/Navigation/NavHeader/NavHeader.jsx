import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Image, Button, Badge } from 'react-bootstrap'
import logo from '../../../assets/images/coffee_logo.png'
import './NavHeader.less'

const NavHeader = (props) => {
  const { elements } = props

  const isAuth = useSelector(state => state.auth.isAuth);
  const cartItems = useSelector(state => state.auth.user ? (state.auth.user.cart ? [1, 2, 3] : [1]) : []);
  const isAdmin = useSelector(state => state.auth.user ? state.auth.user.isAdmin : false);

  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch({ type: 'LOGOUT' });
  }

  console.log(elements)
  return (
    <Navbar className='header sticky-top align-items-center justify-content-center' expand="lg">
      <Navbar.Toggle className='toggle' aria-controls="basic-navbar-nav" />
      <Navbar.Brand className='brand'>
        <Image src={logo} width={40} />
        <NavLink className='brand-name' to='/'>Coffee•Hut</NavLink>
      </Navbar.Brand>
      <Navbar.Collapse className='collapse' id="basic-navbar-nav">
        <Nav className="navlist">
          {elements.map(e => (
            e.render ? e.render : (
              e.to[0] === '/'
                ? <NavLink className='navlink mr-4' key={e.key} to={e.to}>{e.text}</NavLink>
                : <a className='navlink mr-4' key={e.key} href={e.to}>{e.text}</a>
            )
          ))}
          {!isAuth && <NavLink className='navlink mr-4' key='login' to='/login'>Login</NavLink>}
          {isAuth && <>
            <NavLink className='navlink mr-4' to='/profile'>Your Profile</NavLink>
            <NavLink className='navlink mr-4' to='/orders'>Your Orders</NavLink>
            <NavLink className='navlink mr-4' to='/cart'>Your Cart{cartItems.length !== 0 && <Badge className='ml-1' variant='danger'>{cartItems.length}</Badge>}</NavLink>
            <Button className='navlink mr-4 p-0 pb-1' variant='link' onClick={onLogout}>Logout</Button>
          </>}
          {isAdmin && <NavLink className='navlink mr-4' to='/admin/'>Admin Dashboard</NavLink>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavHeader
