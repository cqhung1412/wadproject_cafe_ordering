import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import './CustomerLayout.less'
import NavHeader from '../components/Navigation/NavHeader/NavHeader'
import Homepage from '../pages/customer/Homepage/Homepage'
import Menu from '../pages/customer/Menu/Menu'
import Cart from '../pages/customer/Cart/Cart'
import Profile from '../pages/customer/Profile/Profile'
import Order from '../pages/customer/Order/Order'
import CheckoutSuccess from '../pages/customer/Checkout/CheckoutSuccess'
export default class CustomerLayout extends Component {
  render() {
    return (
      <div className='w-100 layout-container'>
        <NavHeader
          elements={[
            { key: 'home', to: '/', text: 'Home' },
            { key: 'story', to: '#story', text: 'Hut Story' },
            { key: 'offer', to: '#offer', text: 'Our Products' },
            { key: 'promo', to: '#promo', text: 'Promotions' },
            { key: 'menu', to: '/menu', text: 'Menu' }
          ]}
        />
        <Switch>
          <Route path='/' exact render={() => <Homepage />} />
          <Route path='/menu' exact render={() => <Menu />} />
          <Route path='/cart' exact render={() => <Cart />} />
          <Route path='/profile' exact render={() => <Profile />} />
          <Route path='/orders' exact render={() => <Order />} />
          <Route path='/checkout/success' exact render={() => <CheckoutSuccess />} />
          <Redirect to='/' />
        </Switch>
      </div>
    )
  }
}


