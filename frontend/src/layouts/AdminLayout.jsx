import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import './CustomerLayout.less'
import NavHeader from '../components/Navigation/NavHeader/NavHeader'
import Dashboard from '../pages/admin/Dashboard/Dashboard'

export default class CustomerLayout extends Component {
  render() {
    return (
      <div className='w-100 layout-container'>
        <NavHeader
          elements={[
            { key: 'home', to: '/', text: 'Dashboard' },
            { key: 'menu', to: '/menu', text: 'Menu' }
          ]}
        />
        <Switch>
          <Route path='/admin' exact render={() => <Dashboard />} />
          <Redirect to='/admin' />
        </Switch>
      </div>
    )
  }
}


