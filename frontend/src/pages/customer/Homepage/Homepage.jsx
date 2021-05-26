import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import banner from '../../../assets/images/banner.gif'
import './Homepage.css'
export default class Homepage extends Component {
  render() {
    return (
      <div>
        <div>
          <Image src={banner} className='w-100 banner'/>
        </div>
      </div>
    )
  }
}
