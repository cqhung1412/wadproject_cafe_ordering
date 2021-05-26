import React, { Component } from 'react'
import { Switch, Route, Redirect, NavLink } from "react-router-dom"
import { NavDropdown } from 'react-bootstrap'
import { Bag, PersonCircle } from 'react-bootstrap-icons'

import NavHeader from '../components/Navigation/NavHeader/NavHeader'
import Homepage from '../pages/customer/Homepage/Homepage'

export default class CustomerLayout extends Component {
  render() {
    return (
      <div className='w-100'>
        <NavHeader
          elements={[
            { key: 'home', to: '/', text: 'Home' },
            { key: 'promo', to: '/promo', text: 'Promotions' },
            { key: 'menu', to: '/menu', text: 'Menu' },
            {
              key: 'cart', render: (
                <NavLink className='navlink-icon ml-3' to='/cart'><Bag /></NavLink>
              )
            },
            {
              key: 'account', render: (
                <NavDropdown className='navlink-icon ml-2' title={<PersonCircle fill='white' />} id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <NavLink className='dropdown-navlink' to='/profile'>Your Profile</NavLink></NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink className='dropdown-navlink' to='/orders'>Your Orders</NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <NavLink className='dropdown-navlink' to='/logout'>Logout</NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              )
            }
          ]}
        />
        <Switch>
          <Route path='/' exact render={() => <Homepage />} />
          <Redirect to='/' />
        </Switch>
      </div>
    )
  }
}
