import React, { Component } from 'react'
import { Image, Carousel } from 'react-bootstrap'

import banner from '../../../assets/images/banner.gif'
import story from '../../../assets/images/our-story.jpg'
import './Homepage.css'
export default class Homepage extends Component {
  render() {
    return (
      <div>
        <Carousel interval={5000} indicators={false}>
          <Carousel.Item>
            <Image src={banner} className='w-100 banner' alt='banner' />
          </Carousel.Item>
          <Carousel.Item>
            <Image src={story} className='w-100 banner' alt='our story' />
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}
